import { Component } from 'react'
import { isMobile } from 'react-device-detect'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

export default class Forgot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: null,
            error: null,
            warning: null,
            action: '<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน',
            disabled: false
        }
        this.handleForgot = this.handleForgot.bind(this)
    }

    handleForgot() {
        this.setState({
            action: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ส่งอีเมลยืนยัน',
            disabled: true
        })

        const email = document.getElementById('forgot-email').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) return this.setState({
            warning: "กรุณากรอกอีเมลที่จะลงชื่อเข้าใช้",
            action: '<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน',
            disabled: false
        })
        if (!validateEmail(email)) return this.setState({
            warning: "รูปแบบของอีเมลไม่ถูกต้อง",
            action: '<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน',
            disabled: false
        })

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            this.setState({
                success: "ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบที่อีเมลของคุณ",
                action: '60 ส่งอีเมลยืนยันอีกครั้ง',
                disabled: true
            })

            let count = 60;
            const waitTimer = setInterval(() => {
                if (count <= 0) {
                    clearInterval(waitTimer);
                    this.setState({
                        success: "ส่งอีเมลยืนยันแล้ว กรุณาตรวจสอบที่อีเมลของคุณ",
                        action: '<i class="bi bi-arrow-counterclockwise"></i> ส่งอีเมลยืนยันอีกครั้ง',
                        disabled: false
                    })
                } else {
                    this.setState({
                        action: count + ' ส่งอีเมลยืนยันอีกครั้ง'
                    })
                }
                count -= 1;
            }, 1000);
        }).catch((error) => {
            const errorCode = error.code;

            switch (errorCode) {
                case "auth/user-not-found":
                    this.setState({
                        warning: 'ไม่พบบัญชีดังกล่าว อาจจะไม่มีหรือถูกลบไปแล้ว',
                        action: '<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน',
                        disabled: false
                    })
                break;
                case "auth/too-many-requests":
                    this.setState({
                        warning: 'มีการพยายามส่งอีเมลยีนยันมากเกินไป กรุณาลองใหม่อีกครั้งในภายหลัง',
                        action: '<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน',
                        disabled: false
                    })
                break;
                default:
                    this.setState({
                        error: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาติดต่อผู้ดูแลระบบ',
                        action: '<i class="bi bi-x-circle"></i> ส่งอีเมลยืนยัน',
                        disabled: false
                    })
            }
            
            setTimeout(() => {
                this.setState({
                    action: '<i class="bi bi-envelope"></i> ส่งอีเมลยืนยัน'
                })
            }, 3000);
        });
    }

    render() {
        return (
            <div className={ isMobile ? "modal auth-modal" : "modal auth-modal fade" } id="forgotModal" tab-index="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="auth-modal-content-brand">
                            <img src="./assets/icons/favicon-96x96.png" alt="favicon" width="50px" height="50px" />
                            Maseshi
                        </div>
                        <div className="auth-modal-content">
                            <h3 className="auth-modal-content-title">ลืมรหัสผ่าน</h3>
                            <div className="auth-modal-input">
                                <label htmlFor="forgot-email"><i className="bi bi-envelope-fill"></i> อีเมล</label>
                                <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="forgot-email" />
                            </div>
                            { this.state.success || this.state.warning || this.state.error ? <p className="result" dangerouslySetInnerHTML={{ __html: this.state.success || this.state.warning || this.state.error }}></p> : null }
                            <div className="auth-modal-action">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary auth-modal-forgot" type="button" onClick={ this.handleForgot } disabled={ this.state.disabled } dangerouslySetInnerHTML={{ __html: this.state.action }}></button>
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
}
