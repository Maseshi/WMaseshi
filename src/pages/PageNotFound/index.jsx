import { Helmet } from 'react-helmet'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function PageNotFound() {
    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.PageNotFound.website_title}</title>
                <meta name="description" content={translator().translate.pages.PageNotFound.descriptions} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.PageNotFound.website_subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.PageNotFound.website_title} />
                <meta property="og:description" content={translator().translate.pages.PageNotFound.descriptions} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content={'https://maseshi.web.app/' + window.location.pathname} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={'https://maseshi.web.app/' + window.location.pathname} />
            </Helmet>
            <section className="page-not-found">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-3 align-self-center">
                            <h1 className="page-not-found-title">404</h1>
                            <small className="text-secondary">PAGE_NOT_FOUND</small>
                            <p>
                                {translator().translate.pages.PageNotFound.error_description}
                                <br />
                                {translator().translate.pages.PageNotFound.suggestions}
                            </p>
                            <a className="page-not-found-button btn btn-dark" href="/">
                                {translator().translate.pages.PageNotFound.back_to_home_page}
                            </a>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <div className="page-not-found-terminal">
                                <div className="page-not-found-terminal-header">
                                    <hr />
                                </div>
                                <pre className="page-not-found-terminal-body">
                                    <code
                                        className="page-not-found-error-code"
                                        dangerouslySetInnerHTML={
                                            {
                                                __html: "Server Terminal [Version 1.2.0]\n(c) Maseshi. All rights reserved.\n\n\"CODE\": 404,\n\"ERROR\": {\n    \"host\": \"" + window.location.hostname + "\",\n    \"path\": \"" + window.location.pathname + "\",\n    \"userAgent\": \"" + navigator.userAgent + "\",\n}"
                                            }
                                        }
                                    ></code>
                                </pre>
                                <div className="page-not-found-terminal-input d-flex align-items-center">
                                    <label htmlFor="terminalInput">&gt; </label>
                                    <input className="form-control" disabled readOnly placeholder="Access is denied." type="text" id="terminalInput" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
