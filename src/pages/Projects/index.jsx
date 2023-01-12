import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as dbRef, child, get } from 'firebase/database'
import DocumentMeta from 'react-document-meta'

import ScrollToTop from '../../components/ScrollToTop'
import CookieAccept from '../../components/CookieAccept'

import Navbar from './Navbar'
import Contents from './Pages/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Projects() {
    const [data, setData] = useState([])
    const [userData, setUserData] = useState()
    const [loaded, setLoaded] = useState(false)

    const url = new URL(window.location)
    const idParam = url.searchParams.get('id')
    const tabParam = url.searchParams.get('tab')

    const [parameter] = useState({
        id: idParam,
        tab: tabParam
    })

    useEffect(() => {
        const auth = getAuth()
        const db = getFirestore()
        const storage = getStorage()
        const database = getDatabase()

        onSnapshot(collection(db, "Projects"), querySnapshot => {
            let url = '', count = 0
            const array = []

            querySnapshot.forEach(async doc => {
                const id = doc.id
                const document = doc.data()
                const background = document.image.background
                const button = document.button
                const description = document.description
                const established = document.established
                const icon = document.image.icon
                const link = document.link
                const isNew = document.new
                const status = document.status
                const tab = document.tab
                const tag = document.tag
                const title = document.title
                const type = document.type

                if (icon) {
                    url = await getDownloadURL(ref(storage, icon.path))
                    const xhr = new XMLHttpRequest();

                    xhr.responseType = 'blob'
                    xhr.open('GET', url)
                    xhr.send()
                }

                array.push({
                    id: id,
                    background: background,
                    button: button,
                    description: description,
                    established: established,
                    icon: url,
                    link: link,
                    new: isNew,
                    status: status,
                    tab: tab,
                    tag: tag,
                    title: title,
                    type: type
                })

                ++count

                if (count === querySnapshot.size) {
                    setData(array)

                    onAuthStateChanged(auth, async user => {
                        if (user) {
                            const uid = user.uid;
                            const snapshot = await get(child(dbRef(database, 'projects/maseshi/users'), uid))

                            if (snapshot.exists()) {
                                setUserData({
                                    auth: user,
                                    user: snapshot.val()
                                })
                                setLoaded(true)
                            }
                        } else {
                            setUserData()
                            setLoaded(true)
                        }
                    })
                }
            })
        })
    }, [])

    const meta = {
        title: translator().translate.pages.Projects.Projects.website_title,
        description: translator().translate.pages.Projects.Projects.website_description,
        canonical: '/projects',
        meta: {
            name: {
                keywords: 'maseshi, chaiwatsuwannarat, fluke, chaiwat',
                subject: translator().translate.pages.Projects.Projects.subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/maseshi_banner.jpg',
                'og:site_name': 'Maseshi'
            }
        }
    }

    return (
        <DocumentMeta {...meta}>
            <section className="projects">
                <div className="navbar-expand-lg">
                    <button className="projects-navbar-button navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProjectsNavbar" aria-controls="offcanvasProjectsNavbar">
                        <i className="bi bi-view-list"></i>
                    </button>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Navbar data={data.sort()} userData={userData} loaded={loaded} parameter={parameter} />
                        </div>
                        <div className="col-md-9">
                            <Contents data={data.sort()} userData={userData} loaded={loaded} parameter={parameter} />
                        </div>
                    </div>
                </div>
                <CookieAccept />
                <ScrollToTop />
            </section>
        </DocumentMeta>
    )
}
