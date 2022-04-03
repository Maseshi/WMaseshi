import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/core'
import MarkdownIt from 'markdown-it'

// Functions
import { calculateFileSize } from '../../../utils/functions/calculateFileSize'

// Config
import config from '../../../configs/config'

export default function Changelog(props) {
  const [releases, setReleases] = useState()

  const dataProps = props.data
  const parameterProps = props.parameter
  const tabIDProps = props.tabID

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

  useEffect(() => {
    const getReleases = async () => {
      const octokit = new Octokit({ auth: config.OCTOKIT })
      const docs = dataProps.tab.changelog

      if (docs) {
        setReleases([])

        const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
          owner: 'Maseshi',
          repo: docs
        })

        if (response.status === 404) return
        if (response.status === 200) {
          const releases = response.data

          return setReleases(releases)
        }
      }
    }
    getReleases()
  }, [dataProps])

  return (
    <div className={parameterProps.tab === tabIDProps[3] ? "tab-pane fade show active" : "tab-pane fade"} id={dataProps.id + "-changelog"} role="tabpanel" aria-labelledby={dataProps.id + "-changelog-tab"}>
      {
        releases ?
          <div className="projects-changelog accordion mt-3" id={"accordion-" + dataProps.tab.changelog.toLowerCase() + "-releases"}>
            {
              releases.length ?
                releases.map((data, index) => {
                  const repo = dataProps.tab.changelog
                  const assets = data.assets
                  const name = data.name
                  const body = data.body
                  const tag = data.tag_name
                  const zip = data.zipball_url
                  const tar = data.tarball_url

                  const accordionID = repo.toLowerCase() + "-" + tag.replaceAll('.', '-')
                  const bodyFormat = markdown.render(body)

                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={"heading-" + accordionID}>
                        <button className={index === 0 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + accordionID} aria-expanded={index === 0 ? "true" : "false"} aria-controls={"collapse-" + accordionID}>
                          <span>
                            {index === 0 ? <span className="badge rounded-pill bg-success">ล่าสุด</span> : ''} {name}
                          </span>
                        </button>
                      </h2>
                      <div id={"collapse-" + accordionID} className={index === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading-" + accordionID} data-bs-parent={"#accordion-" + dataProps.tab.changelog.toLowerCase() + "-releases"}>
                        <div className="projects-changelog-accordion-body accordion-body" dangerouslySetInnerHTML={{ __html: bodyFormat }}></div>
                        <div className="projects-changelog-accordion-footer">
                          <h4>
                            ทรัพยากร <span className="badge rounded-pill bg-primary">{assets ? (assets.length + 2) : 2}</span>
                          </h4>
                          <div className="list-group">
                            {
                              assets ?
                                assets.map((asset, index) => {
                                  const downloadURL = asset.browser_download_url
                                  const name = asset.name
                                  const size = asset.size

                                  return (
                                    <a href={downloadURL} className="list-group-item list-group-item-action" key={index}>
                                      <i className="bi bi-file-earmark-zip"></i> <span className="projects-changelog-file-name">{name}</span> <span className="projects-changelog-file-size">{calculateFileSize(size)}</span>
                                    </a>
                                  )
                                })
                                :
                                ''
                            }
                            <a href={zip} className="list-group-item list-group-item-action">
                              <i className="bi bi-file-earmark-zip"></i> Source code (zip)
                            </a>
                            <a href={tar} className="list-group-item list-group-item-action">
                              <i className="bi bi-file-earmark-zip"></i> Source code (tar.gz)
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                <div className="projects-content-loading mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <br />
                  <span>กำลังโหลด...</span>
                </div>
            }
          </div>
          :
          <div className="projects-content-empty">
            <i className="bi bi-tags"></i>
            <br />
            <span>
              ยังไม่มีเวอร์ชั่นที่เผยแพร่แล้ว
            </span>
          </div>
      }
    </div>
  )
}
