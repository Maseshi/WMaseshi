import { useState } from 'react'
import {
    getAuth,
    updateEmail,
    updatePassword,
    sendEmailVerification,
    linkWithPopup,
    unlink,
    OAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from 'firebase/auth'

// Function
import { isMobile } from '../../../utils/functions/isMobile'
import { translator } from '../../../utils/functions/translator'

// Assets
import microsoftLogo from '../../../assets/icons/microsoft.svg'
import googleLogo from '../../../assets/icons/google.webp'
import facebookLogo from '../../../assets/icons/facebook.webp'
import githubLogo from '../../../assets/icons/github.webp'

export default function Security(props) {
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const userData = props.userData
    const verify = props.verify

    const emailValidity = (string) => {
        const re = /\S+@\S+\.\S+/
        return re.test(string)
    }
    const providerID = () => {
        if (userData) {
            const provider = []
            const data = userData.user.providerData

            for (let i = 0; i < data.length; i++) {
                const ID = data[i].providerId

                return provider.concat(ID)
            }
        }
    }

    return (
        <div className="tab-pane fade" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab">
            <div className="account-content-tab-title">
                <h1>
                    {translator().translate.pages.Account.Contents.Security.security}
                </h1>
                <p>
                    {translator().translate.pages.Account.Contents.Security.security_information}
                </p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card account-content-tab-card mb-3">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-person-lines-fill"></i> {translator().translate.pages.Account.Contents.Security.config_account}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row">
                            <div className={isMobile() ? "col-md-6 mb-3" : "col-md-6"}>
                                <h3>
                                    {translator().translate.pages.Account.Contents.Security.change_email}
                                </h3>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control account-content-tab-input"
                                        id="security-email-new"
                                        placeholder="name@example.com"
                                        aria-describedby="securityEmailNewFeedback"
                                        onChange={
                                            (event) => {
                                                const newEmail = document.getElementById('security-email-confirm')
                                                const validate = document.getElementById('securityEmailNewFeedback')

                                                if (event.target.value) {
                                                    if (!emailValidity(event.target.value)) {
                                                        event.target.classList.add("is-invalid")
                                                        newEmail.disabled = true
                                                        return validate.innerHTML = translator().translate.pages.Account.Contents.Security.invalid_format
                                                    }

                                                    if (event.target.value === userData.user.email) {
                                                        event.target.classList.add("is-invalid")
                                                        newEmail.disabled = true
                                                        return validate.innerHTML = translator().translate.pages.Account.Contents.Security.duplicate_email
                                                    }
                                                }

                                                event.target.classList.remove("is-invalid")
                                                newEmail.disabled = false
                                                validate.innerHTML = ''
                                            }
                                        }
                                    />
                                    <label htmlFor="security-email-new">
                                        {translator().translate.pages.Account.Contents.Security.new_email}
                                    </label>
                                    <div className="invalid-feedback" id="securityEmailNewFeedback"></div>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control account-content-tab-input"
                                        id="security-email-confirm"
                                        placeholder="name@example.com"
                                        aria-describedby="securityEmailVerifyFeedback"
                                        onChange={
                                            (event) => {
                                                const newEmail = document.getElementById('security-email-new')
                                                const validate = document.getElementById('securityEmailVerifyFeedback')
                                                const button = document.getElementById('securityEmailButton')

                                                if (event.target.value) {
                                                    if (event.target.value !== newEmail.value) {
                                                        event.target.classList.add("is-invalid")
                                                        return validate.innerHTML = translator().translate.pages.Account.Contents.Security.duplicate_email
                                                    }

                                                    button.disabled = false
                                                }

                                                event.target.classList.remove("is-invalid")
                                                button.disabled = true
                                                validate.innerHTML = ''
                                            }
                                        }
                                    />
                                    <label htmlFor="security-email-confirm">
                                        {translator().translate.pages.Account.Contents.Security.verify_new_email}
                                    </label>
                                    <div className="invalid-feedback" id="securityEmailVerifyFeedback"></div>
                                </div>
                                <br />
                                <button
                                    type="button"
                                    className="account-content-tab-button btn btn-primary w-100"
                                    id="securityEmailButton"
                                    data-bs-toggle="modal"
                                    data-bs-target="#verifyChangeModal"
                                    disabled
                                    onClick={
                                        (event) => {
                                            const auth = getAuth()
                                            const newEmail = document.getElementById('security-email-new')
                                            const emailConfirm = document.getElementById('security-email-confirm')
                                            const element = document.getElementById('verifyChangeModal')

                                            newEmail.disabled = true
                                            emailConfirm.disabled = true
                                            event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                            setEmailError('')

                                            element.addEventListener('hidden.bs.modal', () => {
                                                if (verify) {
                                                    updateEmail(auth.currentUser, emailConfirm.value).then(() => {
                                                        newEmail.disabled = false
                                                        emailConfirm.disabled = false
                                                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        setTimeout(() => {
                                                            event.target.innerHTML = '<i class="bi bi-lock"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        }, 3000)
                                                    }).catch((error) => {
                                                        newEmail.disabled = false
                                                        emailConfirm.disabled = false
                                                        event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        setEmailError(translator().translate.pages.Account.Contents.Security.can_not_change_email + '\n' + error)
                                                    });
                                                } else {
                                                    event.target.innerHTML = '<i class="bi bi-lock"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                }
                                            })
                                        }
                                    }
                                >
                                    <i className="bi bi-lock"></i> {translator().translate.pages.Account.Contents.Security.change}
                                </button>
                                {emailError ? <span className="text-center text-warning w-100">{emailError}</span> : ""}
                            </div>
                            <div className="col-md-6">
                                <h3>
                                    {translator().translate.pages.Account.Contents.Security.change_password}
                                </h3>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control account-content-tab-input" id="security-password-new" placeholder="abcd0123" aria-describedby="securityPasswordNewFeedback" />
                                    <label htmlFor="security-password-new">
                                        {translator().translate.pages.Account.Contents.Security.new_password}
                                    </label>
                                    <div className="invalid-feedback" id="securityPasswordNewFeedback"></div>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control account-content-tab-input"
                                        id="security-password-confirm"
                                        placeholder="abcd0123"
                                        aria-describedby="securityPasswordVerifyFeedback"
                                        onChange={
                                            (event) => {
                                                const newPassword = document.getElementById('security-password-new')
                                                const validate = document.getElementById('securityPasswordVerifyFeedback')
                                                const button = document.getElementById('securityPasswordButton')

                                                if (event.target.value) {
                                                    if (event.target.value === newPassword.value) {
                                                        event.target.classList.add("is-invalid")
                                                        return validate.innerHTML = translator().translate.pages.Account.Contents.Security.password_not_match
                                                    }

                                                    button.disabled = false
                                                }

                                                event.target.classList.remove("is-invalid")
                                                button.disabled = true
                                                validate.innerHTML = ''
                                            }
                                        }
                                    />
                                    <label htmlFor="security-password-confirm">
                                        {translator().translate.pages.Account.Contents.Security.verify_new_password}
                                    </label>
                                    <div className="invalid-feedback" id="securityPasswordVerifyFeedback"></div>
                                </div>
                                <br />
                                <button
                                    className="account-content-tab-button btn btn-primary w-100"
                                    type="button"
                                    id="securityPasswordButton"
                                    data-bs-toggle="modal"
                                    data-bs-target="#verifyChangeModal"
                                    disabled
                                    onClick={
                                        (event) => {
                                            const auth = getAuth()
                                            const newPassword = document.getElementById('security-password-new')
                                            const passwordConfirm = document.getElementById('security-password-confirm')
                                            const element = document.getElementById('verifyChangeModal')

                                            newPassword.disabled = true
                                            passwordConfirm.disabled = true
                                            event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                            setPasswordError('')

                                            element.addEventListener('hidden.bs.modal', () => {
                                                if (verify) {
                                                    updatePassword(auth.currentUser, passwordConfirm.value).then(() => {
                                                        newPassword.disabled = false
                                                        passwordConfirm.disabled = false
                                                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        setTimeout(() => {
                                                            event.target.innerHTML = '<i class="bi bi-lock"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        }, 3000)
                                                    }).catch((error) => {
                                                        newPassword.disabled = false
                                                        passwordConfirm.disabled = false
                                                        event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                        setPasswordError(translator().translate.pages.Account.Contents.Security.can_not_change_password + '\n' + error)
                                                    })
                                                } else {
                                                    event.target.innerHTML = '<i class="bi bi-lock"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.change)
                                                }
                                            })
                                        }
                                    }
                                >
                                    <i className="bi bi-lock"></i> {translator().translate.pages.Account.Contents.Security.change}
                                </button>
                                {passwordError ? <span className="text-center text-warning w-100">{passwordError}</span> : ""}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className={isMobile() ? "col-md-6 mb-3" : "col-md-6"}>

                        <div className="card account-content-tab-card">
                            <div className="card-body">
                                <div className="account-content-tab-content-title">
                                    <h2>
                                        <i className="bi bi-check-circle"></i> {translator().translate.pages.Account.Contents.Security.confirmation}
                                    </h2>
                                </div>
                                <hr className="account-content-tab-content-horizon" />
                                <div className="card mb-3 account-content-tab-card">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData ? (
                                                userData.user.emailVerified ? (
                                                    <>
                                                        <span className="badge rounded-pill bg-success">
                                                            {translator().translate.pages.Account.Contents.Security.verify}
                                                        </span>
                                                        <div className="me-auto">
                                                            {translator().translate.pages.Account.Contents.Security.verify_email}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="badge rounded-pill bg-warning text-dark">
                                                            {translator().translate.pages.Account.Contents.Security.unverified}
                                                        </span>
                                                        <div className="me-auto">
                                                            {translator().translate.pages.Account.Contents.Security.verify_email}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary account-content-tab-button"
                                                            onClick={
                                                                (event) => {
                                                                    const auth = getAuth();

                                                                    event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.send)
                                                                    event.target.disabled = true

                                                                    sendEmailVerification(auth.currentUser).then(() => {
                                                                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.send)
                                                                        setTimeout(() => {
                                                                            let count = 57
                                                                            const waitTimer = setInterval(() => {
                                                                                if (count <= 0) {
                                                                                    clearInterval(waitTimer)
                                                                                    event.target.disabled = false
                                                                                } else {
                                                                                    event.target.innerHTML = count + ' %s'.replace('%s', translator().translate.pages.Account.Contents.Security.send)
                                                                                }
                                                                                count -= 1
                                                                            }, 1000)
                                                                        }, 3000)
                                                                    }).catch((error) => {
                                                                        console.log(error)
                                                                        event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Security.send)
                                                                        event.target.disabled = false
                                                                        setTimeout(() => {
                                                                            event.target.innerHTML = translator().translate.pages.Account.Contents.Security.send
                                                                        }, 3000)
                                                                    })
                                                                }
                                                            }
                                                        >
                                                            {translator().translate.pages.Account.Contents.Security.send}
                                                        </button>
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <span className="badge rounded-pill bg-secondary">
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Loading...</span>
                                                    </span>
                                                    <div className="me-auto">
                                                        {translator().translate.pages.Account.Contents.Security.verify_email}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="card account-content-tab-card">
                                    <div className="card-body hstack gap-3">
                                        <span className="badge rounded-pill bg-secondary">
                                            {translator().translate.pages.Account.Contents.Security.disable}
                                        </span>
                                        <div className="me-auto">
                                            {translator().translate.pages.Account.Contents.Security.two_factor}
                                        </div>
                                        <button type="button" className="btn btn-primary account-content-tab-button" disabled>
                                            {translator().translate.pages.Account.Contents.Security.enable}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">

                        <div className="card account-content-tab-card">
                            <div className="card-body">
                                <div className="account-content-tab-content-title">
                                    <h2>
                                        <i className="bi bi-plug"></i> {translator().translate.pages.Account.Contents.Security.connect_account}
                                    </h2>
                                </div>
                                <hr className="account-content-tab-content-horizon" />
                                <div className="card account-content-tab-card mb-3">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData && providerID().includes('microsoft.com') ? (
                                                <>
                                                    <img src={microsoftLogo} alt="microsoft" width="20px" height="20px" />
                                                    <div className="me-auto">Microsoft</div>
                                                    <div className="hstack gap-3">
                                                        <span className="user-select-all align-middle">
                                                            {
                                                                userData.user.providerData.find(data => data.providerId === 'microsoft.com').displayName || translator().translate.pages.Account.Contents.Security.unknown
                                                            }
                                                        </span>
                                                        <div className="vr"></div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary account-content-tab-button"
                                                            onClick={
                                                                () => {
                                                                    const auth = getAuth()
                                                                    const provider = new OAuthProvider('microsoft.com')

                                                                    unlink(auth.currentUser, provider)
                                                                        .catch((error) => {
                                                                            const errorCode = error.code
                                                                            const errorMessage = error.message

                                                                            console.log(errorCode, errorMessage)
                                                                        })
                                                                }
                                                            }
                                                        >
                                                            {translator().translate.pages.Account.Contents.Security.revoke}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={microsoftLogo} alt="microsoft" width="20px" height="20px" />
                                                    <div className="me-auto">Microsoft</div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary account-content-tab-button"
                                                        onClick={
                                                            () => {
                                                                const auth = getAuth()
                                                                const provider = new OAuthProvider('microsoft.com')

                                                                linkWithPopup(auth.currentUser, provider)
                                                                    .catch((error) => {
                                                                        const errorCode = error.code
                                                                        const errorMessage = error.message

                                                                        console.log(errorCode, errorMessage)
                                                                    })
                                                            }
                                                        }
                                                    >
                                                        {translator().translate.pages.Account.Contents.Security.connect}
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="card account-content-tab-card mb-3">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData && providerID().includes('google.com') ? (
                                                <>
                                                    <img src={googleLogo} alt="google" width="20px" height="20px" />
                                                    <div className="me-auto">Google</div>
                                                    <div className="hstack gap-3">
                                                        <span className="user-select-all align-middle">
                                                            {
                                                                userData.user.providerData.find(data => data.providerId === 'google.com').displayName || translator().translate.pages.Account.Contents.Security.unknown
                                                            }
                                                        </span>
                                                        <div className="vr"></div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary account-content-tab-button"
                                                            onClick={
                                                                () => {
                                                                    const auth = getAuth()
                                                                    const provider = new GoogleAuthProvider()

                                                                    unlink(auth.currentUser, provider)
                                                                        .catch((error) => {
                                                                            const errorCode = error.code
                                                                            const errorMessage = error.message

                                                                            console.log(errorCode, errorMessage)
                                                                        })
                                                                }
                                                            }
                                                        >
                                                            {translator().translate.pages.Account.Contents.Security.revoke}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={googleLogo} alt="google" width="20px" height="20px" />
                                                    <div className="me-auto">Google</div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary account-content-tab-button"
                                                        onClick={
                                                            () => {
                                                                const auth = getAuth()
                                                                const provider = new GoogleAuthProvider()

                                                                provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
                                                                linkWithPopup(auth.currentUser, provider)
                                                                    .catch((error) => {
                                                                        const errorCode = error.code
                                                                        const errorMessage = error.message

                                                                        console.log(errorCode, errorMessage)
                                                                    })
                                                            }
                                                        }
                                                    >
                                                        {translator().translate.pages.Account.Contents.Security.connect}
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="card account-content-tab-card mb-3">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData && providerID().includes('facebook.com') ? (
                                                <>
                                                    <img src={facebookLogo} alt="facebook" width="20px" height="20px" />
                                                    <div className="me-auto">Facebook</div>
                                                    <div className="hstack gap-3">
                                                        <span className="user-select-all align-middle">
                                                            {
                                                                userData.user.providerData.find(data => data.providerId === 'facebook.com').displayName || translator().translate.pages.Account.Contents.Security.unknown
                                                            }
                                                        </span>
                                                        <div className="vr"></div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary account-content-tab-button"
                                                            onClick={
                                                                () => {
                                                                    const auth = getAuth()
                                                                    const provider = new FacebookAuthProvider()

                                                                    unlink(auth.currentUser, provider)
                                                                        .catch((error) => {
                                                                            const errorCode = error.code
                                                                            const errorMessage = error.message

                                                                            console.log(errorCode, errorMessage)
                                                                        })
                                                                }
                                                            }
                                                        >
                                                            {translator().translate.pages.Account.Contents.Security.revoke}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={facebookLogo} alt="facebook" width="20px" height="20px" />
                                                    <div className="me-auto">Facebook</div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary account-content-tab-button"
                                                        onClick={
                                                            () => {
                                                                const auth = getAuth()
                                                                const provider = new FacebookAuthProvider()

                                                                linkWithPopup(auth.currentUser, provider)
                                                                    .catch((error) => {
                                                                        const errorCode = error.code
                                                                        const errorMessage = error.message

                                                                        console.log(errorCode, errorMessage)
                                                                    })
                                                            }
                                                        }
                                                    >
                                                        {translator().translate.pages.Account.Contents.Security.connect}
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="card account-content-tab-card">
                                    <div className="card-body hstack gap-3">
                                        {
                                            userData && providerID().includes('github.com') ? (
                                                <>
                                                    <img src={githubLogo} alt="github" width="20px" height="20px" />
                                                    <div className="me-auto">Github</div>
                                                    <div className="hstack gap-3">
                                                        <span className="user-select-all align-middle">
                                                            {
                                                                userData.user.providerData.find(data => data.providerId === 'github.com').displayName || translator().translate.pages.Account.Contents.Security.unknown
                                                            }
                                                        </span>
                                                        <div className="vr"></div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary account-content-tab-button"
                                                            onClick={
                                                                () => {
                                                                    const auth = getAuth()
                                                                    const provider = new GithubAuthProvider()

                                                                    unlink(auth.currentUser, provider)
                                                                        .catch((error) => {
                                                                            const errorCode = error.code
                                                                            const errorMessage = error.message

                                                                            console.log(errorCode, errorMessage)
                                                                        })
                                                                }
                                                            }
                                                        >
                                                            {translator().translate.pages.Account.Contents.Security.revoke}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={githubLogo} alt="github" width="20px" height="20px" />
                                                    <div className="me-auto">Github</div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary account-content-tab-button"
                                                        onClick={
                                                            () => {
                                                                const auth = getAuth()
                                                                const provider = new GithubAuthProvider()

                                                                linkWithPopup(auth.currentUser, provider)
                                                                    .catch((error) => {
                                                                        const errorCode = error.code
                                                                        const errorMessage = error.message

                                                                        console.log(errorCode, errorMessage)
                                                                    })
                                                            }
                                                        }
                                                    >
                                                        {translator().translate.pages.Account.Contents.Security.connect}
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
