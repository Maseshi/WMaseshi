import { useState, useEffect } from 'react'
import { getDatabase, ref as databaseRef, update as updateDB } from 'firebase/database'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export default function Personal(props) {
    const [gender, setGender] = useState('unspecified')
    const [personalLabel, setPersonalLabel] = useState('บันทึก')
    const [personalLabelDisabled, setPersonalLabelDisabled] = useState(false)

    const userData = props.userData

    useEffect(() => {
        if (userData && userData.data) setGender(userData.data.gender)
    }, [userData])

    const resizeImage = (settings) => {
        var file = settings.file;
        var maxSize = settings.maxSize;
        var reader = new FileReader();
        var image = new Image();
        var canvas = document.createElement('canvas');
        var dataURItoBlob = function (dataURI) {
            var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
                atob(dataURI.split(',')[1]) :
                unescape(dataURI.split(',')[1]);
            var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var max = bytes.length;
            var ia = new Uint8Array(max);
            for (var i = 0; i < max; i++)
                ia[i] = bytes.charCodeAt(i);
            return new Blob([ia], { type: mime });
        };
        var resize = function () {
            var width = image.width;
            var height = image.height;
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            var dataUrl = canvas.toDataURL('image/jpeg');
            return dataURItoBlob(dataUrl);
        };
        return new Promise(function (ok, no) {
            if (!file.type.match(/image.*/)) {
                no(new Error("Not an image"));
                return;
            }
            reader.onload = function (readerEvent) {
                image.onload = function () { return ok(resize()); };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    let inputElement = ''

    return (
        <div className="tab-pane fade" id="v-pills-personal" role="tabpanel" aria-labelledby="v-pills-personal-tab" >
            <div className="account-content-tab-title">
                <h1>ข้อมูลส่วนตัว</h1>
                <p>การเพิ่มข้อมูลส่วนบุคคลของคุณจะช่วยให้เรารู้จักคุณได้มากขึ้น</p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card mb-3 account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2><i className="bi bi-card-text"></i> ข้อมูลพื้นฐาน</h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row">
                            {
                                userData ? (
                                    <>
                                        <div className="col-md-3 align-self-center text-center">
                                            <div className="account-content-tab-content-profile-upload">
                                                <input type="file" ref={input => inputElement = input} id="personal-input-photo-reset" onChange={
                                                    async (event) => {
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
                                                } accept="image/*" />
                                                <button type="button" className="btn account-content-tab-content-profile-upload" id="personal-btn-photo-upload" style={userData.user.photoURL ? { padding: 0 } : null} onClick={() => inputElement.click()}>
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
                                                    <button type="button" className="btn btn-primary account-content-tab-button" id="personal-btn-photo-reset" onClick={
                                                        (event) => {
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
                                                    }>คืนค่าเริ่มต้น</button>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row g-2 mb-3">
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control account-content-tab-input" id="personal-username" placeholder="ผู้ใช้" maxLength="20" defaultValue={userData.user.displayName} />
                                                        <label htmlFor="personal-username">นามแฝงหรือชื่อเล่น</label>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-floating">
                                                        <select className="form-select account-content-tab-input" id="personal-gender" value={gender} onChange={
                                                            (event) => {
                                                                setGender(event.target.value)
                                                                event.target.value = gender
                                                            }
                                                        } aria-label="gender">
                                                            <option value="unspecified">ไม่ระบุ</option>
                                                            <option value="male">ชาย</option>
                                                            <option value="female">หญิง</option>
                                                            <option value="other">อื่นๆ</option>
                                                        </select>
                                                        <label htmlFor="personal-gender">เพศ</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control account-content-tab-input h-100" rows="5" style={{ resize: "none" }} maxLength="256" placeholder="สู่ความเวิ้งว้างอันไกลโพ้น" id="personal-description" defaultValue={userData.data.description}></textarea>
                                                <label htmlFor="personal-description">คำอธิบาย</label>
                                            </div>
                                            <p className="text-warning" id="personal-basic-info-validation"></p>
                                            <div className="hstack gap-3">
                                                <button type="button" className="btn btn-primary w-100 account-content-tab-button" onClick={
                                                    () => {
                                                        const auth = getAuth()
                                                        const db = getDatabase()

                                                        const inputUsername = document.getElementById('personal-username')
                                                        const inputDescription = document.getElementById('personal-description')
                                                        const inputGender = document.getElementById('personal-gender')

                                                        const validationBasicInfo = document.getElementById('personal-basic-info-validation')

                                                        validationBasicInfo.innerText = ''

                                                        if (inputUsername.value.length >= inputUsername.maxLength) return validationBasicInfo.innerText = 'ชื่อเล่นไม่สามารถตั้งได้มากกว่า ' + inputUsername.maxLength + ' ตัวอักษร'
                                                        if (inputDescription.value.length >= inputDescription.maxLength) return validationBasicInfo.innerText = 'คำอธิบานไม่สามารถตั้งได้มากกว่า ' + inputDescription.maxLength + ' ตัวอักษร'

                                                        setPersonalLabel('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> บันทึก')
                                                        setPersonalLabelDisabled(true)

                                                        onAuthStateChanged(auth, (user) => {
                                                            if (user) {
                                                                const dbRef = databaseRef(db, 'data/users/' + user.uid)

                                                                updateDB(dbRef, {
                                                                    description: inputDescription.value,
                                                                    gender: inputGender.value
                                                                }).then(() => {
                                                                    updateProfile(auth.currentUser, {
                                                                        displayName: inputUsername.value
                                                                    }).then(() => {
                                                                        setPersonalLabel('<i class="bi bi-check-circle"></i> บันทึก')
                                                                        setPersonalLabelDisabled(false)

                                                                        setTimeout(() => {
                                                                            setPersonalLabel('บันทึก')
                                                                            setPersonalLabelDisabled(false)
                                                                        }, 3000)
                                                                    }).catch(() => {
                                                                        setPersonalLabel('<i class="bi bi-x-circle"></i> บันทึก')
                                                                        setPersonalLabelDisabled(false)

                                                                        setTimeout(() => {
                                                                            setPersonalLabel('บันทึก')
                                                                            setPersonalLabelDisabled(false)
                                                                        }, 3000)
                                                                    })
                                                                }).catch(() => {
                                                                    setPersonalLabel('<i class="bi bi-x-circle"></i> บันทึก')
                                                                    setPersonalLabelDisabled(false)

                                                                    setTimeout(() => {
                                                                        setPersonalLabel('บันทึก')
                                                                        setPersonalLabelDisabled(false)
                                                                    }, 3000)
                                                                })
                                                            }
                                                        })
                                                    }
                                                } disabled={personalLabelDisabled} dangerouslySetInnerHTML={{ __html: personalLabel }}></button>
                                                <div className="vr"></div>
                                                <button type="button" className="btn btn-outline-secondary w-100 account-content-tab-button" onClick={
                                                    () => {
                                                        const inputUsername = document.getElementById('personal-username')
                                                        const inputGender = document.getElementById('personal-gender')
                                                        const inputDescription = document.getElementById('personal-description')

                                                        inputUsername.value = ""
                                                        inputGender.value = "unspecified"
                                                        inputDescription.value = ""
                                                    }
                                                } disabled={personalLabelDisabled}>ตั้งใหม่</button>
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
                            <h2><i className="bi bi-key"></i> ข้อมูลการเข้าสู่ระบบ</h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="row mb-2">
                            <label htmlFor="personal-email" className="col-sm-2 col-form-label">ที่อยู่อีเมล</label>
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
                            <label htmlFor="personal-email" className="col-sm-2 col-form-label">ระดับสิทธิ์</label>
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
                        <div className="row mb-3">
                            <label htmlFor="personal-password" className="col-sm-2 col-form-label">รหัสผ่าน</label>
                            {
                                userData ? (
                                    <div className="col-sm-10">
                                        <input type="password" readOnly className="form-control-plaintext" id="personal-password" value="----------" />
                                    </div>
                                ) : (
                                    <div className="placeholder-glow col-sm-10">
                                        <span className="placeholder w-100"></span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <label htmlFor="personal-uid" className="col-sm-2 col-form-label">รหัสประจำตัว</label>
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
                                <button type="button" className="btn btn-primary account-content-tab-button" onClick={
                                    (event) => {
                                        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> คัดลอก'

                                        const inputUid = document.getElementById('personal-uid')

                                        inputUid.select()
                                        inputUid.setSelectionRange(0, 99999)

                                        navigator.clipboard.writeText(inputUid.value);

                                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> คัดลอกรหัส'
                                        setTimeout(() => {
                                            event.target.innerHTML = 'คัดลอกรหัส'
                                        }, 3000)
                                    }
                                } disabled={userData && userData.user.uid ? false : true}>คัดลอกรหัส</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
