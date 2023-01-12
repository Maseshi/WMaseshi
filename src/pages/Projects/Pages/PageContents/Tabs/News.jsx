import { useState, useEffect } from 'react'
import { getFirestore, doc, setDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

import NewsEditor from '../../PageEditor/NewsEditor'

import { translator } from '../../../../../utils/functions/translator'

export default function News(props) {
  const [list, setList] = useState()
  const [avatar, setAvatar] = useState()
  const [action, setAction] = useState({
    new: false
  })

  const dataProps = props.data
  const userDataProps = props.userData
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  useEffect(() => {
    const getData = async () => {
      const docs = dataProps.tab.news
      const markdown = new MarkdownIt({
        html: true,
        xhtmlOut: true,
        breaks: true,
        linkify: true,
        highlight: function (str, lang) {
          if (lang && HighlightJs.getLanguage(lang)) {
            try {
              return HighlightJs.highlight(str, { language: lang }).value
            } catch (__) { }
          }

          return ''
        }
      })

      markdown.renderer.rules.table_open = () => {
        return '<table class="table">';
      }

      markdown.renderer.rules.blockquote_open = () => {
        return '<blockquote class="blockquote">';
      }

      if (docs && docs.length > 0) {
        let established = 0
        let message = ''
        let style = ''

        for (let i = docs.length - 1; i > -1; i--) {
          const authorRole = docs[i].author.role
          const authorUID = docs[i].author.uid
          const authorUsername = docs[i].author.username
          const contentCreate = docs[i].content.create
          const contentMessage = docs[i].content.message

          if (contentCreate) {
            const date = new Date(contentCreate.seconds * 1000)
            const day = date.getUTCDate()
            const months = [
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.january,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.february,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.march,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.april,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.may,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.june,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.july,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.august,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.september,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.october,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.november,
              translator().translate.pages.Projects.Pages.PageContents.Tabs.News.december
            ]
            const month = months[date.getUTCMonth()]
            const year = date.getFullYear() + 543
            const createAt = day + " " + month + " " + year

            established = createAt
          }
          if (contentMessage) {
            const xmlString = markdown.render(contentMessage)

            message = xmlString
          }
          if (authorUID) {
            const storage = getStorage()

            getDownloadURL(ref(ref(ref(storage, 'users'), authorUID), 'avatar')).then((url) => {
              const xhr = new XMLHttpRequest()

              xhr.responseType = 'blob'
              xhr.open("GET", url)
              xhr.send()

              setAvatar(url)
            })
          }

          style += (
            '<div class="projects-news-detail card mt-3 mb-3">' +
            '<div class="row">' +
            '<div class="col-md-3" align="center">' +
            '<img class="projects-news-author-avatar" src="' + avatar + '" width="80px" height="80px" alt="" />' +
            '<br />' +
            '<h3 class="projects-news-author-title">' + authorUsername + '</h3>' +
            '<span class="badge rounded-pill bg-primary">' + authorRole.toUpperCase() + '</span>' +
            '</div>' +
            '<div class="col-md-9" align="left">' +
            '<div class="card-body">' +
            '<p class="projects-news-create">' + translator().translate.pages.Projects.Pages.PageContents.Tabs.News.post_at + ': ' + established + '</p>' +
            '<div class="projects-news-message">' +
            message +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
          )
        }

        return setList(style)
      } else {
        return setList(
          '<div class="projects-content-empty">' +
          '<i class="bi bi-newspaper"></i>' +
          '<br />' +
          '<span>' +
          translator().translate.pages.Projects.Pages.PageContents.Tabs.News.no_news +
          '</span>' +
          '</div>'
        )
      }
    }
    getData()
  }, [avatar, dataProps.tab.news])

  return (
    <div className={parameterProps.tab === tabIDProps[1] ? "tab-pane fade show active" : "tab-pane fade"} id={dataProps.id + "-news"} role="tabpanel" aria-labelledby={dataProps.id + "-news-tab"}>
      {
        list ? (
          <div className="projects-news">
            {
              userDataProps && userDataProps.user.role === 'owner' ? (
                <>
                  {
                    action.new ? (
                      <NewsEditor
                        onSubmit={
                          (event) => {
                            const submit = event.target
                            const cancel = document.getElementById('NewsCancel')
                            const inputDate = document.getElementById("NewsCreateTextarea")
                            const textarea = document.getElementById("NewsMessageTextarea")

                            if (!inputDate.value) return inputDate.classList.add('is-invalid')
                            if (textarea.value.length < textarea.minLength) return textarea.classList.add('is-invalid')

                            submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageContents.Tabs.News.public)

                            submit.disabled = true
                            cancel.disabled = true
                            inputDate.disabled = true
                            textarea.disabled = true

                            const db = getFirestore()
                            const dbRef = doc(db, "Projects", parameterProps.id)

                            const username = userDataProps.auth.displayName
                            const uid = userDataProps.auth.uid
                            const role = userDataProps.user.role

                            setDoc(dbRef, {
                              tab: {
                                news: arrayUnion(
                                  {
                                    author: {
                                      username: username,
                                      uid: uid,
                                      role: role
                                    },
                                    content: {
                                      create: Timestamp.fromDate(new Date(inputDate.value)),
                                      message: textarea.value
                                    }
                                  }
                                )
                              }
                            }, { merge: true }).then(() => {
                              setAction({
                                new: false
                              })

                              submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageContents.Tabs.News.public)

                              inputDate.value = ''
                              textarea.value = ''

                              submit.disabled = false
                              cancel.disabled = false
                              inputDate.disabled = false
                              textarea.disabled = false
                            })
                          }
                        }
                        onCancel={
                          () => {
                            setAction({
                              new: false
                            })
                          }
                        }
                        userData={userDataProps}
                      />
                    ) : (
                      parameterProps.id !== 'new-project' ? (
                        <button type="button" className="projects-news-new card mt-3 mb-3" onClick={
                          () => {
                            setAction({
                              new: true
                            })
                          }
                        }>
                          <div className="card-body">
                            <i className="bi bi-plus-circle"></i>
                            <h3>
                              {translator().translate.pages.Projects.Pages.PageContents.Tabs.News.create_new_news}
                            </h3>
                          </div>
                        </button>
                      ) : ''
                    )
                  }
                </>
              ) : (
                ''
              )
            }
            <div className="projects-news-list" dangerouslySetInnerHTML={{ __html: list }}></div>
          </div>
        ) : (
          <div className="projects-content-loading mt-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">{translator().translate.pages.Projects.Pages.PageContents.Tabs.News.loading}...</span>
            </div>
            <br />
            <span>{translator().translate.pages.Projects.Pages.PageContents.Tabs.News.loading}...</span>
          </div>
        )
      }
    </div >
  )
}
