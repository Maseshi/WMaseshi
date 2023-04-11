import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getDatabase, ref as databaseRef, update as updateDB } from 'firebase/database'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import { resizeImage } from '../../../utils/functions/resizeImage'
import { translator } from '../../../utils/functions/translator'

export default function Personal({ userData }) {
    const [searchParams] = useSearchParams()
    const [gender, setGender] = useState('unspecified')
    const tabParam = searchParams.get('tab')

    useEffect(() => {
        if (userData && userData.data) setGender(userData.data.gender)
    }, [userData])

    const handleUploadProfile = async (event) => {
        const auth = getAuth();
        const storage = getStorage();
        const storageRef = ref(storage, 'users/' + auth.currentUser.uid + '/avatar');

        const resetBtn = document.getElementById('personal-btn-photo-reset')
        const uploadBtn = document.getElementById('personal-btn-photo-upload')

        const resizedImage = await resizeImage({
            "file": event.target.files[0],
            "maxSize": 200
        });

        if (resetBtn) resetBtn.disabled = true
        uploadBtn.disabled = true
        event.target.disabled = true
        uploadBytes(storageRef, resizedImage).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        if (resetBtn) resetBtn.disabled = false
                        uploadBtn.disabled = false
                        event.target.disabled = false
                    })
                });
        });
    }
    const handleUploadProfileClick = () => {
        const inputPhoto = document.getElementById('personal-input-photo-reset')

        inputPhoto.click()
    }
    const handleProfileReset = (event) => {
        const auth = getAuth()
        const storage = getStorage()
        const storageRef = ref(storage, 'users/' + auth.currentUser.uid + '/avatar')
        const circleInput = document.getElementById('personal-input-photo-reset')
        const uploadBtn = document.getElementById('personal-btn-photo-upload')

        circleInput.disabled = true
        uploadBtn.disabled = true
        event.target.disabled = true
        deleteObject(storageRef).then(() => {
            updateProfile(auth.currentUser, {
                photoURL: ''
            }).then(() => {
                circleInput.disabled = false
                uploadBtn.disabled = false
                event.target.disabled = false
            })
        })
    }
    const handleSetGender = (event) => {
        setGender(event.target.value)
        event.target.value = gender
    }
    const handleSavePersonal = (event) => {
        const auth = getAuth()
        const db = getDatabase()

        const inputUsername = document.getElementById('personal-username')
        const inputDescription = document.getElementById('personal-description')
        const inputGender = document.getElementById('personal-gender')
        const buttonPersonal = document.getElementById('personalBasicInfoCancel')

        const validationBasicInfo = document.getElementById('personal-basic-info-validation')

        validationBasicInfo.innerText = ''

        if (inputUsername.value.length >= inputUsername.maxLength) return validationBasicInfo.innerText = translator().translate.pages.Account.Contents.Personal.name_can_not_more_than.replace('%s', inputUsername.maxLength)
        if (inputDescription.value.length >= inputDescription.maxLength) return validationBasicInfo.innerText = translator().translate.pages.Account.Contents.Personal.description_can_not_more_than.replace('%s', inputDescription.maxLength)

        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.save)
        event.target.disabled = true
        buttonPersonal.disabled = true

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = databaseRef(db, 'projects/maseshi/users/' + user.uid)

                updateDB(dbRef, {
                    description: inputDescription.value,
                    gender: inputGender.value
                }).then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: inputUsername.value
                    }).then(() => {
                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.save)
                        event.target.disabled = false
                        buttonPersonal.disabled = false

                        setTimeout(() => {
                            event.target.innerHTML = translator().translate.pages.Account.Contents.Personal.save
                            event.target.disabled = false
                            buttonPersonal.disabled = false
                        }, 3000)
                    }).catch(() => {
                        event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.save)
                        event.target.disabled = false
                        buttonPersonal.disabled = false

                        setTimeout(() => {
                            event.target.innerHTML = translator().translate.pages.Account.Contents.Personal.save
                            event.target.disabled = false
                            buttonPersonal.disabled = false
                        }, 3000)
                    })
                }).catch(() => {
                    event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.save)
                    event.target.disabled = false
                    buttonPersonal.disabled = false

                    setTimeout(() => {
                        event.target.innerHTML = translator().translate.pages.Account.Contents.Personal.save
                        event.target.disabled = false
                        buttonPersonal.disabled = false
                    }, 3000)
                })
            }
        })
    }
    const handleCancelPersonalChange = () => {
        const inputUsername = document.getElementById('personal-username')
        const inputGender = document.getElementById('personal-gender')
        const inputDescription = document.getElementById('personal-description')

        inputUsername.value = ""
        inputGender.value = "unspecified"
        inputDescription.value = ""
    }
    const handleCopyUID = (event) => {
        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.copy_user_id)

        const inputUid = document.getElementById('personal-uid')

        inputUid.select()
        inputUid.setSelectionRange(0, 99999)

        navigator.clipboard.writeText(inputUid.value);

        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Account.Contents.Personal.copy_user_id)
        setTimeout(() => {
            event.target.innerHTML = translator().translate.pages.Account.Contents.Personal.copy_user_id
        }, 3000)
    }

    return (
        <div
            className={
                tabParam ? (
                    tabParam === 'personal' ? (
                        'tab-pane fade show active'
                    ) : (
                        'tab-pane fade'
                    )
                ) : (
                    'tab-pane fade show active'
                )
            }
            id="v-pills-personal"
            role="tabpanel"
            aria-labelledby="v-pills-personal-tab"
        >
            <div className="account-content-tab-title">
                <h1>
                    {translator().translate.pages.Account.Contents.Personal.personal}
                </h1>
                <p>
                    {translator().translate.pages.Account.Contents.Personal.personal_info}
                </p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card mb-3 account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-card-text"></i> {translator().translate.pages.Account.Contents.Personal.basic_data}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row">
                            {
                                userData ? (
                                    <>
                                        <div className="col-md-3 align-self-center text-center">
                                            <div className="account-content-tab-content-profile-upload">
                                                <input type="file" id="personal-input-photo-reset" accept="image/*" onChange={(event) => handleUploadProfile(event)} />
                                                <button type="button" className="account-content-tab-content-profile-upload" id="personal-btn-photo-upload" style={userData.user.photoURL ? { padding: 0 } : null} onClick={() => handleUploadProfileClick}>
                                                    {
                                                        userData.user.photoURL ? (
                                                            <img src={userData.user.photoURL} alt="" width="120px" height="120px" />
                                                        ) : (
                                                            <i className="bi bi-plus"></i>
                                                        )
                                                    }
                                                </button>
                                            </div>
                                            <br />
                                            {
                                                userData.user.photoURL ? (
                                                    <button type="button" className="btn btn-primary account-content-tab-button" id="personal-btn-photo-reset" onClick={(event) => handleProfileReset(event)}>
                                                        {translator().translate.pages.Account.Contents.Personal.default}
                                                    </button>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row g-2 mb-3">
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control account-content-tab-input" id="personal-username" placeholder={translator().translate.pages.Account.Contents.Personal.user} maxLength="20" defaultValue={userData.user.displayName} />
                                                        <label htmlFor="personal-username">
                                                            {translator().translate.pages.Account.Contents.Personal.nickname}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <select className="form-select account-content-tab-input" id="personal-gender" value={gender} aria-label="gender" onChange={(event) => handleSetGender(event)}>
                                                            <option value="unspecified">
                                                                {translator().translate.pages.Account.Contents.Personal.unspecified}
                                                            </option>
                                                            <option value="male">
                                                                {translator().translate.pages.Account.Contents.Personal.male}
                                                            </option>
                                                            <option value="female">
                                                                {translator().translate.pages.Account.Contents.Personal.female}
                                                            </option>
                                                            <option value="other">
                                                                {translator().translate.pages.Account.Contents.Personal.other}
                                                            </option>
                                                        </select>
                                                        <label htmlFor="personal-gender">
                                                            {translator().translate.pages.Account.Contents.Personal.gender}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control account-content-tab-input h-100" rows="5" style={{ resize: "none" }} maxLength="256" placeholder={translator().translate.pages.Account.Contents.Personal.description_placeholder} id="personal-description" defaultValue={userData.data.description}></textarea>
                                                <label htmlFor="personal-description">
                                                    {translator().translate.pages.Account.Contents.Personal.description}
                                                </label>
                                            </div>
                                            <p className="text-warning" id="personal-basic-info-validation"></p>
                                            <div className="hstack gap-3">
                                                <button type="button" className="btn btn-primary w-100 account-content-tab-button" onClick={(event) => handleSavePersonal(event)}>
                                                    {translator().translate.pages.Account.Contents.Personal.save}
                                                </button>
                                                <div className="vr"></div>
                                                <button type="button" className="btn btn-outline-secondary w-100 account-content-tab-button" id="personalBasicInfoCancel" onClick={() => handleCancelPersonalChange}>
                                                    {translator().translate.pages.Account.Contents.Personal.reset}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border m-5" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="card account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2>
                                <i className="bi bi-key"></i> {translator().translate.pages.Account.Contents.Personal.login_information}
                            </h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row mb-2">
                            <label htmlFor="personal-email" className="col-sm-2 col-form-label">
                                {translator().translate.pages.Account.Contents.Personal.email_address}
                            </label>
                            {
                                userData && userData.user.email ? (
                                    <div className="col-sm-10">
                                        <input type="email" readOnly className="form-control-plaintext" id="personal-email" value={userData.user.email} />
                                    </div>
                                ) : (
                                    <div className="placeholder-glow col-sm-10">
                                        <span className="placeholder w-100"></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="personal-email" className="col-sm-2 col-form-label">
                                {translator().translate.pages.Account.Contents.Personal.permission_level}
                            </label>
                            {
                                userData && userData.data.role ? (
                                    <div className="col-sm-10">
                                        <input type="text" readOnly className="form-control-plaintext" id="personal-role" value={userData.data.role} />
                                    </div>
                                ) : (
                                    <div className="placeholder-glow col-sm-10">
                                        <span className="placeholder w-100"></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <label htmlFor="personal-uid" className="col-sm-2 col-form-label">
                                {translator().translate.pages.Account.Contents.Personal.user_id}
                            </label>
                            {
                                userData && userData.user.uid ? (
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext" id="personal-uid" value={userData.user.uid} />
                                    </div>
                                ) : (
                                    <div className="placeholder-glow col-sm-10">
                                        <span className="placeholder w-100"></span>
                                    </div>
                                )
                            }
                            <div className="col-sm-2 text-center">
                                {
                                    userData && userData.user.uid ? (
                                        <button type="button" className="btn btn-primary account-content-tab-button" onClick={(event) => handleCopyUID(event)}>
                                            {translator().translate.pages.Account.Contents.Personal.copy_user_id}
                                        </button>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
