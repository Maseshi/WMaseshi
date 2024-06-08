import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, child, set } from 'firebase/database'
import { onSnapshot, collection } from 'firebase/firestore'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'

// Components
import Layouts from '@/layouts'
import { FooterShort } from '@/layouts/Footer'

// Configs
import configs from '@/configs'

// Contexts
import AuthContext from './contexts/AuthContext'
import DataContext from './contexts/DataContext'
import ThemeContext from './contexts/ThemeContext'

// Pages
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Account from './pages/Account'
import SignIn from './pages/Account/pages/SignIn'
import Register from './pages/Account/pages/Register'
import Forgot from './pages/Account/pages/Forgot'
import Projects from './pages/Projects'
import Project from './pages/Projects/pages/Project'
import ToS from './pages/ToS'
import PP from './pages/PP'
import Contact from './pages/Contact'

// Services
import octokit from '@/services/octokit'
import { auth, firestore, database, storage, analytics, performance, appCheck } from './services/firebase'

function Switch({ children }) {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [prevLoc, setPrevLoc] = useState('')

  useEffect(() => {
    setProgress(100)
    setPrevLoc(location.pathname)
    window.scrollTo(0, 0)

    if (location.pathname === prevLoc) setPrevLoc('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    setProgress(0)
  }, [prevLoc])

  return (
    <>
      <LoadingBar
        progress={progress}
        color="var(--bs-primary)"
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        {children}
      </Routes>
    </>
  )
}
Switch.propTypes = {
  children: PropTypes.node.isRequired
}

export default function App() {
  const getDefaultTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const localStorageTheme = localStorage.getItem('theme')
    const browserDefault = prefersDark ? 'dark' : 'light'

    return localStorageTheme || browserDefault
  }

  const [user, setUser] = useState({
    current: null,
    data: null,
    isLoading: true,
    isError: false
  })
  const [data, setData] = useState({
    database: {
      snapshot: {},
      isLoading: true,
      isError: false
    },
    firestore: {
      documents: {
        Projects: {}
      },
      isLoading: true,
      isError: false
    }
  })
  const [theme, setTheme] = useState(getDefaultTheme())

  // Global
  analytics

  /// Set the main theme
  document.documentElement.dataset.bsTheme = theme

  // Production mode
  if (import.meta.env.MODE === 'production') {
    performance
    appCheck
  }

  // Development mode
  if (import.meta.env.MODE === 'development') {
    /* empty */
  }

  useEffect(() => {
    // Get data of user from server
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const defaultUserData = {
            license: '',
            gender: 'unspecified',
            role: 'member',
            rule: {
              pp: true,
              tos: true
            }
          }
          const usersRef = ref(database, `projects/${configs.SITE.NAME.toLowerCase()}`)

          setUser(
            prev => ({
              ...prev,
              current: user
            })
          )
          onValue(child(child(usersRef, 'users'), user.uid), (snapshot) => {
            if (snapshot.exists()) {
              setUser(
                prev => ({
                  ...prev,
                  data: snapshot.val(),
                  isLoading: false
                })
              )
            } else {
              set(child(child(usersRef, 'users'), user.uid), defaultUserData)
              setUser(
                prev => ({
                  ...prev,
                  data: defaultUserData,
                  isLoading: false
                })
              )
            }
          })
        } else {
          setUser(
            prev => ({
              ...prev,
              current: null,
              data: null,
              isLoading: false
            })
          )
        }
      })
    } catch (error) {
      setUser(
        prev => ({
          ...prev,
          current: null,
          data: null,
          isLoading: false,
          isError: true
        })
      )
      throw new Error(error)
    }

    // Get data and process from Firestore
    // Available Path:
    // - /Projects
    const fetchNewsAndProfiles = async (newsArray) => {
      return Promise.all(
        newsArray.map(async (news) => {
          news.content.create = news.content.create.seconds ?? null
          news.author.profile = await getDownloadURL(storageRef(storage, `/users/${news.author.uid}/avatar`)) ?? null
          return news
        })
      )
    }
    const fetchContentFromUrl = async (url) => {
      const response = await fetch(url)

      return response.status === 200 ? await response.text() : null
    }
    const fetchChangelogData = async (changelog) => {
      const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: configs.SITE.SOCIAL_MEDIA.GITHUB,
        repo: changelog
      })

      return response.status === 200 ? response.data : null
    }
    const fetchSourceCodeData = async (sourceCode) => {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/', {
        owner: configs.SITE.SOCIAL_MEDIA.GITHUB,
        repo: sourceCode
      })

      return response.status === 200 ? response.data : null
    }

    try {
      onSnapshot(collection(firestore, 'Projects'), (querySnapshot) => {
        if (querySnapshot) {
          const projectsData = {}

          querySnapshot.forEach(async (doc) => {
            const {
              image: { background, icon },
              buttons,
              description,
              established: { seconds: createAt },
              links,
              status,
              tab: tabs,
              tag: tags,
              title,
              type
            } = doc.data()

            const iconUrl = icon ? await getDownloadURL(storageRef(storage, icon.path)) : null
            const getStartContent = tabs.get_start ? tabs.get_start.content : null
            const getStartData = getStartContent ? await fetchContentFromUrl(getStartContent) : null
            const newsContent = tabs.news || []
            const newsData = newsContent.length ? await fetchNewsAndProfiles(newsContent) : null
            const changelogContent = tabs.changelog ? tabs.changelog.content : null
            const changelogData = changelogContent ? await fetchChangelogData(changelogContent) : null
            const sourceCodeContent = tabs.source_code ? tabs.source_code.content : null
            const sourceCodeData = sourceCodeContent ? await fetchSourceCodeData(sourceCodeContent) : null

            projectsData[doc.id] = {
              background: background || null,
              buttons: buttons || null,
              description: description || null,
              createAt: createAt || null,
              icon: { ...icon, src: iconUrl || null },
              links: links || null,
              status: status || null,
              tabs: {
                ...tabs,
                news: newsData,
                get_start: { ...tabs.get_start, content: getStartData },
                changelog: { ...tabs.changelog, data: changelogData },
                source_code: { ...tabs.source_code, data: sourceCodeData }
              },
              tags: tags || null,
              title: title || null,
              type: type || null
            }

            if (querySnapshot.size === Object.keys(projectsData).length) {
              setData(
                (prev) => ({
                  ...prev,
                  firestore: {
                    ...prev.firestore,
                    documents: {
                      ...prev.firestore.documents,
                      Projects: {
                        ...prev.firestore.documents.Projects,
                        ...projectsData
                      }
                    },
                    isLoading: false
                  }
                })
              )
            }
          })
        } else {
          setData(
            prev => ({
              ...prev,
              firestore: {
                ...prev.firestore,
                documents: {
                  Projects: {}
                },
                isLoading: false
              }
            })
          )
        }
      })
    } catch (error) {
      setData(
        prev => ({
          ...prev,
          firestore: {
            ...prev.firestore,
            isLoading: false,
            isError: true
          }
        })
      )
      throw new Error(error)
    }

    // Get data from database
    onValue(ref(database), async (snapshot) => {
      if (snapshot.exists()) {
        setData(
          (prev) => ({
            ...prev,
            database: {
              ...prev.database,
              snapshot: snapshot.val(),
              isLoading: false
            }
          })
        )
      } else {
        setData(
          prev => ({
            ...prev,
            database: {
              ...prev.database,
              snapshot: {},
              isLoading: false
            }
          })
        )
      }
    })

    // Set theme by following browser theme
    const controlTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      setTheme(prefersDark ? 'dark' : 'light')
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', controlTheme)
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', controlTheme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthContext.Provider
        value={
          {
            currentUser: user.current,
            userData: user.data,
            isLoading: user.isLoading,
            isError: user.isError
          }
        }
      >
        <DataContext.Provider
          value={
            {
              reference: data
            }
          }
        >
          <BrowserRouter>
            <Switch>
              <Route path="/" element={<Layouts />}>
                <Route index element={<Home />} />
                <Route path="account" element={<Account />} />
                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="terms-of-service" element={<ToS />} />
                <Route path="privacy-policy" element={<PP />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="/account/*" element={<FooterShort />}>
                <Route path="sign-in" element={<SignIn />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot" element={<Forgot />} />
              </Route>
              <Route path="/projects" element={<Layouts />}>
                <Route index element={<Projects />} />
                <Route path=":id" element={<Project />} />
              </Route>
            </Switch>
          </BrowserRouter>
        </DataContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}
