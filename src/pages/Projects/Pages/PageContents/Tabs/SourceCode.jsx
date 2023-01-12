import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/core'
import Psd from '@webtoon/psd'
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

// Functions
import { isMobile } from '../../../../../utils/functions/isMobile'
import { calculateFileSize } from '../../../../../utils/functions/calculateFileSize'
import { translator } from '../../../../../utils/functions/translator'

// Config
import config from '../../../../../configs/data'

import 'highlight.js/styles/github.css'

export default function SourceCode(props) {
  const [directory, setDirectory] = useState([])
  const [content, setContent] = useState()
  const [file, setFile] = useState()
  const [path, setPath] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [action, setAction] = useState({
    wordWrap: false,
    raw: {
      show: false,
      rawContent: '',
      formatContent: ''
    }
  })

  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

  const version = '1.2.0'
  const imageExtensions = /.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp|bmp|ico|cur|tif|tiff)$/i
  const audioExtensions = /.(3gp|aa|aac|aax|act|aiff|alac|amr|ape|au|awb|dss|dvf|flac|gsm|iklax|ivs|m4a|m4b|m4p|mmf|mp3|mpc|msv|nmf|ogg|oga|mogg|opus|ra|rm|raw|rt64|sln|tta|voc|vox|wav|wma|wv|webm|8svx|cda)$/i
  const markdownExtensions = /.(md|markdown|mdown|mkdn|mkd|mdwn|mdtxt|mdtext)$/i
  const PhotoshopExtensions = /.(psd|pdd|psdt)$/i
  const FLStudioExtensions = /.(flp)$/i
  const octokit = new Octokit({ auth: config.OCTOKIT })

  useEffect(() => {
    const getDirectory = async () => {
      const OTkit = new Octokit({ auth: config.OCTOKIT })
      const docs = dataProps.tab.sourcecode

      if (docs) {
        const response = await OTkit.request('GET /repos/{owner}/{repo}/contents/', {
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
        setAction({
          wordWrap: false,
          raw: {
            show: false,
            rawContent: '',
            formatContent: ''
          }
        })
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
        const responseFile = response.data
        const fileName = responseFile.name
        const fileContent = responseFile.content
        const fileDownload = responseFile.download_url
        const paths = dir.split('/')

        let format = ''

        if (fileName.match(imageExtensions)) {
          format = '<img class="projects-source-code-content-image" src="' + fileDownload + '" width="100%" alt="' + fileName + '" />'
        } else if (fileName.match(audioExtensions)) {
          const fileExtension = fileName.split('.').pop()

          format = '<audio class="projects-source-code-content-audio" controls>' +
            '<source src="' + fileDownload + '" type="audio/' + fileExtension + '" />' +
            translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.audio_not_support +
            '</audio>'
        } else if (fileName.match(markdownExtensions)) {
          let fileExtension = 'plaintext'
          const decodedBase64 = decodeURIComponent(escape(atob(fileContent)))
          const markdown = new MarkdownIt({
            html: true,
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

          markdown.renderer.rules.table_open = (tokens, idx) => {
            return '<table class="table">';
          }

          markdown.renderer.rules.blockquote_open = (tokens, idx) => {
            return '<blockquote class="blockquote">';
          }

          if (fileName.substr(0, fileName.indexOf('.'))) {
            if (/[.]/.exec(fileName)) {
              fileExtension = fileName.split('.').pop()
            }
          }

          format = markdown.render(decodedBase64)
          setAction({
            wordWrap: false,
            raw: {
              show: false,
              rawContent: HighlightJs.highlight(decodedBase64, { language: fileExtension }).value,
              formatContent: format
            }
          })
        } else if (fileName.match(FLStudioExtensions)) {
          format = '<div class="projects-source-code-content-can-not-open">' +
            '<h5>' +
            '<i class="bi bi-exclamation-circle-fill"></i> ' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.fl_studio_not_support +
            '</h5>' +
            '<span>ERROR: FL_STUDIO_FILE_DOES_NOT_SUPPORTED</span>' +
            '<br />' +
            '<a class="btn btn-link" href="' + fileDownload + '" role="button" target="_blank">' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.view_raw_files + '</a>' +
            '</div>'
        } else if (fileName.match(PhotoshopExtensions)) {
          const response = await fetch(fileDownload)
          const file = await response.arrayBuffer()
          const psdFile = Psd.parse(file)

          const canvasElement = document.createElement('canvas')
          const context = canvasElement.getContext('2d')
          const compositeBuffer = await psdFile.composite()
          const imageData = new ImageData(
            compositeBuffer,
            psdFile.width,
            psdFile.height
          )

          canvasElement.width = psdFile.width
          canvasElement.height = psdFile.height

          context.putImageData(imageData, 0, 0)

          format = '<img class="projects-source-code-content-image" src="' + canvasElement.toDataURL('image/png') + '" width="100%" alt="' + fileName + '" />'
        } else if (fileContent) {
          try {
            try {
              let fileExtension = 'plaintext'
              const decodedBase64 = decodeURIComponent(escape(atob(fileContent)))

              if (fileName.substr(0, fileName.indexOf('.'))) {
                if (/[.]/.exec(fileName)) {
                  fileExtension = fileName.split('.').pop()
                }
              }

              format = HighlightJs.highlight(decodedBase64, { language: fileExtension }).value
            } catch (error) {
              const decodedBase64 = decodeURIComponent(escape(atob(fileContent)))

              format = HighlightJs.highlight(decodedBase64, { language: 'plaintext' }).value
            }
          } catch (error) {
            format = '<div class="projects-source-code-content-can-not-open">' +
              '<h5>' +
              '<i class="bi bi-exclamation-circle-fill"></i> ' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.can_not_open_file +
              '</h5>' +
              '<span>ERROR: CAN_NOT_OPEN_FILE</span>' +
              '<br />' +
              '<a class="btn btn-link" href="' + fileDownload + '" role="button" target="_blank">' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.view_raw_files + '</a>' +
              '</div>'
          }
        } else {
          format = '<div class="projects-source-code-content-can-not-open">' +
            '<h5>' +
            '<i class="bi bi-exclamation-circle-fill"></i> ' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.file_is_too_large +
            '</h5>' +
            '<span>ERROR: LIMIT_FILE_SIZE</span>' +
            '<br />' +
            '<a class="btn btn-link" href="' + fileDownload + '" role="button" target="_blank">' + translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.view_raw_files + '</a>' +
            '</div>'
        }

        history.push(dir)

        setDirectory()
        setFile(responseFile)
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
                {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.according_to_github}
                <br />
                {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.need_more_information} <a href={'https://github.com/Maseshi/' + dataProps.tab.sourcecode}>https://github.com/Maseshi/{dataProps.tab.sourcecode}</a>
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
                                    <span className="visually-hidden">{translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.loading}...</span>
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
                                    <span className="visually-hidden">{translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.loading}...</span>
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
                          let fileSize = '', icon = ''
                          const directoryName = list.name
                          const directoryType = list.type
                          const directoryPath = list.path
                          const directorySize = list.size

                          if (directorySize) fileSize = calculateFileSize(directorySize)

                          switch (directoryType) {
                            case 'file':
                              if (directoryName.match(imageExtensions)) {
                                icon = <i className="bi bi-file-image"></i>
                              } else if (directoryName.match(audioExtensions)) {
                                icon = <i className="bi bi-file-music"></i>
                              } else if (directoryName.match(markdownExtensions)) {
                                if (directoryName.toLowerCase() === 'readme.md') {
                                  icon = <i className="bi bi-journal"></i>
                                } else {
                                  icon = <i className="bi bi-filetype-md"></i>
                                }
                              } else if (directoryName.match(PhotoshopExtensions)) {
                                icon = <i className="bi bi-filetype-psd"></i>
                              } else {
                                icon = <i className="bi bi-file-earmark-text"></i>
                              }
                              break
                            case 'dir':
                              icon = <i className="bi bi-folder-fill"></i>
                              break
                            default:
                              icon = <i className="bi bi-exclamation-circle"></i>
                          }

                          return (
                            <button className={loading ? "list-group-item list-group-item-action disabled" : "list-group-item list-group-item-action"} type="button" onClick={directoryType === "file" ? () => openFile(directoryPath) : () => openFolder(directoryPath)} key={index}>
                              {icon} <span className="projects-source-code-file-name">{directoryName}</span> <span className="projects-source-code-file-size">{fileSize}</span>
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
                                <span className="projects-source-code-content-file-size">
                                  {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.file_size}: {calculateFileSize(file.size)}
                                </span>
                                <br />
                                <span className="projects-source-code-content-file-sha">SHA: {file.sha}</span>
                              </>
                            ) : (
                              <span>
                                {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.file_size}: {calculateFileSize(file.size)} | SHA: {file.sha}
                              </span>
                            )
                          }
                        </div>
                        <div className="projects-source-code-content-file-action col-md-4">
                          {
                            action.raw.rawContent && action.raw.formatContent ? (
                              <button className={action.raw.show ? "projects-content-button btn btn-outline-primary active" : "projects-content-button btn btn-outline-primary"} onClick={
                                () => {
                                  const contentElement = document.querySelector('.projects-source-code-content > .card-body > pre')

                                  setContent(
                                    action.raw.show ? (
                                      action.raw.formatContent
                                    ) : (
                                      action.raw.rawContent
                                    )
                                  )
                                  setAction({
                                    wordWrap: action.wordWrap,
                                    raw: {
                                      show: !action.raw.show,
                                      rawContent: action.raw.rawContent,
                                      formatContent: action.raw.formatContent
                                    }
                                  })

                                  if (action.raw.show) {
                                    contentElement.classList.remove('projects-source-code-content-raw-content')
                                    contentElement.classList.add('projects-source-code-content-format-content')
                                  } else {
                                    contentElement.classList.add('projects-source-code-content-raw-content')
                                    contentElement.classList.remove('projects-source-code-content-format-content')
                                  }
                                }
                              } data-bs-toggle="button" autoComplete="off" type="button" aria-pressed={action.raw.show ? "true" : "false"}>
                                <i className="bi bi-filetype-raw"></i>
                              </button>
                            ) : ('')
                          }
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
                          <button className={action.wordWrap ? "projects-content-button btn btn-outline-primary active" : "projects-content-button btn btn-outline-primary"} onClick={
                            () => {
                              const contentElement = document.querySelector('.projects-source-code-content > .card-body > pre')

                              setAction({
                                wordWrap: !action.wordWrap,
                                raw: {
                                  show: action.raw.show,
                                  rawContent: action.raw.rawContent,
                                  formatContent: action.raw.formatContent
                                }
                              })

                              if (action.wordWrap) {
                                if (action.raw.show) {
                                  contentElement.classList.add('projects-source-code-content-raw-content')
                                } else {
                                  if (!action.raw.rawContent && !action.raw.formatContent) {
                                    contentElement.classList.add('projects-source-code-content-raw-content')
                                  } else {
                                    contentElement.classList.add('projects-source-code-content-format-content')
                                  }
                                }
                                contentElement.classList.remove('projects-source-code-content-word-wrap')
                              } else {
                                contentElement.classList.remove('projects-source-code-content-raw-content')
                                contentElement.classList.add('projects-source-code-content-word-wrap')
                              }
                            }
                          } data-bs-toggle="button" autoComplete="off" type="button" aria-pressed={action.wordWrap ? "true" : "false"}>
                            <i className="bi bi-card-text"></i>
                          </button>
                          <a className="projects-content-button btn btn-primary" href={file.download_url} role="button">
                            <i className="bi bi-download"></i> {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.download}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <pre className={action.raw.rawContent && action.raw.formatContent ? "projects-source-code-content-format-content" : "projects-source-code-content-raw-content"}>
                        <code dangerouslySetInnerHTML={{ __html: content }} id={dataProps.id + "-" + file.name.toLowerCase() + "-code"}></code>
                      </pre>
                    </div>
                  </div>
                ) : ''
              }
              <div className="projects-source-code-info">
                <span>{translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.program_source_code} v{version}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="projects-content-empty">
            <i className="bi bi-code-square"></i>
            <br />
            <span>
              {translator().translate.pages.Projects.Pages.PageContents.Tabs.SourceCode.no_source_code_available}
            </span>
          </div>
        )
      }
    </div>
  )
}
