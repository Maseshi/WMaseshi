import { Component } from 'react'
import { isMobile } from 'react-device-detect'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            warning: null,
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister() {
        this.setState({
            action: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> สร้างบัญชีใหม่',
            disabled: true
        })

        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const cpassword = document.getElementById("register-confirm-password").value;
        const rule = document.getElementById("register-rule").checked;

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) return this.setState({
            warning: "กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (!validateEmail(email)) return this.setState({
            warning: "รูปแบบของอีเมลไม่ถูกต้อง",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (!password) return this.setState({
            warning: "กรุณากรอกรหัสผ่านของบัญชีดังกล่าว",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (password.length < 8) return this.setState({
            warning: "กรุณากรอกรหัสผ่านให้มากกว่าหรือเท่ากับ 8 ตัวขึ้นไป",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (!cpassword) return this.setState({
            warning: "กรุณายืนยันรหัสผ่านของคุณอีกครั้ง",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (password !== cpassword) return this.setState({
            warning: "ดูเหมือนรหัสผ่านจะไม่ตรงกัน",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })
        if (!rule) return this.setState({
            warning: "หากคุณไม่ยอมรับนโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการ คุณจะไม่สามารถใช้งานบริการของ Maseshi ได้",
            action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่',
            disabled: false
        })

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

                                this.setState({
                                    action: '<i class="bi bi-check-circle"></i> สร้างบัญชีใหม่',
                                    disabled: false
                                });
                                dismiss.click()
                            })
                    });
                });
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        this.setState({
                            warning: 'ที่อยู่อีเมลนี้ถูกใช้โดยบัญชีอื่นแล้วหรือลองลงชื่อเข้าใช้ใหม่อีกครั้ง',
                            action: '<i class="bi bi-x-circle"></i> สร้างบัญชีใหม่',
                            disabled: false
                        })
                        break;
                    default:
                        console.log(error)
                        this.setState({
                            error: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ',
                            action: '<i class="bi bi-x-circle"></i> สร้างบัญชีใหม่',
                            disabled: false
                        })
                }

                setTimeout(() => {
                    this.setState({
                        action: '<i class="bi bi-plus-circle"></i> สร้างบัญชีใหม่'
                    })
                }, 3000);
            });
    }

    render() {
        return (
            <div className={isMobile ? "modal auth-modal" : "modal auth-modal fade"} id="registerModal" tab-index="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="auth-modal-content-brand">
                            <img src="./assets/icons/favicon-96x96.png" alt="favicon" width="50px" height="50px" />
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
                            {this.state.warning || this.state.error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: this.state.warning || this.state.error }}></p> : null}
                            <div className="auth-modal-action">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary auth-modal-register" type="button" onClick={this.handleRegister} disabled={this.state.disabled} dangerouslySetInnerHTML={{ __html: this.state.action }}></button>
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
}
