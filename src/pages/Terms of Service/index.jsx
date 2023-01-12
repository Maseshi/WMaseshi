import DocumentMeta from 'react-document-meta'

import CookieAccept from '../../components/CookieAccept'
import useMarkDown from '../../utils/hooks/useMarkDown'

import { translator } from '../../utils/functions/translator'

import tos from '../../assets/documents/terms-of-service.md'

import './style.css'

export default function TermsOfService() {
    const xmlString = useMarkDown(tos)

    const meta = {
        title: translator().translate.pages.TermsOfService.website_title,
        description: translator().translate.pages.TermsOfService.website_description,
        canonical: '/terms-of-service',
        meta: {
            name: {
                keywords: 'maseshi, chaiwatsuwannarat, fluke, chaiwat',
                subject: translator().translate.pages.TermsOfService.website_subject,
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
            <div className="tos-welcome">
                <div className="container">
                    <h1>
                        {translator().translate.pages.TermsOfService.terms_of_service}
                    </h1>
                    <p>
                        {translator().translate.pages.TermsOfService.terms_of_service_description}
                    </p>
                    <hr />
                    <small>
                        {translator().translate.pages.TermsOfService.terms_of_service_last_edit}
                    </small>
                </div>
            </div>
            <section className="tos-content">
                <div className="container" dangerouslySetInnerHTML={{ __html: xmlString }}></div>
            </section>
            <CookieAccept />
        </DocumentMeta>
    )
}
