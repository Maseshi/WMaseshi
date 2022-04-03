import { useState, useEffect } from 'react'
import MarkdownIt from 'markdown-it'

export default function GetStart(props) {
  const [text, setText] = useState()

  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  useEffect(() => {
    const getData = async () => {
      const docs = dataProps.tab.started
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

      if (docs) {
        const response = await fetch(docs)

        if (response.ok) {
          const text = await response.text()
          const xmlString = markdown.render(text)

          return setText(xmlString)
        } else {
          return setText(
            '<div class="projects-content-get-started">' +
            '<div class="projects-content-empty">' +
            '<i class="bi bi-card-heading"></i>' +
            '<br />' +
            '<span>' +
            'หน้านี้ยังไม่ได้รับการเพิ่มข้อมูล' +
            '<br />' +
            'โปรดลองกลับมาอีกครั้งในภายหลัง' +
            '</span>' +
            '</div>' +
            '</div>'
          )
        }
      } else {
        return setText(
          '<div class="projects-content-get-started">' +
          '<div class="projects-content-empty">' +
          '<i class="bi bi-card-heading"></i>' +
          '<br />' +
          '<span>' +
          'หน้านี้ยังไม่ได้รับการเพิ่มข้อมูล' +
          '<br />' +
          'โปรดลองกลับมาอีกครั้งในภายหลัง' +
          '</span>' +
          '</div>' +
          '</div>'
        )
      }
    }
    getData()
  }, [dataProps])

  return (
    <div className={
      parameterProps.tab === tabIDProps[0] ? (
        "tab-pane fade show active"
      ) : (
        !tabIDProps.includes(parameterProps.tab) ? (
          "tab-pane fade show active"
        ) : (
          "tab-pane fade"
        )
      )
    } id={dataProps.id + "-get-start"} role="tabpanel" aria-labelledby={dataProps.id + "-get-start-tab"}>
      {
        text ?
          <div className="projects-content-get-started" dangerouslySetInnerHTML={{ __html: text }}></div>
          :
          <div className="projects-content-get-started">
            <div className="projects-content-loading mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <br />
              <span>กำลังโหลด...</span>
            </div>
          </div>
      }
    </div>
  )
}
