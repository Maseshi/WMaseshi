import React, { Component } from 'react'
import {
    getAuth,
    onAuthStateChanged,
    updateEmail,
    updatePassword,
    sendEmailVerification
} from "firebase/auth"

export default class Security extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailVerified: '',

            changeNewEmail: 0,
            validateEmail: '',
            validateVerifyEmail: '',
            emailLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง',
            emailError: '',

            changeNewPassword: 0,
            validatePassword: '',
            validateVerifyPassword: '',
            passwordLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง',
            passwordError: '',

            sendVerifyLinkLabel: 'ส่ง',
            sendVerifyLinkDisabled: false
        }
    }

    componentDidMount() {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email
                const emailVerified = user.emailVerified

                this.setState({
                    email: email,
                    emailVerified: emailVerified
                })
            } else {
                this.setState({
                    email: '',
                    emailVerified: '',
                    changeNewEmail: 0,
                    validateEmail: '',
                    validateVerifyEmail: '',
                    changeNewPassword: 0,
                    validatePassword: '',
                    validateVerifyPassword: '',
                })
            }
        })
    }

    validateEmail = (string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(string);
    }

    render() {
        return (
            <div className="tab-pane fade" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab">
                <div className="account-content-tab-title">
                    <h1>ความปลอดภัย</h1>
                    <p>เพื่อป้องกันไม่ให้ผู้ที่ไม่ได้รับอนุณาตเข้าสู่ระบบในบัญชีของคุณ</p>
                </div>
                <br />
                <div className="account-content-tab-content">

                    <div className="card account-content-tab-card mb-3">
                        <div className="card-body">
                            <div className="account-content-tab-content-title">
                                <h2><i className="bi bi-person-lines-fill"></i> เปลี่ยนแปลงบัญชี</h2>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>เปลี่ยนที่อยู่อีเมล</h3>
                                    <hr />
                                    {
                                        this.state.email ? (
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control account-content-tab-input" id="security-email-current" placeholder="name@example.com" value={this.state.email} readOnly />
                                                <label htmlFor="security-email-current">อีเมลปัจจุบัน</label>
                                            </div>
                                        ) : (
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control account-content-tab-input" id="security-email-current" placeholder="name@example.com" value={this.state.email} readOnly />
                                                <label htmlFor="security-email-current">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Loading...</span> อีเมลปัจจุบัน
                                                </label>
                                            </div>
                                        )
                                    }
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control account-content-tab-input" id="security-email-new" onChange={
                                            (event) => {
                                                const currentEmail = document.getElementById('security-email-current')

                                                if (event.target.value && event.target.value === currentEmail.value) {
                                                    event.target.classList.add("is-invalid")
                                                    this.setState({
                                                        validateNewEmail: 'กรุณาใช้อีเมลอื่น'
                                                    })
                                                } else {
                                                    event.target.classList.remove("is-invalid")
                                                    this.setState({
                                                        validateNewEmail: ''
                                                    })
                                                }
                                            }
                                        } placeholder="name@example.com" aria-describedby="securityEmailNewFeedback" />
                                        <label htmlFor="security-email-new">อีเมลใหม่</label>
                                        <div className="invalid-feedback" id="securityEmailNewFeedback">{this.state.validateNewEmail}</div>
                                    </div>
                                    <div className="form-floating">
                                        <input type="email" className="form-control account-content-tab-input" id="security-email-confirm" onChange={
                                            (event) => {
                                                const newEmail = document.getElementById('security-email-new')

                                                if (event.target.value && !this.state.validateNewEmail && event.target.value === newEmail.value) {
                                                    event.target.classList.remove("is-invalid")
                                                    this.setState({
                                                        changeNewEmail: 1,
                                                        validateVerifyEmail: ''
                                                    })
                                                } else {
                                                    event.target.classList.add("is-invalid")
                                                    this.setState({
                                                        changeNewEmail: 0,
                                                        validateVerifyEmail: 'อีเมลไม่ตรงกัน'
                                                    })
                                                }
                                            }
                                        } placeholder="name@example.com" aria-describedby="securityEmailVerifyFeedback" disabled={this.state.validateNewEmail ? true : false} />
                                        <label htmlFor="security-email-confirm">ยืนยันอีเมลใหม่</label>
                                        <div className="invalid-feedback" id="securityEmailVerifyFeedback">{this.state.validateVerifyEmail}</div>
                                    </div>
                                    {
                                        this.state.changeNewEmail === 1 ? (
                                            <>
                                                <br />
                                                <button className="account-content-tab-button btn btn-primary w-100" type="button" onClick={
                                                    () => {
                                                        const auth = getAuth()
                                                        const newEmail = document.getElementById('security-email-new')
                                                        const emailConfirm = document.getElementById('security-email-confirm')
                                                        const element = document.getElementById('verifyChangeModal')

                                                        newEmail.disabled = true
                                                        emailConfirm.disabled = true
                                                        this.setState({
                                                            emailLabel: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> เปลี่ยนแปลง',
                                                            emailError: ''
                                                        })

                                                        element.addEventListener('hidden.bs.modal', () => {
                                                            if (this.props.verify === 0) {
                                                                this.setState({
                                                                    emailLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง'
                                                                })
                                                            }
                                                            if (this.props.verify === 1) {
                                                                updateEmail(auth.currentUser, emailConfirm.value).then(() => {
                                                                    newEmail.disabled = false
                                                                    emailConfirm.disabled = false
                                                                    this.setState({
                                                                        email: emailConfirm.value,
                                                                        emailLabel: '<i class="bi bi-check-circle"></i> เปลี่ยนแปลง'
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.setState({
                                                                            emailLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง'
                                                                        })
                                                                    }, 3000)
                                                                }).catch((error) => {
                                                                    newEmail.disabled = false
                                                                    emailConfirm.disabled = false
                                                                    this.setState({
                                                                        emailLabel: '<i class="bi bi-x-circle"></i> เปลี่ยนแปลง',
                                                                        emailError: 'ไม่สามารถเปลี่ยนแปลงอีเมลได้ ข้อผิดพลาด: ' + error
                                                                    })
                                                                });
                                                            }
                                                        })
                                                    }
                                                } data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: this.state.emailLabel }}></button>
                                                {this.state.emailError ? <span className="text-center text-warning w-100">{this.state.emailError}</span> : ""}
                                            </>
                                        ) : ""
                                    }
                                </div>
                                <div className="col-md-6">
                                    <h3>เปลี่ยนรหัสผ่าน</h3>
                                    <hr />
                                    {
                                        this.state.email ? (
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control account-content-tab-input" id="security-password-current" placeholder="abcd0123" value="----------" readOnly />
                                                <label htmlFor="security-password-current">รหัสผ่านปัจจุบัน</label>
                                            </div>
                                        ) : (
                                            <div className="form-floating mb-3">
                                                <input type="password" className="form-control account-content-tab-input" id="security-password-current" placeholder="abcd0123" value="" readOnly />
                                                <label htmlFor="security-password-current">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Loading...</span> รหัสผ่านปัจจุบัน
                                                </label>
                                            </div>
                                        )
                                    }
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control account-content-tab-input" id="security-password-new" onChange={
                                            (event) => {
                                                if (!event.target.value) {
                                                    event.target.classList.remove("is-invalid")
                                                    this.setState({
                                                        validateNewEmail: ''
                                                    })
                                                }
                                            }
                                        } placeholder="abcd0123" aria-describedby="securityPasswordNewFeedback" />
                                        <label htmlFor="security-password-new">รหัสผ่านใหม่</label>
                                        <div className="invalid-feedback" id="securityPasswordNewFeedback">{this.state.validatePassword}</div>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control account-content-tab-input" id="security-password-confirm" onChange={
                                            (event) => {
                                                const newPassword = document.getElementById('security-password-new')

                                                if (event.target.value && !this.state.validateNewPassword && event.target.value === newPassword.value) {
                                                    event.target.classList.remove("is-invalid")
                                                    this.setState({
                                                        changeNewPassword: 1,
                                                        validateVerifyPassword: ''
                                                    })
                                                } else {
                                                    event.target.classList.add("is-invalid")
                                                    this.setState({
                                                        changeNewPassword: 0,
                                                        validateVerifyPassword: 'รหัสผ่านไม่ตรงกัน'
                                                    })
                                                }
                                            }
                                        } placeholder="abcd0123" aria-describedby="securityPasswordVerifyFeedback" disabled={this.state.validateNewPassword ? true : false} />
                                        <label htmlFor="security-password-confirm">ยืนยันรหัสผ่านใหม่</label>
                                        <div className="invalid-feedback" id="securityPasswordVerifyFeedback">{this.state.validateVerifyPassword}</div>
                                    </div>
                                    {
                                        this.state.changeNewPassword === 1 ? (
                                            <>
                                                <br />
                                                <button className="account-content-tab-button btn btn-primary w-100" type="button" onClick={
                                                    () => {
                                                        const auth = getAuth()
                                                        const newPassword = document.getElementById('security-password-new')
                                                        const passwordConfirm = document.getElementById('security-password-confirm')
                                                        const element = document.getElementById('verifyChangeModal')

                                                        newPassword.disabled = true
                                                        passwordConfirm.disabled = true
                                                        this.setState({
                                                            passwordLabel: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> เปลี่ยนแปลง',
                                                            passwordError: ''
                                                        })

                                                        element.addEventListener('hidden.bs.modal', () => {
                                                            if (this.props.verify === 0) {
                                                                this.setState({
                                                                    passwordLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง'
                                                                })
                                                            }
                                                            if (this.props.verify === 1) {
                                                                updatePassword(auth.currentUser, passwordConfirm.value).then(() => {
                                                                    newPassword.disabled = false
                                                                    passwordConfirm.disabled = false
                                                                    this.setState({
                                                                        passwordLabel: '<i class="bi bi-check-circle"></i> เปลี่ยนแปลง'
                                                                    })
                                                                    setTimeout(() => {
                                                                        this.setState({
                                                                            passwordLabel: '<i class="bi bi-lock"></i> เปลี่ยนแปลง'
                                                                        })
                                                                    }, 3000)
                                                                }).catch((error) => {
                                                                    newPassword.disabled = false
                                                                    passwordConfirm.disabled = false
                                                                    this.setState({
                                                                        passwordLabel: '<i class="bi bi-x-circle"></i> เปลี่ยนแปลง',
                                                                        passwordError: 'ไม่สามารถเปลี่ยนแปลงรหัสผ่านได้ ข้อผิดพลาด: ' + error
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    }
                                                } data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: this.state.passwordLabel }}></button>
                                                {this.state.emailError ? <span className="text-center text-warning w-100">{this.state.passwordError}</span> : ""}
                                            </>
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">

                            <div className="card account-content-tab-card">
                                <div className="card-body">
                                    <div className="account-content-tab-content-title">
                                        <h2><i className="bi bi-check-circle"></i> การยืนยัน</h2>
                                    </div>
                                    <hr />
                                    <div className="card mb-3 account-content-tab-card">
                                        <div className="card-body hstack gap-3">
                                            {
                                                this.state.email ?
                                                    this.state.emailVerified ? (
                                                        <>
                                                            <span className="badge rounded-pill bg-success">ยืนยัน</span>
                                                            <div className="me-auto">ยืนยันที่อยู่อีเมลของคุณ</div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="badge rounded-pill bg-warning text-dark">ไม่ยืนยัน</span>
                                                            <div className="me-auto">ยืนยันที่อยู่อีเมลของคุณ</div>
                                                            <button type="button" className="btn btn-primary account-content-tab-button" onClick={
                                                                () => {
                                                                    const auth = getAuth();

                                                                    this.setState({
                                                                        sendVerifyLinkLabel: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ส่ง',
                                                                        sendVerifyLinkDisabled: true
                                                                    })

                                                                    sendEmailVerification(auth.currentUser).then(() => {
                                                                        this.setState({
                                                                            sendVerifyLinkLabel: '<i class="bi bi-check-circle"></i> ส่ง'
                                                                        })
                                                                        setTimeout(() => {
                                                                            let count = 57
                                                                            const waitTimer = setInterval(() => {
                                                                                if (count <= 0) {
                                                                                    clearInterval(waitTimer)
                                                                                    this.setState({
                                                                                        sendVerifyLinkDisabled: false
                                                                                    })
                                                                                } else {
                                                                                    this.setState({
                                                                                        sendVerifyLinkLabel: count + ' ส่ง'
                                                                                    })
                                                                                }
                                                                                count -= 1
                                                                            }, 1000)
                                                                        }, 3000)
                                                                    }).catch((error) => {
                                                                        console.log(error)
                                                                        this.setState({
                                                                            sendVerifyLinkLabel: '<i class="bi bi-x-circle"></i> ส่ง',
                                                                            sendVerifyLinkDisabled: false
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.setState({
                                                                                sendVerifyLinkLabel: 'ส่ง'
                                                                            })
                                                                        }, 3000)
                                                                    })
                                                                }
                                                            } disabled={this.state.sendVerifyLinkDisabled} dangerouslySetInnerHTML={{ __html: this.state.sendVerifyLinkLabel }}></button>
                                                        </>
                                                    )
                                                : (
                                                    <>
                                                        <span className="badge rounded-pill bg-secondary">
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </span>
                                                        <div className="me-auto">ยืนยันที่อยู่อีเมลของคุณ</div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="card account-content-tab-card">
                                        <div className="card-body hstack gap-3">
                                            <span className="badge rounded-pill bg-secondary">ปิด</span>
                                            <div className="me-auto">ยืนยันแบบสองขั้นตอน</div>
                                            <button type="button" className="btn btn-primary account-content-tab-button" disabled>เปิด</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">

                            <div className="card account-content-tab-card">
                                <div className="card-body">
                                    <div className="account-content-tab-content-title">
                                        <h2><i className="bi bi-plug"></i> เชื่อมต่อบัญชี</h2>
                                    </div>
                                    <hr />
                                    <div className="card account-content-tab-card mb-3">
                                        <div className="card-body hstack gap-3">
                                            <img src={require('../../../assets/icons/google.webp')} alt="google" width="20px" height="20px" />
                                            <div className="me-auto">Google</div>
                                            <button type="button" className="btn btn-primary account-content-tab-button" disabled>เชื่อมต่อ</button>
                                        </div>
                                    </div>
                                    <div className="card account-content-tab-card">
                                        <div className="card-body hstack gap-3">
                                            <img src={require("../../../assets/icons/facebook.webp")} alt="facebook" width="20px" height="20px" />
                                            <div className="me-auto">Facebook</div>
                                            <button type="button" className="btn btn-primary account-content-tab-button" disabled>เชื่อมต่อ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
