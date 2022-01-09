import React, { Component } from 'react'

export default class Other extends Component {
    render() {
        return (
            <section className="home-other" id="other">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="home-other-card card text-white bg-dark">
                                <div className="card-body">
                                    <h2 className="card-title"><i className="bi bi-github"></i> Github</h2>
                                    <p className="lead">โครงการที่ยังไม่แล้วเสร็จ อยู่ในช่วยพัฒนา เอกสารของแต่ละโครงการ รายละเอียดเกี่ยวกับโครงการนั้นๆ โครงการทุกอย่างได้รวมอยู่ที่นี่แล้ว!!</p>
                                    <a className="home-other-btn btn btn-light btn-lg pt-auto w-100" href="https://github.com/Maseshi" target="_blank" rel="noreferrer" role="button">เข้าไปดู</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="home-other-card card text-dark bg-light">
                                <div className="card-body mx-auto">
                                    <h2 className="card-title"><i className="bi bi-cash-coin"></i> สนับสนุน</h2>
                                    <p className="lead">อยากช่วยเหลือหรือสนับสนุนโครงการต่างๆ ค่าน้ำค่าไฟ ค่าปัญญา เป็นต้น คุณสามารถทำได้ผ่านด้านล่างนี้</p>
                                    <p className="lead">❤ ขอขอบคุณล่วงหน้าที่คอยสนับสนุนอยู่ตลอดเวลา</p>
                                    <button className="home-other-btn btn btn-dark btn-lg pt-auto w-100" type="button" data-bs-toggle="modal" data-bs-target="#donateModal">สนับสนุน</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="donateModal" tabIndex="-1" aria-labelledby="donateModalLabel" aria-hidden="true">
                    <div className="home-other-modal-dialog modal-dialog modal-dialog-centered">
                        <div className="home-other-modal-content modal-content">
                            <div className="home-other-modal-header modal-header">
                                <h3 className="modal-title" id="donateModalLabel">เลือกวิธีการสนับสนุน</h3>
                                <button type="button" className="home-other-modal-btn-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <hr className="home-other-modal-horizon" />
                            <div className="modal-body">
                                <div className="d-grid gap-2">
                                    <button className="home-other-btn btn btn-warning btn-lg w-100" type="button" data-bs-toggle="modal" data-bs-target="#trueMoneyModal"><img src={ require('../../assets/icons/true-money.webp') } width="30px" height="30px" alt="" /> สนับสนุนผ่าน True Money</button>
                                    <a className="home-other-btn btn btn-danger btn-lg w-100" href="https://www.patreon.com/maseshi" target="_blank" rel="noreferrer"><img src={ require('../../assets/icons/patreon.webp') } width="30px" height="30px" alt="" /> สมัครสมาชิกผ่าน Patreon</a>
                                </div>
                                <br />
                                <p className="text-center m-0">
                                    ทุกบาททุกสตางค์ของท่านช่วยให้ผมทำโครงการอื่นๆ ต่อไปได้
                                    <br />
                                    ขอขอบคุณล่วงหน้าที่คอยสนับสนุนอยู่ตลอดเวลา
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="trueMoneyModal" tabIndex="-1" aria-labelledby="trueMoneyModalLabel" aria-hidden="true">
                    <div className="home-other-modal-dialog modal-dialog modal-dialog-centered">
                        <div className="home-other-modal-content modal-content">
                            <div className="home-other-modal-header modal-header">
                                <h3 className="modal-title" id="trueMoneyModalLabel">สนับสนุนผ่าน True Money</h3>
                                <button type="button" className="home-other-modal-btn-close btn-close" data-bs-toggle="modal" data-bs-target="#donateModal"></button>
                            </div>
                            <hr className="home-other-modal-horizon" />
                            <div className="modal-body">
                                <img src={ require("../../assets/images/qrcode-true-money.webp") } alt="" width="100%" height="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
