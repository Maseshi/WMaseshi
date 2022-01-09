import React, { Component } from 'react'

import './style.css'

export default class index extends Component {
    render() {
        document.title = 'ไม่พบหน้านี้ | Maseshi'

        return (
            <section className="page-not-found">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-3 align-self-center">
                            <h1>404 - Not Found</h1>
                            <p>ไม่พบหน้าที่คุณขอ อาจจะถูกย้ายหรือลบไปแล้ว</p>
                            <a className="page-not-found-button btn btn-dark" href="/">กลับ</a>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <div className="page-not-found-terminal">
                                <div className="page-not-found-terminal-body">
                                    <p>Server Terminal [Version 1.0.0]</p>
                                    <p>(c) Maseshi. All rights reserved.</p>
                                    <br />
                                    <p className="text-warning" dangerouslySetInnerHTML={
                                        {
                                            __html: 'error: {<br>' +
                                                '   code: 404,<br>' +
                                                '   userAgent: ' + navigator.userAgent + '<br>' +
                                                '}'
                                        }
                                    }></p>
                                </div>
                                <div className="page-not-found-terminal-input d-flex align-items-center">
                                    <label htmlFor="terminalInput">≫ </label>
                                    <input className="form-control" disabled placeholder="Access is denied." type="text" id="terminalInput" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
