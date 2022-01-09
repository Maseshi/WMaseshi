import { Component } from 'react'
import { isMobile } from 'react-device-detect'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            warning: null,
            action: '<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้',
            disabled: false
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin() {
        this.setState({
            action: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ลงชื่อเข้าใช้',
            disabled: true
        })

        const email = document.getElementById('sign-in-email').value
        const password = document.getElementById('sign-in-password').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) return this.setState({
            warning: "กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้",
            action: '<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้',
            disabled: false
        })
        if (!validateEmail(email)) return this.setState({
            warning: "รูปแบบของอีเมลไม่ถูกต้อง",
            action: '<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้',
            disabled: false
        })
        if (!password) return this.setState({
            warning: "กรุณากรอกรหัสผ่านของบัญชีดังกล่าว",
            action: '<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้',
            disabled: false
        })

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            const dismiss = document.getElementById('auth-modal-login-dismiss')

            this.setState({
                action: '<i class="bi bi-check-circle"></i> ลงชื่อเข้าใช้',
                disabled: false
            })
            dismiss.click()
        }).catch((error) => {
            const errorCode = error.code;

            switch (errorCode) {
                case "auth/wrong-password":
                    this.setState({
                        warning: 'รหัสผ่านไม่ถูกต้อง ลองตรวจสอบใหม่อีกครั้ง',
                        action: '<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้',
                        disabled: false
                    })
                break;
                case "auth/user-not-found":
                    this.setState({
                        warning: 'ไม่พบบัญชีดังกล่าว อาจจะไม่มีหรือถูกลบไปแล้ว',
                        action: '<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้',
                        disabled: false
                    })
                break;
                case "auth/too-many-requests":
                    this.setState({
                        warning: 'มีการพยายามเข้าสู่ระบบไม่สำเร็จมากเกินไป โปรดลองใหม่อีกครั้งในภายหลัง',
                        action: '<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้',
                        disabled: false
                    })
                break;
                case "auth/network-request-failed":
                    this.setState({
                        warning: 'ไม่สามาารถลงชื่อเข้าใช้งานได้',
                        action: '<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้',
                        disabled: false
                    })
                break;
                default:
                    console.log(error)
                    this.setState({
                        error: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ',
                        action: '<i class="bi bi-x-circle"></i> ลงชื่อเข้าใช้',
                        disabled: false
                    })
            }

            setTimeout(() => {
                this.setState({
                    action: '<i class="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้'
                })
            }, 3000)
        });
    }

    render() {
        return (
            <div className={ isMobile ? "modal auth-modal" : "modal auth-modal fade" } id="signInModal" tab-index="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="auth-modal-content-brand">
                            <img src="./assets/icons/favicon-96x96.png" alt="favicon" width="50px" height="50px" />
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
                            { this.state.warning || this.state.error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: this.state.warning || this.state.error }}></p> : null }
                            <div className="auth-modal-action">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary auth-modal-login" type="button" onClick={ this.handleLogin } disabled={ this.state.disabled } dangerouslySetInnerHTML={{ __html: this.state.action }}></button>
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
}
