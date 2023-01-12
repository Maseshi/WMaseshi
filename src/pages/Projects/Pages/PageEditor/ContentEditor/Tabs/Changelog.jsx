import { useState } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function Changelog() {
    const [changelogSelection, setChangelogSelection] = useState(0)

    return (
        <div className="tab-pane fade" id="v-pills-changelog" role="tabpanel" aria-labelledby="v-pills-changelog-tab" tabIndex="0">
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.page_description}
            </p>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="changelogInfo" value={0} id="changelogNoInfo" defaultChecked onChange={() => setChangelogSelection(0)} />
                <label className="form-check-label" htmlFor="changelogNoInfo">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.no_data}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="changelogInfo" value={1} id="changelogRef" onChange={() => setChangelogSelection(1)} />
                <label className="form-check-label" htmlFor="changelogRef">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.Changelog.according_to_github}
                </label>
                {
                    changelogSelection === 1 ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text" id="changelogRefChecked">https://github.com/Maseshi/</span>
                                <input type="text" className="form-control" id="changelogRefURL" placeholder="WMaseshi" aria-describedby="get-start-ref-checked" />
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
