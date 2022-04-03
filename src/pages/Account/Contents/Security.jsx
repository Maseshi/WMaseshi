import { useState } from 'react'
import {
    getAuth,
    updateEmail,
    updatePassword,
    sendEmailVerification
} from 'firebase/auth'

// Function
import { isMobile } from '../../../utils/functions/isMobile'

export default function Security(props) {
    const [changeNewEmail, setChangeNewEmail] = useState(0)
    const [validateEmail, setValidateEmail] = useState('')
    const [validateVerifyEmail, setValidateVerifyEmail] = useState('')
    const [emailLabel, setEmailLabel] = useState('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
    const [emailError, setEmailError] = useState('')

    const [changeNewPassword, setChangeNewPassword] = useState(0)
    const [validatePassword, setValidatePassword] = useState('')
    const [validateVerifyPassword, setValidateVerifyPassword] = useState('')
    const [passwordLabel, setPasswordLabel] = useState('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
    const [passwordError, setPasswordError] = useState('')

    const [sendVerifyLinkLabel, setSendVerifyLinkLabel] = useState('ส่ง')
    const [sendVerifyLinkDisabled, setSendVerifyLinkDisabled] = useState(false)

    const userData = props.userData
    const verify = props.verify

    const emailValidity = (string) => {
        const re = /\S+@\S+\.\S+/
        return re.test(string)
    }

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
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row">
                            <div className={isMobile() ? "col-md-6 mb-3" : "col-md-6"}>
                                <h3>เปลี่ยนที่อยู่อีเมล</h3>
                                {
                                    userData && userData.user.email ? (
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control account-content-tab-input" id="security-email-current" placeholder="name@example.com" value={userData.user.email} readOnly />
                                            <label htmlFor="security-email-current">อีเมลปัจจุบัน</label>
                                        </div>
                                    ) : (
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control account-content-tab-input" id="security-email-current" placeholder="name@example.com" readOnly />
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

                                            if (!emailValidity(event.target.value)) {
                                                event.target.classList.add("is-invalid")
                                                setValidateEmail('รูปแบบไม่ถูกต้อง')
                                            } else {
                                                event.target.classList.remove("is-invalid")
                                                setValidateEmail('')
                                                
                                                if (event.target.value && event.target.value === currentEmail.value) {
                                                    event.target.classList.add("is-invalid")
                                                    setValidateEmail('กรุณาใช้อีเมลอื่น')
                                                } else {
                                                    event.target.classList.remove("is-invalid")
                                                    setValidateEmail('')
                                                }
                                            }
                                        }
                                    } placeholder="name@example.com" aria-describedby="securityEmailNewFeedback" />
                                    <label htmlFor="security-email-new">อีเมลใหม่</label>
                                    <div className="invalid-feedback" id="securityEmailNewFeedback">{validateEmail}</div>
                                </div>
                                <div className="form-floating">
                                    <input type="email" className="form-control account-content-tab-input" id="security-email-confirm" onChange={
                                        (event) => {
                                            const newEmail = document.getElementById('security-email-new')

                                            if (event.target.value && !validateEmail && event.target.value === newEmail.value) {
                                                event.target.classList.remove("is-invalid")
                                                setChangeNewEmail(1)
                                                setValidateVerifyEmail('')
                                            } else {
                                                event.target.classList.add("is-invalid")
                                                setChangeNewEmail(0)
                                                setValidateVerifyEmail('อีเมลไม่ตรงกัน')
                                            }
                                        }
                                    } placeholder="name@example.com" aria-describedby="securityEmailVerifyFeedback" disabled={validateEmail ? true : false} />
                                    <label htmlFor="security-email-confirm">ยืนยันอีเมลใหม่</label>
                                    <div className="invalid-feedback" id="securityEmailVerifyFeedback">{validateVerifyEmail}</div>
                                </div>
                                {
                                    changeNewEmail === 1 ? (
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
                                                    setEmailLabel('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> เปลี่ยนแปลง')
                                                    setEmailError('')

                                                    element.addEventListener('hidden.bs.modal', () => {
                                                        if (verify === 0) {
                                                            setEmailLabel('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
                                                        }
                                                        if (verify === 1) {
                                                            updateEmail(auth.currentUser, emailConfirm.value).then(() => {
                                                                newEmail.disabled = false
                                                                emailConfirm.disabled = false
                                                                setEmailLabel('<i class="bi bi-check-circle"></i> เปลี่ยนแปลง')
                                                                setTimeout(() => {
                                                                    setEmailLabel('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
                                                                }, 3000)
                                                            }).catch((error) => {
                                                                newEmail.disabled = false
                                                                emailConfirm.disabled = false
                                                                setEmailLabel('<i class="bi bi-x-circle"></i> เปลี่ยนแปลง')
                                                                setEmailError('ไม่สามารถเปลี่ยนแปลงอีเมลได้ ข้อผิดพลาด: ' + error)
                                                            });
                                                        }
                                                    })
                                                }
                                            } data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: emailLabel }}></button>
                                            {emailError ? <span className="text-center text-warning w-100">{emailError}</span> : ""}
                                        </>
                                    ) : ""
                                }
                            </div>
                            <div className="col-md-6">
                                <h3>เปลี่ยนรหัสผ่าน</h3>
                                {
                                    userData && userData.user.email ? (
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control account-content-tab-input" id="security-password-current" placeholder="abcd0123" value="----------" readOnly />
                                            <label htmlFor="security-password-current">รหัสผ่านปัจจุบัน</label>
                                        </div>
                                    ) : (
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control account-content-tab-input" id="security-password-current" placeholder="abcd0123" readOnly />
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
                                                setValidatePassword('')
                                            }
                                        }
                                    } placeholder="abcd0123" aria-describedby="securityPasswordNewFeedback" />
                                    <label htmlFor="security-password-new">รหัสผ่านใหม่</label>
                                    <div className="invalid-feedback" id="securityPasswordNewFeedback">{validatePassword}</div>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control account-content-tab-input" id="security-password-confirm" onChange={
                                        (event) => {
                                            const newPassword = document.getElementById('security-password-new')

                                            if (event.target.value && !validatePassword && event.target.value === newPassword.value) {
                                                event.target.classList.remove("is-invalid")
                                                setChangeNewPassword(1)
                                                setValidateVerifyPassword('')
                                            } else {
                                                event.target.classList.add("is-invalid")
                                                setChangeNewPassword(0)
                                                setValidateVerifyPassword('รหัสผ่านไม่ตรงกัน')
                                            }
                                        }
                                    } placeholder="abcd0123" aria-describedby="securityPasswordVerifyFeedback" disabled={validatePassword ? true : false} />
                                    <label htmlFor="security-password-confirm">ยืนยันรหัสผ่านใหม่</label>
                                    <div className="invalid-feedback" id="securityPasswordVerifyFeedback">{validateVerifyPassword}</div>
                                </div>
                                {
                                    changeNewPassword === 1 ? (
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
                                                    setPasswordLabel('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> เปลี่ยนแปลง')
                                                    setPasswordError('')

                                                    element.addEventListener('hidden.bs.modal', () => {
                                                        if (verify === 0) {
                                                            setPasswordLabel('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
                                                        }
                                                        if (verify === 1) {
                                                            updatePassword(auth.currentUser, passwordConfirm.value).then(() => {
                                                                newPassword.disabled = false
                                                                passwordConfirm.disabled = false
                                                                setPasswordLabel('<i class="bi bi-check-circle"></i> เปลี่ยนแปลง')
                                                                setTimeout(() => {
                                                                    setPasswordLabel('<i class="bi bi-lock"></i> เปลี่ยนแปลง')
                                                                }, 3000)
                                                            }).catch((error) => {
                                                                newPassword.disabled = false
                                                                passwordConfirm.disabled = false
                                                                setPasswordLabel('<i class="bi bi-x-circle"></i> เปลี่ยนแปลง')
                                                                setPasswordError('ไม่สามารถเปลี่ยนแปลงรหัสผ่านได้ ข้อผิดพลาด: ' + error)
                                                            })
                                                        }
                                                    })
                                                }
                                            } data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: passwordLabel }}></button>
                                            {passwordError ? <span className="text-center text-warning w-100">{passwordError}</span> : ""}
                                        </>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className={isMobile() ? "col-md-6 mb-3" : "col-md-6"}>

                        <div className="card account-content-tab-card">
                            <div className="card-body">
                                <div className="account-content-tab-content-title">
                                    <h2><i className="bi bi-check-circle"></i> การยืนยัน</h2>
                                </div>
                                <hr className="account-content-tab-content-horizon" />
                                <div className="card mb-3 account-content-tab-card">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData ?
                                                userData.user.emailVerified ? (
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

                                                                setSendVerifyLinkLabel('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ส่ง')
                                                                setSendVerifyLinkDisabled(true)

                                                                sendEmailVerification(auth.currentUser).then(() => {
                                                                    setSendVerifyLinkLabel('<i class="bi bi-check-circle"></i> ส่ง')
                                                                    setTimeout(() => {
                                                                        let count = 57
                                                                        const waitTimer = setInterval(() => {
                                                                            if (count <= 0) {
                                                                                clearInterval(waitTimer)
                                                                                setSendVerifyLinkDisabled(false)
                                                                            } else {
                                                                                setSendVerifyLinkLabel(count + ' ส่ง')
                                                                            }
                                                                            count -= 1
                                                                        }, 1000)
                                                                    }, 3000)
                                                                }).catch((error) => {
                                                                    console.log(error)
                                                                    setSendVerifyLinkLabel('<i class="bi bi-x-circle"></i> ส่ง')
                                                                    setSendVerifyLinkDisabled(false)
                                                                    setTimeout(() => {
                                                                        setSendVerifyLinkLabel('ส่ง')
                                                                    }, 3000)
                                                                })
                                                            }
                                                        } disabled={sendVerifyLinkDisabled} dangerouslySetInnerHTML={{ __html: sendVerifyLinkLabel }}></button>
                                                    </>
                                                ) : (
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
                                <hr className="account-content-tab-content-horizon" />
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
