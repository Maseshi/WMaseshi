import React, { Component } from 'react'
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth'

import Personal from './Personal'
import Security from './Security'
import Privacy from './Privacy'
import Settings from './Settings'

import './style.css'

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verify: 0,
            validateVerifyPasswordModal: '',
            verifyPasswordModal: 'ยืนยัน'
        }
    }

    render() {
        return (
            <div className="account-content">
                <div className="tab-content" id="v-pills-tabContent">

                    <Personal verify={this.state.verify} />
                    <Security verify={this.state.verify} />
                    <Privacy verify={this.state.verify} />
                    <Settings verify={this.state.verify} />

                </div>

                <div className="modal fade" id="verifyChangeModal" tabIndex="-1" aria-labelledby="verifyChangeModalLabel" aria-hidden="true">
                    <div className="account-modal-dialog modal-dialog modal-dialog-centered">
                        <div className="account-modal-content modal-content">
                            <div className="account-modal-header modal-header">
                                <h3 className="modal-title" id="verifyChangeModalLabel">ยืนยันการเปลี่ยนแปลง</h3>
                                <button type="button" className="account-modal-btn-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <hr className="account-modal-horizon" />
                            <div className="modal-body">
                                <p>กรุณาใส่รหัสผ่านปัจจุบันของคุณ เพื่อยืนยันการเปลี่ยนแปลงนี้</p>
                                <div className="form-floating">
                                    <input type="password" className={this.state.validateVerifyPasswordModal ? 'form-control account-content-tab-input is-invalid' : 'form-control account-content-tab-input'} id="security-password-verify-modal" placeholder="รหัสผ่าน" aria-describedby="securityPasswordVerifyModalFeedback" />
                                    <label htmlFor="security-password-verify-modal">รหัสผ่าน</label>
                                    <div className="invalid-feedback" id="securityPasswordVerifyModalFeedback">{this.state.validateVerifyPasswordModal}</div>
                                </div>
                                <br />
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <button type="button" className="btn account-content-tab-button btn-secondary w-100" data-bs-dismiss="modal" id="verifyChangeCloseModal" aria-label="Close">ยกเลิก</button>
                                    <button type="button" className="btn account-content-tab-button btn-primary w-100" onClick={
                                        () => {
                                            const auth = getAuth();
                                            const user = auth.currentUser;

                                            const email = user.email
                                            const password = document.getElementById('security-password-verify-modal')
                                            const credential = EmailAuthProvider.credential(email, password.value)

                                            this.setState({
                                                verifyPasswordModal: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ยืนยัน',
                                                validateVerifyPasswordModal: ''
                                            })

                                            reauthenticateWithCredential(user, credential).then(() => {
                                                const element = document.getElementById('verifyChangeCloseModal')

                                                element.click()
                                                password.value = ''
                                                this.setState({
                                                    verifyPasswordModal: 'ยืนยัน',
                                                    verify: 1
                                                })
                                                element.addEventListener('hidden.bs.modal', () => {
                                                    this.setState({
                                                        verify: 0
                                                    })
                                                })
                                            }).catch((error) => {
                                                if (error.code === 'auth/wrong-password') {
                                                    this.setState({
                                                        validateVerifyPasswordModal: 'รหัสผ่านไม่ถูกต้อง',
                                                        verifyPasswordModal: '<i class="bi bi-x-circle"></i> ยืนยัน'
                                                    })
                                                    setTimeout(() => {
                                                        this.setState({
                                                            verifyPasswordModal: 'ยืนยัน'
                                                        })
                                                    }, 3000)
                                                } else {
                                                    console.log(error)
                                                    this.setState({
                                                        validateVerifyPasswordModal: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
                                                        verifyPasswordModal: '<i class="bi bi-x-circle"></i> ยืนยัน'
                                                    })
                                                    setTimeout(() => {
                                                        this.setState({
                                                            verifyPasswordModal: 'ยืนยัน'
                                                        })
                                                    }, 3000)
                                                }
                                            })
                                        }
                                    } dangerouslySetInnerHTML={{ __html: this.state.verifyPasswordModal }}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
