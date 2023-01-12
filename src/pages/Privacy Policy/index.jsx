import DocumentMeta from 'react-document-meta'

import CookieAccept from '../../components/CookieAccept/index'
import useMarkDown from '../../utils/hooks/useMarkDown'

import { translator } from '../../utils/functions/translator'

import pp from '../../assets/documents/privacy-policy.md'

import './style.css'

export default function PrivacyPolicy() {
    const xmlString = useMarkDown(pp)

    const meta = {
        title: translator().translate.pages.PrivacyPolicy.website_title,
        description: translator().translate.pages.PrivacyPolicy.website_description,
        canonical: '/privacy-policy',
        meta: {
            name: {
                keywords: 'maseshi, chaiwatsuwannarat, fluke, chaiwat',
                subject: translator().translate.pages.PrivacyPolicy.website_subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/maseshi_banner.jpg',
                'og:site_name': 'Maseshi'
            }
        }
    }

    return (
        <DocumentMeta {...meta}>
            <div className="pp-welcome">
                <div className="container">
                    <h1>
                        {translator().translate.pages.PrivacyPolicy.privacy_policy}
                    </h1>
                    <p>
                        {translator().translate.pages.PrivacyPolicy.privacy_policy_description}
                    </p>
                    <hr />
                    <small>
                        {translator().translate.pages.PrivacyPolicy.privacy_policy_last_edit}
                    </small>
                </div>
            </div>
            <section className="pp-content">
                <div className="container" dangerouslySetInnerHTML={{ __html: xmlString }}></div>
            </section>
            <CookieAccept />
        </DocumentMeta>
    )
}
