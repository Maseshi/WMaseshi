import { Helmet } from 'react-helmet'

import CookieAccept from '../../components/CookieAccept'
import useMarkDown from '../../utils/hooks/useMarkDown'

import { translator } from '../../utils/functions/translator'

import tos from '../../assets/documents/terms-of-service.md'

import './style.css'

export default function TermsOfService() {
    const xmlString = useMarkDown(tos)

    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.TermsOfService.website_title}</title>
                <meta name="description" content={translator().translate.pages.TermsOfService.website_description} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.TermsOfService.website_subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.TermsOfService.website_title} />
                <meta property="og:description" content={translator().translate.pages.TermsOfService.website_description} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content='https://maseshi.web.app/terms-of-service' />
                <meta property="og:type" content="website" />
                <link rel="canonical" href='https://maseshi.web.app/terms-of-service' />
            </Helmet>
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
        </>
    )
}
