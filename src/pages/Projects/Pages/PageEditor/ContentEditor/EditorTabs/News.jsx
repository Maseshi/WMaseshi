import { useState, useEffect } from 'react'
import { Timestamp } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

import NewsEditor from '../../NewsEditor'

import { translator } from '../../../../../../utils/functions/translator'

export default function News({ data, newsData, userData }) {
    const [news, setNews] = useState([])
    const [list, setList] = useState()
    const [avatar, setAvatar] = useState()
    const [action, setAction] = useState({
        new: false
    })

    useEffect(() => {
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

        if (data && data.tab.news && data.tab.news.length > 0) setNews(data.tab.news)

        const getData = async () => {
            if (news && news.length > 0) {
                let established = 0
                let message = ''
                let style = ''

                for (let i = news.length - 1; i > -1; i--) {
                    const authorRole = news[i].author.role
                    const authorUID = news[i].author.uid
                    const authorUsername = news[i].author.username
                    const contentCreate = news[i].content.create
                    const contentMessage = news[i].content.message

                    if (contentCreate) {
                        const date = new Date(contentCreate.seconds * 1000)
                        const day = date.getUTCDate()
                        const months = [
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.january,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.february,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.march,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.april,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.may,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.june,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.july,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.august,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.september,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.october,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.november,
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.december
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
                        '<div class="projects-news-detail card mb-3">' +
                        '<div class="row">' +
                        '<div class="col-md-3" align="center">' +
                        '<img class="projects-news-author-avatar" src="' + avatar + '" width="80px" height="80px" alt="" />' +
                        '<br />' +
                        '<h3 class="projects-news-author-title">' + authorUsername + '</h3>' +
                        '<span class="badge rounded-pill bg-primary">' + authorRole.toUpperCase() + '</span>' +
                        '</div>' +
                        '<div class="col-md-9" align="left">' +
                        '<div class="card-body">' +
                        '<p class="projects-news-create">' + translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.post_on + ': ' + established + '</p>' +
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
                    translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.no_news +
                    '</span>' +
                    '</div>'
                )
            }
        }
        getData()
    }, [avatar, news, newsData, data])

    const handleNewsSubmit = () => {
        const inputDate = document.getElementById("NewsCreateTextarea")
        const textarea = document.getElementById("NewsMessageTextarea")

        if (!inputDate.value) return inputDate.classList.add('is-invalid')
        if (textarea.value.length < textarea.minLength) return textarea.classList.add('is-invalid')

        const username = userData.auth.displayName
        const uid = userData.auth.uid
        const role = userData.user.role

        const data = {
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

        setNews(news.concat(data))
        newsData.push(data)

        inputDate.value = ''
        textarea.value = ''

        setAction({ new: false })
    }
    const handleNewsCancel = () => {
        const inputDate = document.getElementById("NewsCreateTextarea")
        const textarea = document.getElementById("NewsMessageTextarea")

        inputDate.value = ''
        textarea.value = ''

        setAction({ new: false })
    }

    return (
        <div
            className="tab-pane fade"
            id={
                data ? (
                    'v-pills-' + data.id + '-news'
                ) : (
                    'v-pills-news'
                )
            }
            role="tabpanel"
            aria-labelledby={
                data ? (
                    'v-pills-' + data.id + '-news-tab'
                ) : (
                    'v-pills-news-tab'
                )
            }
            tabIndex="0"
        >
            <h4>
            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.events}
            </h4>
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.page_description}
            </p>
            <div className="row row-cols-1 row-cols-md-2 g-2 mb-3">
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-primary w-100 projects-new-news-new"
                        onClick={() => setAction({ new: true })}
                    >
                        <i className="bi bi-plus-circle"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.new_news}
                    </button>
                </div>
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-danger w-100 projects-new-news-new"
                        disabled={news.length >= 2 ? false : true}
                        onClick={() => setAction({ new: false })}
                    >
                        <i className="bi bi-trash"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.remove_all_news}
                    </button>
                </div>
            </div>
            {
                list ? (
                    <div className="projects-news">
                        {
                            action.new ? (
                                <NewsEditor
                                    onSubmit={() => handleNewsSubmit}
                                    onCancel={() => handleNewsCancel}
                                    userData={userData}
                                />
                            ) : (
                                <div className="projects-news-list" dangerouslySetInnerHTML={{ __html: list }}></div>
                            )
                        }
                    </div>
                ) : (
                    <div className="projects-content-loading mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">
                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.loading}...
                            </span>
                        </div>
                        <br />
                        <span>
                            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.News.loading}...
                        </span>
                    </div>
                )
            }
        </div>
    )
}
