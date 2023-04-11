import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/core'
import MarkdownIt from 'markdown-it'

// Functions
import { calculateFileSize } from '../../../../../utils/functions/calculateFileSize'
import { translator } from '../../../../../utils/functions/translator'

// Config
import config from '../../../../../configs/data'

export default function Changelog({ data, parameter, tabs }) {
  const [releases, setReleases] = useState()

  const markdown = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  markdown.renderer.rules.table_open = () => {
    return '<table class="table">';
  }
  markdown.renderer.rules.blockquote_open = () => {
    return '<blockquote class="blockquote">';
  }

  useEffect(() => {
    const getReleases = async () => {
      const octokit = new Octokit({ auth: config.OCTOKIT })
      const docs = data.tab.changelog ? data.tab.changelog.content : ''

      if (docs) {
        const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
          owner: 'Maseshi',
          repo: docs
        })

        if (response.status === 404) return
        if (response.status === 200) {
          const responseReleases = response.data

          return setReleases(responseReleases)
        }
      }
    }
    getReleases()
  }, [data])

  return (
    <div className={parameter.tab === tabs[3] ? "tab-pane fade show active" : "tab-pane fade"} id={data.id + "-changelog"} role="tabpanel" aria-labelledby={data.id + "-changelog-tab"}>
      {
        releases ? (
          <div className="projects-changelog accordion mt-3" id={"accordion-" + (data.tab.changelog ? data.tab.changelog.content.toLowerCase() : '') + "-releases"}>
            {
              releases.length ? (
                releases.map((dataReleases, index) => {
                  const repo = data.tab.changelog ? data.tab.changelog.content : ''
                  const assets = dataReleases.assets
                  const name = dataReleases.name
                  const body = dataReleases.body
                  const tag = dataReleases.tag_name
                  const prerelease = dataReleases.prerelease
                  const zip = dataReleases.zipball_url
                  const tar = dataReleases.tarball_url

                  const accordionID = repo.toLowerCase() + "-" + tag.replaceAll('.', '-')
                  const bodyFormat = markdown.render(body)
                  const urlHTMLRegex = /(>\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
                  const rawHTML = bodyFormat.replace(urlHTMLRegex, (url) => {
                    const link = url.replace('>', '')

                    if (link.includes('github.com')) {
                      if (link.includes('commit/')) {
                        const fullCommitID = link.substring(link.indexOf('commit/') + 7)
                        const commitID = fullCommitID.substring(0, 7)

                        return '<a class="projects-changelog-extra-link" href="' + link + '">' + commitID + '</a>'
                      }
                      if (link.includes('compare/')) {
                        const compare = link.substring(link.indexOf('compare/') + 8)

                        return '<a class="projects-changelog-extra-link" href="' + link + '">' + compare + '</a>'
                      }
                      if (link.includes('pull/')) {
                        const pull = link.substring(link.indexOf('pull/') + 5)

                        return '<a href="' + link + '">#' + pull + '</a>'
                      }
                    }

                    return '<a href="' + link + '">' + link + '</a>'
                  })

                  return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={"heading-" + accordionID}>
                        <button className={index === 0 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + accordionID} aria-expanded={index === 0 ? "true" : "false"} aria-controls={"collapse-" + accordionID}>
                          <span>
                            {
                              index === 0 ? (
                                <span className="badge rounded-pill text-bg-success">
                                  {translator().translate.pages.Projects.Pages.PageContents.Tabs.Changelog.latest}
                                </span>
                              ) : ''
                            } {name} {
                              prerelease ? (
                                <span className="badge rounded-pill text-bg-warning">
                                  {translator().translate.pages.Projects.Pages.PageContents.Tabs.Changelog.test}
                                </span>
                              ) : ''
                            }
                          </span>
                        </button>
                      </h2>
                      <div id={"collapse-" + accordionID} className={index === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading-" + accordionID} data-bs-parent={"#accordion-" + (data.tab.changelog ? data.tab.changelog.content.toLowerCase() : '') + "-releases"}>
                        <div className="projects-changelog-accordion-body accordion-body" dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
                        <div className="projects-changelog-accordion-footer">
                          <h4>
                            {translator().translate.pages.Projects.Pages.PageContents.Tabs.Changelog.resource} <span className="badge rounded-pill bg-primary">{assets ? (assets.length + 2) : 2}</span>
                          </h4>
                          <div className="projects-changelog-assets list-group">
                            {
                              assets ? (
                                assets.map((asset, assetsIndex) => {
                                  const assetDownloadURL = asset.browser_download_url
                                  const assetName = asset.name
                                  const assetSize = asset.size

                                  return (
                                    <a href={assetDownloadURL} className="list-group-item list-group-item-action" key={assetsIndex}>
                                      <i className="bi bi-file-earmark-zip"></i> <span className="projects-changelog-file-name">{assetName}</span> <span className="projects-changelog-file-size">{calculateFileSize(assetSize)}</span>
                                    </a>
                                  )
                                })
                              ) : ''
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
              ) : (
                <div className="projects-content-loading mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <br />
                  <span>{translator().translate.pages.Projects.Pages.PageContents.Tabs.Changelog.loading}...</span>
                </div>
              )
            }
          </div>
        ) : (
          <div className="projects-content-empty">
            <i className="bi bi-tags"></i>
            <br />
            <span>
              {translator().translate.pages.Projects.Pages.PageContents.Tabs.Changelog.no_release}
            </span>
          </div>
        )
      }
    </div>
  )
}
