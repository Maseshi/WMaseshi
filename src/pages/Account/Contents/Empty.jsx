import { useSearchParams } from 'react-router-dom'

import { translator } from '../../../utils/functions/translator'

export default function Empty({ tabs }) {
    const [searchParams] = useSearchParams()
    const tabParam = searchParams.get('tab')

    return (
        <div
            className={
                tabs.includes(tabParam) ? (
                    'tab-pane fade'
                ) : (
                    'tab-pane fade show active'
                )
            }
            id="v-pills-empty"
            role="tabpanel"
            aria-labelledby="v-pills-empty-tab"
        >
            <div className="account-content-tab-title">
                <i className="bi bi-x-circle"></i>
                <h2>{translator().translate.pages.Account.Contents.Contents.this_tab_empty}</h2>
                <p>{translator().translate.pages.Account.Contents.Contents.this_tab_no_information}</p>
            </div>
        </div>
    )
}
