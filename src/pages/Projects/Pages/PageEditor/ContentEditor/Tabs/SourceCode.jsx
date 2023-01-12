import { useState } from 'react'

import { translator } from '../../../../../../utils/functions/translator'

export default function SourceCode() {
    const [sourceCodeSelection, setSourceCodeSelection] = useState(0)

    return (
        <div className="tab-pane fade" id="v-pills-source-code" role="tabpanel" aria-labelledby="v-pills-source-code-tab" tabIndex="0">
            <p>
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.page_description}
            </p>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="sourceCodeInfo" value={0} id="sourceCodeNoInfo" defaultChecked onChange={() => setSourceCodeSelection(0)} />
                <label className="form-check-label" htmlFor="sourceCodeNoInfo">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.no_data}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="sourceCodeInfo" value={1} id="sourceCodeRef" onChange={() => setSourceCodeSelection(1)} />
                <label className="form-check-label" htmlFor="sourceCodeRef">
                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Tabs.SourceCode.according_to_github}
                </label>
                {
                    sourceCodeSelection === 1 ? (
                        <div className="mt-3 mb-3">
                            <div className="input-group">
                                <span className="input-group-text" id="source-code-ref-checked">https://github.com/Maseshi/</span>
                                <input type="text" className="form-control" id="sourceCodeRefURL" placeholder="WMaseshi" aria-describedby="get-start-ref-checked" />
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
