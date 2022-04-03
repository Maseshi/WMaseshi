import { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import MarkdownIt from 'markdown-it'

export default function News(props) {
  const [list, setList] = useState()

  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  useEffect(() => {
    const getData = async () => {
      const docs = dataProps.tab.news
      const markdown = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true
      })

      markdown.renderer.rules.table_open = (tokens, idx) => {
        return '<table class="table">';
      }

      markdown.renderer.rules.blockquote_open = (tokens, idx) => {
        return '<blockquote class="blockquote">';
      }

      if (docs && docs.length > 0) {
        let established = 0
        let avatar = ''
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
            const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
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
            const url = await getDownloadURL(ref(ref(ref(storage, 'users'), authorUID), 'avatar'))
            const xhr = new XMLHttpRequest()

            xhr.responseType = 'blob'
            xhr.open("GET", url)
            xhr.send()

            avatar = url
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
            '<p class="projects-news-create">โพสต์เมื่อ: ' + established + '</p>' +
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
          'ยังไม่มีข่าวสารใดๆ ในขณะนี้' +
          '</span>' +
          '</div>'
        )
      }
    }
    getData()
  }, [dataProps])

  return (
    <div className={parameterProps.tab === tabIDProps[1] ? "tab-pane fade show active" : "tab-pane fade"} id={dataProps.id + "-news"} role="tabpanel" aria-labelledby={dataProps.id + "-news-tab"}>
      {
        list ? <div className="projects-news" dangerouslySetInnerHTML={{ __html: list }}></div> : (
          <div className="projects-content-loading mt-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <br />
            <span>กำลังโหลด...</span>
          </div>
        )
      }
    </div>
  )
}
