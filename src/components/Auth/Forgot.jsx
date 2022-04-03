import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

import { isMobile } from '../../utils/functions/isMobile'

export default function Forgot() {
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน')
    const [disabled, setDisabled] = useState(false)

    const handleForgot = () => {
        setAction('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ส่งอีเมลยืนยัน')
        setDisabled(true)

        const email = document.getElementById('forgot-email').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) {
            setWarning('กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้')
            setAction('<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน')
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning('รูปแบบของอีเมลไม่ถูกต้อง')
            setAction('<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน')
            setDisabled(false)
            return
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess("ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบที่อีเมลของคุณ")
                setAction('60 ส่งอีเมลยืนยันอีกครั้ง')
                setDisabled(true)

                let count = 60;
                const waitTimer = setInterval(() => {
                    if (count <= 0) {
                        clearInterval(waitTimer);
                        setSuccess("ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบที่อีเมลของคุณ")
                        setAction('<i class="bi bi-arrow-counterclockwise"></i> ส่งอีเมลยืนยันอีกครั้ง')
                        setDisabled(false)
                    } else {
                        setAction(count + ' ส่งอีเมลยืนยันอีกครั้ง')
                    }
                    count -= 1;
                }, 1000);
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/user-not-found":
                        setWarning('ไม่พบบัญชีดังกล่าว อาจจะไม่มีหรือถูกลบไปแล้ว')
                        setAction('<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน')
                        setDisabled(false)
                        break;
                    case "auth/too-many-requests":
                        setWarning('มีการพยายามส่งอีเมลยีนยันมากเกินไป กรุณาลองใหม่อีกครั้งในภายหลัง')
                        setAction('<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน')
                        setDisabled(false)
                        break;
                    default:
                        setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ')
                        setAction('<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน')
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน')
                }, 3000);
            });
    }

    return (
        <div className={isMobile() ? "modal auth-modal" : "modal auth-modal fade"} id="forgotModal" tab-index="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src="./favicon-96x96.png" alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">ลืมรหัสผ่าน</h3>
                        <div className="auth-modal-input">
                            <label htmlFor="forgot-email"><i className="bi bi-envelope-fill"></i> อีเมล</label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="forgot-email" />
                        </div>
                        {success || warning || error ? <p className="result" dangerouslySetInnerHTML={{ __html: success || warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-forgot" type="button" onClick={() => handleForgot()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-register" type="button" id="auth-modal-forgot-dismiss" data-bs-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#signInModal">เข้าสู่ระบบ</button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">สร้างบัญชีใหม่</button>
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
