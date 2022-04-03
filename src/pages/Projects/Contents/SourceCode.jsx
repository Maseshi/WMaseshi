import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/core'
import Highlight from 'highlight.js'

// Functions
import { isMobile } from '../../../utils/functions/isMobile'
import { calculateFileSize } from '../../../utils/functions/calculateFileSize'

// Config
import config from '../../../configs/config'

import 'highlight.js/styles/github.css'

export default function SourceCode(props) {
  const [directory, setDirectory] = useState([])
  const [content, setContent] = useState()
  const [file, setFile] = useState()
  const [path, setPath] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [action, setAction] = useState({
    wordWrap: false
  })

  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  const version = '1.0.0'
  const octokit = new Octokit({ auth: config.OCTOKIT })

  useEffect(() => {
    const getDirectory = async () => {
      const octokit = new Octokit({ auth: config.OCTOKIT })
      const docs = dataProps.tab.sourcecode

      if (docs) {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/', {
          owner: 'Maseshi',
          repo: docs
        })

        if (response.status === 404) return
        if (response.status === 200) {
          const filesAndFolders = response.data

          filesAndFolders.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

          setDirectory(filesAndFolders)
          return setLoading(false)
        }
      }
    }
    getDirectory()
  }, [dataProps])

  const backToDirectory = async (url, index) => {
    const docs = dataProps.tab.sourcecode

    setLoading(true)

    if (docs) {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Maseshi',
        repo: docs,
        path: url[index]
      })

      if (response.status === 404) return
      if (response.status === 200) {
        const folders = response.data

        folders.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

        setDirectory(folders)
        setContent()
        setFile()
        setPath(path.slice(0, (index + 1)))
        setHistory(history.slice(0, (index + 1)))
        return setLoading(false)
      }
    }
  }

  const openFolder = async (dir) => {
    const docs = dataProps.tab.sourcecode

    setLoading(true)

    if (docs) {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Maseshi',
        repo: docs,
        path: dir
      })

      if (response.status === 404) return
      if (response.status === 200) {
        const folders = response.data
        const paths = dir.split('/')

        history.push(dir)
        folders.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

        setDirectory(folders)
        setContent()
        setFile()
        setPath(paths)
        setHistory(history)
        return setLoading(false)
      }
    }
  }

  const openFile = async (dir) => {
    const docs = dataProps.tab.sourcecode

    setLoading(true)

    if (docs) {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Maseshi',
        repo: docs,
        path: dir
      })

      if (response.status === 404) return
      if (response.status === 200) {
        const file = response.data
        const fileName = file.name
        const fileContent = file.content
        const fileDownload = file.download_url
        const paths = dir.split('/')

        let format = '<div class="projects-source-code-content-can-not-open">' +
          '<h5>' +
          '<i class="bi bi-exclamation-circle-fill"></i> ไม่สามารถเปิดไฟล์ได้หรือไฟล์อาจจะเสียหาย' +
          '</h5>' +
          '<span>ERROR: CAN_NOT_OPEN_FILE</span>' +
          '</div>'

        // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
        if (fileName.match(/.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp|bmp|ico|cur|tif|tiff)$/i)) {
          format = '<img class="projects-source-code-content-image" src="' + fileDownload + '" width="100%" alt="' + fileName + '" />'
        } else {
          let fileExtension = 'plaintext'
          const decodedBase64 = decodeURIComponent(escape(atob(fileContent)))

          if (fileName.substr(0, fileName.indexOf('.'))) {
            if (/[.]/.exec(fileName)) {
              fileExtension = fileName.split('.').pop()
            }
          }

          try {
            format = Highlight.highlight(decodedBase64, { language: fileExtension }).value
          } catch {
            format = Highlight.highlight(decodedBase64, { language: 'plaintext' }).value
          }
        }

        history.push(dir)

        setDirectory()
        setFile(file)
        setPath(paths)
        setContent(format)
        setHistory(history)
        return setLoading(false)
      }
    }
  }

  return (
    <div className={parameterProps.tab === tabIDProps[4] ? "tab-pane fade show active" : "tab-pane fade"} id={dataProps.id + "-source-code"} role="tabpanel" aria-labelledby={dataProps.id + "-source-code-tab"}>
      {
        dataProps.tab.sourcecode ? (
          <>
            <div className="projects-source-code-notice">
              <p className="mt-3">
                ไฟล์และโฟลเดอร์เหล่านี้ได้รับการอ้างอิงมาจากข้อมูลบน Github ของ Maseshi
                <br />
                หากต้องการรายละเอียดเพิ่มเติมสามารถดูได้ที่ <a href={'https://github.com/Maseshi/' + dataProps.tab.sourcecode}>https://github.com/Maseshi/{dataProps.tab.sourcecode}</a>
              </p>
            </div>
            <div className="projects-source-code-detail">
              {
                path ? (
                  <nav className="projects-source-code-breadcrumb pt-3 px-3" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      {
                        path.length ? (
                          <>
                            <li className="projects-source-code-breadcrumb-home breadcrumb-item">
                              <a href={"#" + dataProps.id + "-source-code"} onClick={() => backToDirectory('', -1)}>
                                <i className="bi bi-house-fill"></i>
                              </a>
                            </li>
                            {
                              path.map((data, index) => {
                                if ((index + 1) === path.length) {
                                  return (
                                    <li className="breadcrumb-item active" aria-current="page" key={index}>{data}</li>
                                  )
                                } else {
                                  return (
                                    <li className="breadcrumb-item" key={index}>
                                      <a href={"#" + data.id + "-source-code"} onClick={() => backToDirectory(history, index)}>{data}</a>
                                    </li>
                                  )
                                }
                              })
                            }
                            {
                              loading ? (
                                <li className="breadcrumb-item">
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                              ) : ''
                            }
                          </>
                        ) : (
                          <>
                            <li className="projects-source-code-breadcrumb-home breadcrumb-item active" aria-current="page">
                              <i className="bi bi-house-fill"></i>
                            </li>
                            {
                              loading ? (
                                <li className="breadcrumb-item">
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </li>
                              ) : ''
                            }
                          </>
                        )
                      }
                    </ol>
                  </nav>
                ) : ''
              }
              {
                directory ? (
                  <ul className="projects-source-code-directory list-group">
                    {
                      directory.length ? (
                        directory.map((list, index) => {
                          let icon = ''
                          let fileSize = ''
                          const name = list.name
                          const type = list.type
                          const path = list.path
                          const size = list.size

                          if (size) fileSize = calculateFileSize(size)

                          switch (type) {
                            case 'file':
                              icon = <i className="bi bi-file-earmark-text"></i>
                              break
                            case 'dir':
                              icon = <i className="bi bi-folder-fill"></i>
                              break
                            default:
                              icon = <i className="bi bi-exclamation-circle"></i>
                          }

                          return (
                            <button className={loading ? "list-group-item list-group-item-action disabled" : "list-group-item list-group-item-action"} type="button" onClick={type === "file" ? () => openFile(path) : () => openFolder(path)} key={index}>
                              {icon} <span className="projects-source-code-file-name">{name}</span> <span className="projects-source-code-file-size">{fileSize}</span>
                            </button>
                          )
                        })
                      ) : (
                        loading ? (
                          <ul className="projects-source-code-directory list-group">
                            <div className="list-group-item list-group-item-action placeholder-glow">
                              <span className="placeholder" style={{ 'width': '2%' }}></span> <span className="placeholder col-2"></span>
                            </div>
                            <div className="list-group-item list-group-item-action placeholder-glow">
                              <span className="placeholder" style={{ 'width': '2%' }}></span> <span className="placeholder col-2"></span>
                            </div>
                            <div className="list-group-item list-group-item-action placeholder-glow">
                              <span className="placeholder" style={{ 'width': '2%' }}></span> <span className="placeholder col-2"></span>
                            </div>
                            <div className="list-group-item list-group-item-action placeholder-glow">
                              <span className="placeholder" style={{ 'width': '2%' }}></span> <span className="placeholder col-2"></span>
                            </div>
                            <div className="list-group-item list-group-item-action placeholder-glow">
                              <span className="placeholder" style={{ 'width': '2%' }}></span> <span className="placeholder col-2"></span>
                            </div>
                          </ul>
                        ) : ''
                      )
                    }
                  </ul>
                ) : ''
              }
              {
                content ? (
                  <div className="projects-source-code-content card">
                    <div className="card-header">
                      <div className="row">
                        <div className="projects-source-code-content-file-info col-md-8">
                          <h4>{file.name}</h4>
                          {
                            isMobile() ? (
                              <>
                                <span className="projects-source-code-content-file-size">ขนาดไฟล์: {calculateFileSize(file.size)}</span>
                                <br />
                                <span className="projects-source-code-content-file-sha">SHA: {file.sha}</span>
                              </>
                            ) : (
                              <span>ขนาดไฟล์: {calculateFileSize(file.size)} | SHA: {file.sha}</span>
                            )
                          }
                        </div>
                        <div className="projects-source-code-content-file-action col-md-4">
                          <button className="projects-content-button btn btn-outline-primary" onClick={
                            (event) => {
                              navigator.permissions.query({ name: "clipboard-write" }).then(result => {
                                if (result.state === "granted" || result.state === "prompt") {
                                  const text = document.getElementById(dataProps.id + "-" + file.name.toLowerCase() + "-code").innerText

                                  navigator.clipboard.writeText(text).then(() => {
                                    event.target.innerHTML = '<i class="bi bi-check"></i>'

                                    setTimeout(() => {
                                      event.target.innerHTML = '<i class="bi bi-files"></i>'
                                    }, 3000)
                                  }, () => {
                                    event.target.innerHTML = '<i class="bi bi-x"></i>'

                                    setTimeout(() => {
                                      event.target.innerHTML = '<i class="bi bi-files"></i>'
                                    }, 3000)
                                  })
                                }
                              })
                            }
                          } type="button">
                            <i className="bi bi-files"></i>
                          </button>
                          <button className={action.wordWrap ? "projects-content-button btn btn-outline-primary active" : "projects-content-button btn btn-outline-primary"} onClick={() => setAction({ wordWrap: !action.wordWrap })} data-bs-toggle="button" autoComplete="off" type="button" aria-pressed={action.wordWrap ? "true" : "false"}>
                            <i className="bi bi-card-text"></i>
                          </button>
                          <a className="projects-content-button btn btn-primary" href={file.download_url} role="button">
                            <i className="bi bi-download"></i> ดาวน์โหลด
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <pre style={{ 'whiteSpace': action.wordWrap ? 'break-spaces' : 'pre' }}>
                        <code dangerouslySetInnerHTML={{ __html: content }} id={dataProps.id + "-" + file.name.toLowerCase() + "-code"}></code>
                      </pre>
                    </div>
                  </div>
                ) : ''
              }
              <div className="projects-source-code-info">
                <span>โปรแกรมอ่านซอร์สโค้ด v{version}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="projects-content-empty">
            <i className="bi bi-code-square"></i>
            <br />
            <span>
              ไม่มีซอร์สโค้ดที่พร้อมใช้งาน
            </span>
          </div>
        )
      }
    </div>
  )
}
