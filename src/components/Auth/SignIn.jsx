import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { isMobile } from '../../utils/functions/isMobile'

export default function SignIn() {
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้')
    const [disabled, setDisabled] = useState(false)

    const handleLogin = () => {
        setAction('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ลงชื่อเข้าใช้')
        setDisabled(true)

        const email = document.getElementById('sign-in-email').value
        const password = document.getElementById('sign-in-password').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) {
            setWarning('กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้')
            setAction('<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้')
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning('รูปแบบของอีเมลไม่ถูกต้อง')
            setAction('<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้')
            setDisabled(false)
            return
        }
        if (!password) {
            setWarning('กรุณากรอกรหัสผ่านของบัญชีดังกล่าว')
            setAction('<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้')
            setDisabled(false)
            return
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const dismiss = document.getElementById('auth-modal-login-dismiss')

                setAction('<i class="bi bi-check-circle"></i> ลงชื่อเข้าใช้')
                setDisabled(false)
                dismiss.click()
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/wrong-password":
                        setWarning('รหัสผ่านไม่ถูกต้อง ลองตรวจสอบใหม่อีกครั้ง')
                        setAction('<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้')
                        setDisabled(false)
                        break;
                    case "auth/user-not-found":
                        setWarning('ไม่พบบัญชีดังกล่าว อาจจะไม่มีหรือถูกลบไปแล้ว')
                        setAction('<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้')
                        setDisabled(false)
                        break;
                    case "auth/too-many-requests":
                        setWarning('มีการพยายามเข้าสู่ระบบไม่สำเร็จมากเกินไป โปรดลองใหม่อีกครั้งในภายหลัง')
                        setAction('<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้')
                        setDisabled(false)
                        break;
                    case "auth/network-request-failed":
                        setWarning('ไม่สามาารถลงชื่อเข้าใช้งานได้')
                        setAction('<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้')
                        setDisabled(false)
                        break;
                    default:
                        console.log(error)
                        setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ')
                        setAction('<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้')
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้')
                }, 3000)
            });
    }

    return (
        <div className={isMobile ? "modal auth-modal" : "modal auth-modal fade"} id="signInModal" tab-index="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src="./favicon-96x96.png" alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">ลงชื่อเข้าใช้</h3>
                        <div className="auth-modal-input">
                            <label htmlFor="sign-in-email"><i className="bi bi-envelope-fill"></i> อีเมล</label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="sign-in-email" />
                            <br />
                            <label htmlFor="sign-in-password"><i className="bi bi-key-fill"></i> รหัสผ่าน</label>
                            <input className="auth-modal-password-input" placeholder="abcd1234" type="password" id="sign-in-password" />
                        </div>
                        {warning || error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-login" type="button" onClick={() => handleLogin()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-login" type="button" id="auth-modal-login-dismiss" data-bs-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">สร้างบัญชีใหม่</button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#forgotModal">จำรหัสผ่านไม่ได้</button>
                                </div>
                            </div>
                        </div>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td><hr /></td>
                                    <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>หรือ</td>
                                    <td><hr /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="auth-modal-options">
                            <button type="button" className="btn btn-link" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="ยังไม่พร้อมใช้งานในขณะนี้" disabled>
                                <img src={require('../../assets/icons/google.webp')} alt="google" width="30px" height="30px" />
                            </button>
                            <button type="button" className="btn btn-link" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="ยังไม่พร้อมใช้งานในขณะนี้" disabled>
                                <img src={require('../../assets/icons/facebook.webp')} alt="facebook" width="30px" height="30px" />
                            </button>
                        </div>
                        <br />
                        <div className="auth-modal-content-rule text-center">
                            <a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a> &bull; <a href="/terms-of-service">เงื่อนไขการให้บริการ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
