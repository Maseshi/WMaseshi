import { useState, useEffect } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function Changelog({ data }) {
    const [changelogSelection, setChangelogSelection] = useState("none")

    useEffect(() => {
        if (data) setChangelogSelection(data.tab.changelog.type)
    }, [data])

    return (
        <div
            className="tab-pane fade"
            id={
                data ? (
                    'v-pills-' + data.id + '-changelog'
                ) : (
                    'v-pills-changelog'
                )
            }
            role="tabpanel"
            aria-labelledby={
                data ? (
                    'v-pills-' + data.id + '-changelog-tab'
                ) : (
                    'v-pills-changelog-tab'
                )
            }
            tabIndex="0"
        >
            <h4>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.reference_data}
            </h4>
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.page_description}
            </p>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '')
                        ) : (
                            'changelogTab'
                        )
                    }
                    value="none"
                    checked={changelogSelection === "none"}
                    id={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'changelogTabValueNone'
                        )
                    }
                    onChange={(event) => setChangelogSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '') + 'ValueNone'
                        ) : (
                            'changelogTabValueNone'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.no_data}
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '')
                        ) : (
                            'changelogTab'
                        )
                    }
                    value="github"
                    checked={changelogSelection === "github"}
                    id={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'changelogTabValueGithub'
                        )
                    }
                    onChange={(event) => setChangelogSelection(event.target.value)}
                />
                <label
                    className="form-check-label"
                    htmlFor={
                        data ? (
                            'changelogTab' + data.title.replace(' ', '') + 'ValueGithub'
                        ) : (
                            'changelogTabValueGithub'
                        )
                    }
                >
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.according_to_github}
                </label>
                {
                    changelogSelection === "github" ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    id={
                                        data ? (
                                            'changelogTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'changelogTabLabelGithub'
                                        )
                                    }
                                >
                                    https://github.com/Maseshi/
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={data && data.tab.changelog ? data.tab.changelog.content : ''}
                                    id={
                                        data ? (
                                            'changelogTab' + data.title.replace(' ', '') + 'InputGithub'
                                        ) : (
                                            'changelogTabInputGithub'
                                        )
                                    }
                                    placeholder="WMaseshi"
                                    aria-describedby={
                                        data ? (
                                            'changelogTab' + data.title.replace(' ', '') + 'LabelGithub'
                                        ) : (
                                            'changelogTabLabelGithub'
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
