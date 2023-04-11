import { useState, useEffect } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function SourceCode({ data }) {
    const [sourceCodeSelection, setSourceCodeSelection] = useState("none")

    useEffect(() => {
        if (data) setSourceCodeSelection(data.tab.source_code.type)
    }, [data])

    return (
        <div
            className="tab-pane fade"
            id={
                data ? (
                    'v-pills-' + data.id + '-source-code'
                ) : (
                    'v-pills-source-code'
                )
            }
            role="tabpanel"
            aria-labelledby={
                data ? (
                    'v-pills-' + data.id + '-source-code-tab'
                ) : (
                    'v-pills-source-code-tab'
                )
            }
            tabIndex="0"
        >
            <h4>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.reference_data}
            </h4>
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.page_description}
            </p>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '')
                        ) : (
                            'sourceCodeTab'
                        )
                    }
                    value="none"
                    checked={sourceCodeSelection === "none"}
                    id={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'sourceCodeTabValueNone'
                        )
                    }
                    onChange={(event) => setSourceCodeSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'sourceCodeTabValueNone'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.no_data}
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '')
                        ) : (
                            'sourceCodeTab'
                        )
                    }
                    value="github"
                    checked={sourceCodeSelection === "github"}
                    id={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'sourceCodeTabValueGithub'
                        )
                    }
                    onChange={(event) => setSourceCodeSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'sourceCodeTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'sourceCodeTabValueGithub'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.according_to_github}
                </label>
                {
                    sourceCodeSelection === "github" ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    id={
                                        data ? (
                                            'sourceCodeTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'sourceCodeTabLabelGithub'
                                        )
                                    }
                                >
                                    https://github.com/Maseshi/
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={
                                        data ? (
                                            'sourceCodeTab' + data.title.replace(' ', '') + 'InputGithub'
                                        ) : (
                                            'sourceCodeTabInputGithub'
                                        )
                                    }
                                    placeholder="WMaseshi"
                                    aria-describedby={
                                        data ? (
                                            'sourceCodeTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'sourceCodeTabLabelGithub'
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
        </div>
    )
}
