import { useState, useEffect } from 'react'
import { HfInference } from '@huggingface/inference'
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'

import { translator } from '../../../../../utils/functions/translator'
import { isMobile } from "../../../../../utils/functions/isMobile"

// Config
import config from '../../../../../configs/data'

export default function GetStart({ data, parameter, tabs }) {
  const [text, setText] = useState()
  const [compute, setCompute] = useState()
  const inference = new HfInference(config.HF_ACCESS_TOKEN)

  const handleCompute = async (event) => {
    event.target.disabled = true
    event.target.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' +
      '<span class="visually-hidden">' + translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.loading + '...</span>'

    const computeInput = document.querySelector('#' + data.id + 'ComputeInput')

    const model = 'Maseshi/' + data.tab.get_start.host.repo_model
    const prompt = computeInput.value
    const negativePrompt = 'blurry'
    const seed = Math.floor(Math.random() * 1000000000)

    const startTime = new Date().getTime()
    const result = await inference.textToImage({
      inputs: prompt + ', ' + seed,
      negative_prompt: negativePrompt,
      model: model
    })
    const endTime = new Date().getTime()
    const computeTime = ((endTime - startTime) / 1000)

    if (result.size) {
      setCompute({
        status: 200,
        prompt: prompt,
        negative_prompt: negativePrompt,
        seed: seed,
        model: model,
        compute_time: computeTime,
        device: computeTime <= 50 ? 'gpu' : 'cpu',
        src: URL.createObjectURL(result)
      })
    } else {
      setCompute({ error: true })
    }

    event.target.disabled = false
    event.target.innerHTML = translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute
  }

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
    markdown.renderer.rules.table_open = (tokens, idx) => {
      return '<table class="table">';
    }
    markdown.renderer.rules.blockquote_open = (tokens, idx) => {
      return '<blockquote class="blockquote">';
    }

    const getData = async () => {
      const type = data.tab.get_start ? data.tab.get_start.type : 'none'
      const content = data.tab.get_start ? data.tab.get_start.content : ''

      if (content) {
        const response = await fetch(content)

        if (response.ok) {
          const text = await response.text()
          let xmlString = markdown.render(text)

          if (type === 'huggingface') {
            if (xmlString.startsWith("<hr />")) {
              const position = xmlString.indexOf("<hr />", 6)
              const metadata = xmlString.substring(0, (position + 6))

              xmlString = xmlString.replace(metadata, '')
            }
          }

          return setText(xmlString)
        } else {
          return setText(
            '<div class="projects-content-get-start">' +
            '<div class="projects-content-empty">' +
            '<i class="bi bi-card-heading"></i>' +
            '<br />' +
            '<span>' +
            translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.this_tab_is_empty +
            '<br />' +
            translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.try_again_later +
            '</span>' +
            '</div>' +
            '</div>'
          )
        }
      } else {
        return setText(
          '<div class="projects-content-get-start">' +
          '<div class="projects-content-empty">' +
          '<i class="bi bi-card-heading"></i>' +
          '<br />' +
          '<span>' +
          translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.this_tab_is_empty +
          '<br />' +
          translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.try_again_later +
          '</span>' +
          '</div>' +
          '</div>'
        )
      }
    }
    getData()
  }, [data])

  return (
    <div
      className={
        parameter.tab === tabs[0] ? (
          "tab-pane fade show active"
        ) : (
          !tabs.includes(parameter.tab) ? (
            "tab-pane fade show active"
          ) : (
            "tab-pane fade"
          )
        )
      }
      id={data.id + "-get-start"}
      role="tabpanel"
      aria-labelledby={data.id + "-get-start-tab"}
    >
      {
        text ? (
          data.tab.get_start && data.tab.get_start.host.enable ? (
            <div className="projects-content-get-start row">
              <div className={isMobile() ? 'col-md-8 order-last' : 'col-md-8'}>
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
              </div>
              <div className={isMobile() ? 'col-md-4 order-first mb-3' : 'col-md-4'}>
                <h6 className="mb-3">
                  <i className="text-warning bi bi-lightning-charge-fill"></i> <strong>{translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.hosted_inference_api}</strong>
                </h6>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id={data.id + "ComputeInput"}
                    className="form-control"
                    placeholder={translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.your_sentence_here}
                    aria-label={translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.your_sentence_here}
                    aria-describedby={data.id + "ComputeButton"}
                  />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id={data.id + "ComputeButton"}
                    onClick={(event) => handleCompute(event)}
                  >
                    {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute}
                  </button>
                </div>
                <div className="form-text mb-3">
                  {
                    compute ? (
                      compute.status === 200 ? (
                        translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_time.replace('%s1', compute.device.toUpperCase()).replace('%s2', compute.compute_time)
                      ) : (
                        translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_error
                      )
                    ) : (
                      translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_description
                    )
                  }
                </div>
                <div className="projects-compute-output mb-3">
                  {
                    compute ? (
                      <img src={compute.src} alt={compute.prompt} />
                    ) : ''
                  }
                </div>
                <div className="projects-compute-info">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bookmark"></i> {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_info}
                      </h5>
                      <ul>
                        <li className="fw-bold">
                          {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_info_why_is_black_image}
                        </li>
                        <p className="text-secondary">
                          {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_info_why_is_black_image_answer}
                        </p>
                        <li className="fw-bold">
                          {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_info_load_very_long}
                        </li>
                        <p className="text-secondary">
                          {translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.compute_info_load_very_long_answer}
                        </p>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="projects-content-get-start">
              <div dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
          )
        ) : (
          <div className="projects-content-get-start">
            <div className="projects-content-loading mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">{translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.loading}...</span>
              </div>
              <br />
              <span>{translator().translate.pages.Projects.Pages.PageContents.Tabs.GetStarted.loading}...</span>
            </div>
          </div>
        )
      }
    </div>
  )
}
