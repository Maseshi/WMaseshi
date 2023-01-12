import { useState } from 'react'
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"

import AuthProviders from './AuthProviders'

import { isMobile } from '../../utils/functions/isMobile'
import { translator } from '../../utils/functions/translator'

export default function Register() {
    const [error, setError] = useState()
    const [warning, setWarning] = useState()
    const [action, setAction] = useState('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
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
            setWarning(translator().translate.components.Authentication.Register.empty_email_input)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (!validateEmail(email)) {
            setWarning(translator().translate.components.Authentication.Register.invalid_email_format)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (!password) {
            setWarning(translator().translate.components.Authentication.Register.empty_password_input)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (password.length < 8) {
            setWarning(translator().translate.components.Authentication.Register.password_minimum)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (!cpassword) {
            setWarning(translator().translate.components.Authentication.Register.verify_password)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (password !== cpassword) {
            setWarning(translator().translate.components.Authentication.Register.passwords_do_not_match)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
            setDisabled(false)
            return
        }
        if (!rule) {
            setWarning(translator().translate.components.Authentication.Register.accept_rules)
            setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
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

                                setAction('<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
                                setDisabled(false)
                                dismiss.click()
                            })
                    });
                });
            }).catch((error) => {
                const errorCode = error.code;

                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setWarning(translator().translate.components.Authentication.Register.error_email_already_in_use)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
                        setDisabled(false)
                        break;
                    default:
                        console.log(error)
                        setError(translator().translate.components.Authentication.Register.error_unknown_problem)
                        setAction('<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
                        setDisabled(false)
                }

                setTimeout(() => {
                    setAction('<i class="bi bi-plus-circle"></i> %s'.replace('%s', translator().translate.components.Authentication.Register.create_new_account))
                }, 3000);
            });
    }

    return (
        <div className={isMobile() ? "modal auth-modal" : "modal auth-modal fade"} id="registerModal" tab-index="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="auth-modal-content-brand">
                        <img src={process.env.PUBLIC_URL + '/images/favicon-96x96.png'} alt="favicon" width="50px" height="50px" />
                        Maseshi
                    </div>
                    <div className="auth-modal-content">
                        <h3 className="auth-modal-content-title">
                            {translator().translate.components.Authentication.Register.create_new_account}
                        </h3>
                        <div className="auth-modal-input">
                            <label htmlFor="register-email">
                                <i className="bi bi-envelope-fill"></i> {translator().translate.components.Authentication.Register.email}
                            </label>
                            <input className="auth-modal-email-input" placeholder="example@domain.com" type="email" id="register-email" />
                            <br />
                            <label htmlFor="register-password">
                                <i className="bi bi-key-fill"></i> {translator().translate.components.Authentication.Register.password}
                            </label>
                            <input className="auth-modal-password-input" placeholder="abcd1234" type="password" id="register-password" />
                            <br />
                            <label htmlFor="register-confirm-password">
                                <i className="bi bi-key-fill"></i> {translator().translate.components.Authentication.Register.confirm_password}
                            </label>
                            <input className="auth-modal-confirm-password-input" placeholder="abcd1234" type="password" id="register-confirm-password" />
                            <br />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="register-rule" />
                                <label className="form-check-label" htmlFor="register-rule">
                                    {translator().translate.components.Authentication.Register.register_rules}
                                </label>
                            </div>
                        </div>
                        {warning || error ? <p className="auth-modal-result" dangerouslySetInnerHTML={{ __html: warning || error }}></p> : null}
                        <div className="auth-modal-action">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary auth-modal-register" type="button" onClick={() => handleRegister()} disabled={disabled} dangerouslySetInnerHTML={{ __html: action }}></button>
                                <button className="btn btn-light auth-modal-register" type="button" id="auth-modal-register-dismiss" data-bs-dismiss="modal" aria-label="Close">
                                    {translator().translate.components.Authentication.Register.cancel}
                                </button>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#signInModal">
                                        {translator().translate.components.Authentication.Register.already_account}
                                    </button>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#forgotModal">
                                        {translator().translate.components.Authentication.Register.forgot_password}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td><hr /></td>
                                    <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                        {translator().translate.components.Authentication.Register.or}
                                    </td>
                                    <td><hr /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="auth-modal-options">
                            <AuthProviders />
                        </div>
                        <br />
                        <div className="auth-modal-content-rule text-center">
                            <a href="/privacy-policy">{translator().translate.components.Authentication.Register.privacy_policy}</a> &bull; <a href="/terms-of-service">{translator().translate.components.Authentication.Register.terms_of_services}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
