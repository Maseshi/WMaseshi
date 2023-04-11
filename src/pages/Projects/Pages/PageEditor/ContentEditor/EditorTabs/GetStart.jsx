import { useEffect, useState } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function GetStart({ data }) {
    const [getStartSelection, setGetStartSelection] = useState('none')
    const [getStartHostSelection, setGetStartHostSelection] = useState('false')
    const [getStartInputTypeHostTrueSelection, setGetStartInputTypeHostTrueSelection] = useState('text-to-image')

    useEffect(() => {
        if (data) {
            setGetStartSelection(data.tab.get_start.type)
            setGetStartHostSelection(data.tab.get_start.host.enable.toString())
            setGetStartInputTypeHostTrueSelection(data.tab.get_start.host.type)
        }
    }, [data])

    return (
        <div
            className="tab-pane fade show active"
            id={
                data ? (
                    'v-pills-' + data.id + '-get-start'
                ) : (
                    'v-pills-get-start'
                )
            }
            role="tabpanel"
            aria-labelledby={
                data ? (
                    'v-pills-' + data.id + '-get-start-tab'
                ) : (
                    'v-pills-get-start-tab'
                )
            }
            tabIndex="0"
        >
            <h4>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.reference_data}
            </h4>
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.page_description}
            </p>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '')
                        ) : (
                            'getStartTab'
                        )
                    }
                    value="none"
                    checked={getStartSelection === "none"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'getStartTabValueNone'
                        )
                    }
                    onChange={(event) => setGetStartSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'getStartTabValueNone'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.no_data}
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '')
                        ) : (
                            'getStartTab'
                        )
                    }
                    value="github"
                    checked={getStartSelection === "github"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'getStartTabValueGithub'
                        )
                    }
                    onChange={(event) => setGetStartSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'getStartTabValueGithub'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.according_to_github}
                </label>
                {
                    getStartSelection === "github" ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'getStartTabLabelGithub'
                                        )
                                    }
                                >
                                    https://raw.githubusercontent.com/Maseshi/
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={data && data.tab.get_start ? data.tab.get_start.content.replace('https://raw.githubusercontent.com/Maseshi/', '') : ''}
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'InputGithub'
                                        ) : (
                                            'getStartTabInputGithub'
                                        )
                                    }
                                    placeholder="WMaseshi/main/docs/README.th.md"
                                    aria-describedby={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'getStartTabLabelGithub'
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '')
                        ) : (
                            'getStartTab'
                        )
                    }
                    value="huggingface"
                    checked={getStartSelection === "huggingface"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHuggingface'
                        ) : (
                            'getStartTabValueHuggingface'
                        )
                    }
                    onChange={(event) => setGetStartSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHuggingface'
                        ) : (
                            'getStartTabValueHuggingface'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.reference_from_huggingface}
                </label>
                {
                    getStartSelection === "huggingface" ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'LabelHuggingface'
                                        ) : (
                                            'getStartTabLabelHuggingface'
                                        )
                                    }
                                >
                                    https://huggingface.co/Maseshi/
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={data && data.tab.get_start ? data.tab.get_start.content.replace('https://huggingface.co/Maseshi/', '') : ''}
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'InputHuggingface'
                                        ) : (
                                            'getStartTabInputHuggingface'
                                        )
                                    }
                                    placeholder="WMaseshi/raw/main/README.md"
                                    aria-describedby={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'LabelHuggingface'
                                        ) : (
                                            'getStartTabLabelHuggingface'
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '')
                        ) : (
                            'getStartTab'
                        )
                    }
                    value="custom"
                    checked={getStartSelection === "custom"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueCustom'
                        ) : (
                            'getStartTabValueCustom'
                        )
                    }
                    disabled
                    onChange={(event) => setGetStartSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueCustom'
                        ) : (
                            'getStartTabValueCustom'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.custom_coming_soon}
                </label>
            </div>
            <br />
            <h4>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference}
            </h4>
            <small>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_note}
            </small>
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_description}
            </p>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'Host'
                        ) : (
                            'getStartTabHost'
                        )
                    }
                    value="true"
                    checked={getStartHostSelection === "true"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHostTrue'
                        ) : (
                            'getStartTabValueHostTrue'
                        )
                    }
                    onChange={(event) => setGetStartHostSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHostTrue'
                        ) : (
                            'getStartTabValueHostTrue'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_yes}
                </label>
                {
                    getStartHostSelection === "true" ? (
                        <>
                            <div className="mt-3 mb-3">
                                <label
                                    htmlFor={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'LabelHostTrue'
                                        ) : (
                                            'getStartTabLabelHostTrue'
                                        )
                                    }
                                    className="form-label"
                                >
                                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_model_link}
                                </label>
                                <div className="input-group">
                                    <span
                                        className="input-group-text"
                                        id={
                                            data ? (
                                                'getStartTab' + data.title.replace(' ', '') + 'TextHostTrue'
                                            ) : (
                                                'getStartTabTextHostTrue'
                                            )
                                        }
                                    >
                                        https://huggingface.co/Maseshi/
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={data && data.tab.get_start ? data.tab.get_start.host.repo_model : ''}
                                        id={
                                            data ? (
                                                'getStartTab' + data.title.replace(' ', '') + 'InputLinkHostTrue'
                                            ) : (
                                                'getStartTabInputLinkHostTrue'
                                            )
                                        }
                                        placeholder="WMaseshi"
                                        aria-describedby={
                                            data ? (
                                                'getStartTab' + data.title.replace(' ', '') + 'TextHostTrue'
                                            ) : (
                                                'getStartTabTextHostTrue'
                                            )
                                        }
                                    />
                                </div>
                                <div
                                    className="form-text"
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'HelpHostTrue'
                                        ) : (
                                            'getStartTabHelpHostTrue'
                                        )
                                    }
                                >
                                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_help_model} <a href="https://huggingface.co/Maseshi" target="_blank" rel="noreferrer noopener">Huggingface</a>
                                </div>
                            </div>
                            <div className="mt-3 mb-3">
                                <label
                                    htmlFor={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'InputTypeHostTrue'
                                        ) : (
                                            'getStartTabInputTypeHostTrue'
                                        )
                                    }
                                    className="form-label"
                                >
                                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_model_type}
                                </label>
                                <select
                                    className="form-select"
                                    value={getStartInputTypeHostTrueSelection}
                                    id={
                                        data ? (
                                            'getStartTab' + data.title.replace(' ', '') + 'InputTypeHostTrue'
                                        ) : (
                                            'getStartTabInputTypeHostTrue'
                                        )
                                    }
                                    onChange={(event) => setGetStartInputTypeHostTrueSelection(event.target.value)}
                                >
                                    <option value="text-to-image">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_model_type_text_to_image}</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        ''
                    )
                }
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'Host'
                        ) : (
                            'getStartTabHost'
                        )
                    }
                    value="false"
                    checked={getStartHostSelection === "false"}
                    id={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHostFalse'
                        ) : (
                            'getStartTabValueHostFalse'
                        )
                    }
                    onChange={(event) => setGetStartHostSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'getStartTab' + data.title.replace(' ', '') + 'ValueHostFalse'
                        ) : (
                            'getStartTabValueHostFalse'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.hosted_inference_no}
                </label>
            </div>
        </div>
    )
}
