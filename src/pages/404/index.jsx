import Highlight from 'highlight.js'

import 'highlight.js/styles/agate.css'
import './style.css'

export default function PageNotFound() {
    document.title = 'ไม่พบหน้านี้ | Maseshi'

    return (
        <section className="page-not-found">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-3 align-self-center">
                        <h1>404 Not Found</h1>
                        <p>
                            ไม่พบหน้าที่คุณขอ อาจจะถูกย้ายหรือลบไปแล้ว
                            <br />
                            ลองทำการตรวจสอบลิงค์ URL อีกครั้ง
                        </p>
                        <a className="page-not-found-button btn btn-dark" href="/">กลับไปยังหน้าหลัก</a>
                    </div>
                    <div className="col-md-6 align-self-center">
                        <div className="page-not-found-terminal">
                            <pre className="page-not-found-terminal-body">
                                <code className="page-not-found-error-code" dangerouslySetInnerHTML={
                                    {
                                        __html: Highlight.highlight(
                                            "Server Terminal [Version 1.0.1]\n(c) Maseshi. All rights reserved.\n\n\"CODE\": 404,\n\"ERROR\": {\n    \"host\": \"" + window.location.hostname + "\",\n    \"path\": \"" + window.location.pathname + "\",\n    \"userAgent\": \"" + navigator.userAgent + "\",\n}",
                                            {
                                                language: 'javascript'
                                            }
                                        ).value
                                    }
                                }></code>
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
    )
}
