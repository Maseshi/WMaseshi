import { useState, useEffect } from 'react'
import { getDatabase, ref as databaseRef, update as updateDB } from "firebase/database"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { translator } from '../../../utils/functions/translator'

export default function Privacy(props) {
    const [pp, setPp] = useState(false)
    const [tos, setTos] = useState(false)

    const userData = props.userData

    useEffect(() => {
        if (userData && userData.data) setPp(userData.data.rule.pp)
        if (userData && userData.data) setTos(userData.data.rule.tos)
    }, [userData])

    return (
        <div className="tab-pane fade" id="v-pills-privacy" role="tabpanel" aria-labelledby="v-pills-privacy-tab">
            <div className="account-content-tab-title">
                <h1>
                    {translator().translate.pages.Account.Contents.Privacy.privacy}
                </h1>
                <p>
                    {translator().translate.pages.Account.Contents.Privacy.privacy_information}
                </p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-bookmark-star"></i> {translator().translate.pages.Account.Contents.Privacy.agreement}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    {
                                        userData && userData.data && userData.data.rule.pp ? (
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="privacy-pp"
                                                checked={pp}
                                                onChange={
                                                    (event) => {
                                                        const auth = getAuth()
                                                        const db = getDatabase()

                                                        event.target.disabled = true
                                                        setPp(event.target.checked)
                                                        event.target.checked = pp

                                                        onAuthStateChanged(auth, (user) => {
                                                            if (user) {
                                                                const dbRef = databaseRef(db, 'data/users/' + user.uid + '/rule')

                                                                updateDB(dbRef, {
                                                                    pp: event.target.checked
                                                                }).then(() => {
                                                                    event.target.disabled = false
                                                                }).catch((error) => {
                                                                    setPp(event.target.checked ? false : true)
                                                                    event.target.checked = pp
                                                                    console.log(error)
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            />
                                        ) : (
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="privacy-pp"
                                                disabled
                                                checked
                                            />
                                        )
                                    }
                                    <label className="form-check-label" htmlFor="privacy-pp">
                                        {translator().translate.pages.Account.Contents.Privacy.privacy_policy}
                                    </label>
                                </div>
                                <a className="ml-auto" href="/privacy-policy">
                                    {translator().translate.pages.Account.Contents.Privacy.read}
                                </a>
                            </div>
                        </div>
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    {
                                        userData && userData.data && userData.data.rule.tos ? (
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="privacy-tos"
                                                checked={tos}
                                                onChange={
                                                    (event) => {
                                                        const auth = getAuth()
                                                        const db = getDatabase()

                                                        event.target.disabled = true
                                                        setTos(event.target.checked)
                                                        event.target.checked = tos

                                                        onAuthStateChanged(auth, (user) => {
                                                            if (user) {
                                                                const dbRef = databaseRef(db, 'projects/maseshi/users/' + user.uid + '/rule')

                                                                updateDB(dbRef, {
                                                                    tos: event.target.checked
                                                                }).then(() => {
                                                                    event.target.disabled = false
                                                                }).catch((error) => {
                                                                    setTos(event.target.checked ? false : true)
                                                                    event.target.checked = tos
                                                                    console.log(error)
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            />
                                        ) : (
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="privacy-tos"
                                                disabled
                                                checked
                                            />
                                        )
                                    }
                                    <label className="form-check-label" htmlFor="privacy-tos">
                                        {translator().translate.pages.Account.Contents.Privacy.terms_of_service}
                                    </label>
                                </div>
                                <a className="ml-auto" href="/terms-of-service">
                                    {translator().translate.pages.Account.Contents.Privacy.read}
                                </a>
                            </div>
                        </div>
                        <div className="card account-content-tab-card">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="privacy-tos"
                                        checked
                                        disabled
                                    />
                                    <label className="form-check-label" htmlFor="privacy-tos">
                                        {translator().translate.pages.Account.Contents.Privacy.cookie_policy}
                                    </label>
                                    <p className="text-secondary m-0">
                                        {translator().translate.pages.Account.Contents.Privacy.cookie_policy_information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
