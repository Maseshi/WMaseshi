import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import Providers from './Providers'

import { isMobile } from '../../utils/functions/isMobile'
import { translator } from '../../utils/functions/translator'

export default function SignIn() {
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-box-arrow-in-right"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
    const [disabled, setDisabled] = useState(false)

    const handleLogin = () => {
        setAction('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
        setDisabled(true)

        const email = document.getElementById('sign-in-email').value
        const password = document.getElementById('sign-in-password').value

        const validateEmail = (string) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(string);
        }

        if (!email) {
            setWarning(translator().translate.components.Authentication.SignIn.empty_email_input)
            setAction('<i class="bi bi-box-arrow-in-right"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning(translator().translate.components.Authentication.SignIn.invalid_email_format)
            setAction('<i class="bi bi-box-arrow-in-right"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
            setDisabled(false)
            return
        }
        if (!password) {
            setWarning(translator().translate.components.Authentication.SignIn.empty_password_input)
            setAction('<i class="bi bi-box-arrow-in-right"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
            setDisabled(false)
            return
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const dismiss = document.getElementById('auth-modal-login-dismiss')

                setAction('<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                setDisabled(false)
                dismiss.click()
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/wrong-password":
                        setWarning(translator().translate.components.Authentication.SignIn.error_wrong_password)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                        setDisabled(false)
                        break;
                    case "auth/user-not-found":
                        setWarning(translator().translate.components.Authentication.SignIn.error_user_not_found)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                        setDisabled(false)
                        break;
                    case "auth/too-many-requests":
                        setWarning(translator().translate.components.Authentication.SignIn.too_many_requests)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                        setDisabled(false)
                        break;
                    case "auth/network-request-failed":
                        setWarning(translator().translate.components.Authentication.SignIn.error_network_request_failed)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                        setDisabled(false)
                        break;
                    default:
                        console.log(error)
                        setError(translator().translate.components.Authentication.SignIn.error_unknown_problem)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-box-arrow-in-right"></i> %s'.replace('%s', translator().translate.components.Authentication.SignIn.sign_in))
                }, 3000)
            });
    }

    return (
        <div className={isMobile() ? "modal auth-modal" : "modal auth-modal fade"} id="signInModal" tab-index="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">
                            {translator().translate.components.Authentication.SignIn.sign_in}
                        </h3>
                        <div className="auth-modal-input">
                            <label htmlFor="sign-in-email">
                                <i className="bi bi-envelope-fill"></i> {translator().translate.components.Authentication.SignIn.email}
                            </label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="sign-in-email" />
                            <br />
                            <label htmlFor="sign-in-password">
                                <i className="bi bi-key-fill"></i> {translator().translate.components.Authentication.SignIn.password}
                            </label>
                            <input className="auth-modal-password-input" placeholder="abcd1234" type="password" id="sign-in-password" />
                        </div>
                        {warning || error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-login" type="button" onClick={() => handleLogin()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-login" type="button" id="auth-modal-login-dismiss" data-bs-dismiss="modal" aria-label="Close">
                                    {translator().translate.components.Authentication.SignIn.cancel}
                                </button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">
                                        {translator().translate.components.Authentication.SignIn.register}
                                    </button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#forgotModal">
                                        {translator().translate.components.Authentication.SignIn.forgot_password}
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
                                        {translator().translate.components.Authentication.SignIn.or}
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
                            <a href="/privacy-policy">{translator().translate.components.Authentication.SignIn.privacy_policy}</a> &bull; <a href="/terms-of-service">{translator().translate.components.Authentication.SignIn.terms_of_services}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
