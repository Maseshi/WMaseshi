import { Helmet } from 'react-helmet'

import CookieAccept from '../../components/CookieAccept/index'
import useMarkDown from '../../utils/hooks/useMarkDown'

import { translator } from '../../utils/functions/translator'

import pp from '../../assets/documents/privacy-policy.md'

import './style.css'

export default function PrivacyPolicy() {
    const xmlString = useMarkDown(pp)

    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.PrivacyPolicy.website_title}</title>
                <meta name="description" content={translator().translate.pages.PrivacyPolicy.website_description} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.PrivacyPolicy.website_subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.PrivacyPolicy.website_title} />
                <meta property="og:description" content={translator().translate.pages.PrivacyPolicy.website_description} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content="https://maseshi.web.app/privacy-policy" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://maseshi.web.app/privacy-policy" />
            </Helmet>
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
        </>
    )
}
