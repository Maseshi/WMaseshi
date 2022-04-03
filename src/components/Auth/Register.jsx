import { useState } from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"

import { isMobile } from '../../utils/functions/isMobile'

export default function Register() {
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
    const [disabled, setDisabled] = useState(false)

    const handleRegister = () => {
        setAction('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> สร้างบัญชีใหม่')
        setDisabled(true)

        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const cpassword = document.getElementById("register-confirm-password").value;
        const rule = document.getElementById("register-rule").checked;

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) {
            setWarning('กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning('รูปแบบของอีเมลไม่ถูกต้อง')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (!password) {
            setWarning('กรุณากรอกรหัสผ่านของบัญชีดังกล่าว')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (password.length < 8) {
            setWarning('กรุณากรอกรหัสผ่านให้มากกว่าหรือเท่ากับ 8 ตัวขึ้นไป')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (!cpassword) {
            setWarning('กรุณายืนยันรหัสผ่านของคุณอีกครั้ง')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (password !== cpassword) {
            setWarning('ดูเหมือนรหัสผ่านจะไม่ตรงกัน')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }
        if (!rule) {
            setWarning('หากคุณไม่ยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการ คุณจะไม่สามารถใช้งานบริการของ Maseshi ได้')
            setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
            setDisabled(false)
            return
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const database = getDatabase();

                set(ref(database, "data/users/" + userCredential.user.uid), {
                    description: '',
                    gender: '',
                    role: "member",
                    rule: {
                        pp: true,
                        tos: true
                    }
                }).then(() => {
                    sendEmailVerification(auth.currentUser).then(() => {
                        signInWithEmailAndPassword(auth, email, password)
                            .then(() => {
                                const dismiss = document.getElementById('auth-modal-register-dismiss')

                                setAction('<i class="bi bi-check-circle"></i> สร้างบัญชีใหม่')
                                setDisabled(false)
                                dismiss.click()
                            })
                    });
                });
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setWarning('ที่อยู่อีเมลนี้ถูกใช้โดยบัญชีอื่นแล้วหรือลองลงชื่อเข้าใช้ใหม่อีกครั้ง')
                        setAction('<i class="bi bi-x-circle"></i> สร้างบัญชีใหม่')
                        setDisabled(false)
                        break;
                    default:
                        console.log(error)
                        setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ')
                        setAction('<i class="bi bi-x-circle"></i> สร้างบัญชีใหม่')
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่')
                }, 3000);
            });
    }

    return (
        <div className={isMobile ? "modal auth-modal" : "modal auth-modal fade"} id="registerModal" tab-index="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src="./favicon-96x96.png" alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">สร้างบัญชีใหม่</h3>
                        <div className="auth-modal-input">
                            <label htmlFor="register-email"><i className="bi bi-envelope-fill"></i> อีเมล</label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="register-email" />
                            <br />
                            <label htmlFor="register-password"><i className="bi bi-key-fill"></i> รหัสผ่าน</label>
                            <input className="auth-modal-password-input" placeholder="abcd1234" type="password" id="register-password" />
                            <br />
                            <label htmlFor="register-confirm-password"><i className="bi bi-key-fill"></i> ยืนยันรหัสผ่าน</label>
                            <input className="auth-modal-confirm-password-input" placeholder="abcd1234" type="password" id="register-confirm-password" />
                            <br />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="register-rule" />
                                <label className="form-check-label" htmlFor="register-rule">ฉันยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขในการให้บริการ</label>
                            </div>
                        </div>
                        {warning || error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-register" type="button" onClick={() => handleRegister()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-register" type="button" id="auth-modal-register-dismiss" data-bs-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#signInModal">มีบัญชีอยู่แล้ว</button>
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
