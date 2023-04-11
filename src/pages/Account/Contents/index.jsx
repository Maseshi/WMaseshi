import { useState } from 'react'
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth'

import Modal from '../../../components/Modal/index'

import { translator } from '../../../utils/functions/translator'

import Personal from './Personal'
import Security from './Security'
import Privacy from './Privacy'
import Settings from './Settings'
import Empty from './Empty'

export default function Contents({ userData, tabs }) {
    const [verify, setVerify] = useState(false)

    const handleVerify = (event) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const closeButton = document.getElementById('verifyChangeCloseModal')
        const passwordInput = document.getElementById('securityPasswordVerifyModal')
        const passwordValidate = document.getElementById('securityPasswordVerifyModalFeedback')

        const email = user.email
        const credential = EmailAuthProvider.credential(email, passwordInput.value)

        passwordValidate.innerHTML = ''
        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Contents.verify)

        if (!passwordInput.value) {
            passwordValidate.classList.add('is-invalid')
            passwordValidate.innerHTML = translator().translate.pages.Account.Contents.Contents.password_can_not_empty
            event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Contents.verify)
            return setTimeout(() => event.target.innerHTML = translator().translate.pages.Account.Contents.Contents.verify, 3000)
        }

        reauthenticateWithCredential(user, credential)
            .then(() => {
                passwordInput.value = ''
                event.target.innerHTML = translator().translate.pages.Account.Contents.Contents.verify
                setVerify(true)
                closeButton.click()
                closeButton.addEventListener('hidden.bs.modal', () => {
                    setVerify(false)
                })
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    passwordValidate.classList.add('is-invalid')
                    passwordValidate.innerHTML = translator().translate.pages.Account.Contents.Contents.incorrect_password
                    event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Contents.verify)
                    setTimeout(() => event.target.innerHTML = translator().translate.pages.Account.Contents.Contents.verify, 3000)
                } else {
                    console.log(error)
                    passwordValidate.classList.add('is-invalid')
                    passwordValidate.innerHTML = translator().translate.pages.Account.Contents.Contents.error_unknown
                    event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Contents.verify)
                    setTimeout(() => event.target.innerHTML = translator().translate.pages.Account.Contents.Contents.verify, 3000)
                }
            })
    }

    return (
        <div className="account-content" >
            <div className="tab-content" id="v-pills-tabContent">
                <Personal userData={userData} verify={verify} />
                <Security userData={userData} verify={verify} />
                <Privacy userData={userData} verify={verify} />
                <Settings userData={userData} verify={verify} />
                <Empty tabs={tabs} />
            </div>
            <Modal
                id="verify"
                title={translator().translate.pages.Account.Contents.Contents.verify_changes}
                body={
                    <>
                        <p>
                            {translator().translate.pages.Account.Contents.Contents.password_can_not_empty}
                        </p>
                        <div className="form-floating">
                            <label htmlFor="securityPasswordVerifyModal">
                                {translator().translate.pages.Account.Contents.Contents.password}
                            </label>
                            <input
                                type="password"
                                className="form-control account-content-tab-input"
                                id="securityPasswordVerifyModal"
                                placeholder={translator().translate.pages.Account.Contents.Contents.password}
                                aria-describedby="securityPasswordVerifyModalFeedback"
                            />
                            <div className="invalid-feedback" id="securityPasswordVerifyModalFeedback"></div>
                        </div>
                        <br />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="button" className="btn account-content-tab-button btn-secondary w-100" data-bs-dismiss="modal" id="verifyChangeCloseModal" aria-label="Close">
                                {translator().translate.pages.Account.Contents.Contents.cancel}
                            </button>
                            <button type="button" className="btn account-content-tab-button btn-primary w-100" onClick={(event) => handleVerify(event)}>
                                ยืนยัน
                            </button>
                        </div>
                    </>
                }
            />
        </div>
    )
}
