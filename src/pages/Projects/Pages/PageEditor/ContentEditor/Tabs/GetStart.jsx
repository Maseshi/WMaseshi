import { useState } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function GetStart() {
    const [getStartSelection, setGetStartSelection] = useState(0)

    return (
        <div className="tab-pane fade show active" id="v-pills-get-start" role="tabpanel" aria-labelledby="v-pills-get-start-tab" tabIndex="0">
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.page_description}
            </p>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="getStartInfo" value={0} id="getStartNoInfo" defaultChecked onChange={() => setGetStartSelection(0)} />
                <label className="form-check-label" htmlFor="getStartNoInfo">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.no_data}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="getStartInfo" value={1} id="getStartRef" onChange={() => setGetStartSelection(1)} />
                <label className="form-check-label" htmlFor="getStartRef">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.according_to_github}
                </label>
                {
                    getStartSelection === 1 ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text" id="getStartRefChecked">https://raw.githubusercontent.com/Maseshi/</span>
                                <input type="text" className="form-control" id="getStartRefURL" placeholder="WMaseshi" aria-describedby="get-start-ref-checked" />
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="getStartInfo" value={2} id="getStartText" disabled onChange={() => setGetStartSelection(2)} />
                <label className="form-check-label" htmlFor="getStartText">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.GetStarted.custom_coming_soon}
                </label>
            </div>
        </div>
    )
}
