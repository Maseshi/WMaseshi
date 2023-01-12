import { useState } from 'react'
import { getAuth, deleteUser } from 'firebase/auth'
import { getDatabase, ref, remove } from 'firebase/database'
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage'

import { setCookie } from '../../../utils/functions/setCookie'
import { translator } from '../../../utils/functions/translator'

import config from '../../../configs/data'

export default function Settings(props) {
    const [languageSelection, setLanguageSelection] = useState(translator().code)
    const [deleteAccountError, setDeleteAccountError] = useState('')

    const userData = props.userData
    const verify = props.verify

    return (
        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
            <div className="account-content-tab-title">
                <h1>
                    {translator().translate.pages.Account.Contents.Settings.settings}
                </h1>
                <p>
                    {translator().translate.pages.Account.Contents.Settings.settings_information}
                </p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card account-content-tab-card mb-3">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-gear"></i> {translator().translate.pages.Account.Contents.Settings.general_settings}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <select
                                    className="form-select w-auto"
                                    value={languageSelection}
                                    onChange={
                                        (event) => {
                                            setLanguageSelection(event.target.value)
                                            setCookie('languageSelect', event.target.value, 60)
                                            window.location.reload()
                                        }
                                    }
                                    aria-label="Languages options"
                                >
                                    {
                                        config.LANGUAGES.map((lang, index) => {
                                            const code = lang.code
                                            const name = lang.name

                                            return (
                                                <option key={index} value={code}>{name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div>
                                    <span>
                                        {translator().translate.pages.Account.Contents.Settings.website_languages}
                                    </span>
                                    <br />
                                    <p className="text-secondary m-0">
                                        {translator().translate.pages.Account.Contents.Settings.website_languages_information}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card account-content-tab-card">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    <input className="form-check-input" type="checkbox" role="switch" id="settings-dark-mode" disabled />
                                    <label className="form-check-label" htmlFor="settings-dark-mode">
                                        {translator().translate.pages.Account.Contents.Settings.dark_mode}
                                    </label>
                                    <p className="text-secondary m-0">
                                        {translator().translate.pages.Account.Contents.Settings.dark_mode_information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-file-earmark-person"></i> {translator().translate.pages.Account.Contents.Settings.manage_account}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {translator().translate.pages.Account.Contents.Settings.delete_account_and_services}
                                </h5>
                                <p className="card-content">
                                    {translator().translate.pages.Account.Contents.Settings.delete_account_and_services_information}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-danger account-content-tab-button"
                                    disabled={userData && userData.user.email ? false : true}
                                    data-bs-toggle="modal"
                                    data-bs-target="#verifyChangeModal"
                                    onClick={
                                        (event) => {
                                            const auth = getAuth()
                                            const database = getDatabase()
                                            const storage = getStorage()
                                            const user = auth.currentUser
                                            const dbRef = ref(database, 'projects/maseshi/users/' + user.uid)
                                            const stRef = storageRef(storage, 'users/' + user.uid)
                                            const element = document.getElementById('verifyChangeModal')

                                            event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Settings.delete_account)
                                            event.target.disabled = true

                                            element.addEventListener('hidden.bs.modal', () => {
                                                if (verify) {
                                                    deleteUser(user).then(() => {
                                                        remove(dbRef).then(() => {
                                                            deleteObject(stRef).then(() => {
                                                                event.target.disabled = false
                                                                event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Settings.delete_account)
                                                                setTimeout(() => {
                                                                    event.target.innerHTML = translator().translate.pages.Account.Contents.Settings.delete_account
                                                                }, 3000)
                                                            })
                                                        })
                                                    }).catch((error) => {
                                                        event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Settings.delete_account)
                                                        setDeleteAccountError(translator().translate.pages.Account.Contents.Settings.can_not_delete_account + '\n' + error.message)
                                                    });
                                                } else {
                                                    event.target.innerHTML = '<i class="bi bi-lock"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Settings.delete_account)
                                                    event.target.disabled = false
                                                }
                                            })
                                        }
                                    }
                                >
                                    <i className="bi bi-lock"></i> {translator().translate.pages.Account.Contents.Settings.delete_account}
                                </button>
                                {deleteAccountError ? <p className="text-danger fs-6 mb-0 mt-1">{deleteAccountError}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
