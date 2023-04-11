import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

import Providers from './Providers'

import { isMobile } from '../../utils/functions/isMobile'
import { translator } from '../../utils/functions/translator'

export default function Forgot() {
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-envelope"></i> %s'.replace("%s", translator().translate.components.Authentication.Forgot.send_verify_email))
    const [disabled, setDisabled] = useState(false)

    const handleForgot = () => {
        setAction('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace("%s", translator().translate.components.Authentication.Forgot.send_verify_email))
        setDisabled(true)

        const email = document.getElementById('forgot-email').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) {
            setWarning(translator().translate.components.Authentication.Forgot.empty_email_input)
            setAction('<i class="bi bi-envelope"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning(translator().translate.components.Authentication.Forgot.invalid_email_format)
            setAction('<i class="bi bi-envelope"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
            setDisabled(false)
            return
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess(translator().translate.components.Authentication.Forgot.send_verify_email_success)
                setAction('60 %s'.replace('%s', translator().translate.components.Authentication.Forgot.resend_verify_email))
                setDisabled(true)

                let count = 60;
                const waitTimer = setInterval(() => {
                    if (count <= 0) {
                        clearInterval(waitTimer);
                        setSuccess(translator().translate.components.Authentication.Forgot.send_verify_email_success)
                        setAction('<i class="bi bi-arrow-counterclockwise"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.resend_verify_email))
                        setDisabled(false)
                    } else {
                        setAction(count + ' ' + translator().translate.components.Authentication.Forgot.resend_verify_email)
                    }
                    count -= 1;
                }, 1000);
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/user-not-found":
                        setWarning(translator().translate.components.Authentication.Forgot.error_account_not_found)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
                        setDisabled(false)
                        break;
                    case "auth/too-many-requests":
                        setWarning(translator().translate.components.Authentication.Forgot.error_maximum_quota)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
                        setDisabled(false)
                        break;
                    default:
                        setError(translator().translate.components.Authentication.Forgot.error_unknown_problem)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-envelope"></i> %s'.replace('%s', translator().translate.components.Authentication.Forgot.send_verify_email))
                }, 3000);
            });
    }

    return (
        <div className={isMobile() ? "modal auth-modal" : "modal auth-modal fade"} id="forgotModal" tab-index="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">
                            {translator().translate.components.Authentication.Forgot.forgot_password}
                        </h3>
                        <div className="auth-modal-input">
                            <label htmlFor="forgot-email">
                                <i className="bi bi-envelope-fill"></i> {translator().translate.components.Authentication.Forgot.email}
                            </label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="forgot-email" />
                        </div>
                        {success || warning || error ? <p className="result" dangerouslySetInnerHTML={{ __html: success || warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-forgot" type="button" onClick={() => handleForgot()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-register" type="button" id="auth-modal-forgot-dismiss" data-bs-dismiss="modal" aria-label="Close">
                                    {translator().translate.components.Authentication.Forgot.cancel}
                                </button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#signInModal">
                                        {translator().translate.components.Authentication.Forgot.sign_in}
                                    </button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">
                                        {translator().translate.components.Authentication.Forgot.register}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <hr />
                                    </td>
                                    <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                        {translator().translate.components.Authentication.Forgot.or}
                                    </td>
                                    <td>
                                        <hr />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="auth-modal-options">
                            <Providers />
                        </div>
                        <br />
                        <div className="auth-modal-content-rule text-center">
                            <a href="/privacy-policy">{translator().translate.components.Authentication.Forgot.privacy_policy}</a> &bull; <a href="/terms-of-service">{translator().translate.components.Authentication.Forgot.terms_of_services}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
