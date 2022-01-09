import React, { Component } from 'react'
import { getDatabase, ref as databaseRef, update as updateDB, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default class Personal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoURL: '',
            displayName: '',
            defaultGender: 'unspecified',
            gender: 'unspecified',
            description: '',
            email: '',
            uid: '',

            personalLabel: 'บันทึก',
            personalLabelDisabled: false
        }
    }

    componentDidMount() {
        const auth = getAuth()
        const db = getDatabase()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const photoURL = user.photoURL
                const displayName = user.displayName
                const email = user.email
                const uid = user.uid

                this.setState({
                    photoURL: photoURL || '',
                    displayName: displayName || '',
                    email: email || '',
                    uid: uid || ''
                })

                const dbRef = databaseRef(db, 'data/users/' + user.uid)

                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val()
                    const gender = data.gender
                    const description = data.description

                    this.setState({
                        defaultGender: gender || 'unspecified',
                        gender: gender || 'unspecified',
                        description: description || ''
                    })
                })
            } else {
                this.setState({
                    photoURL: '',
                    displayName: '',
                    defaultGender: 'unspecified',
                    gender: 'unspecified',
                    description: '',
                    email: '',
                    uid: ''
                })
            }
        })
    }

    resizeImage = (settings) => {
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

    render() {
        return (
            <div className="tab-pane fade" id="v-pills-personal" role="tabpanel" aria-labelledby="v-pills-personal-tab">
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
                            <hr />
                            <div className="row">
                                {
                                    this.state.photoURL ? (
                                        <>
                                            <div className="col-md-3 align-self-center text-center">
                                                <div className="account-content-tab-content-profile-upload">
                                                    <input type="file" ref={input => this.inputElement = input} id="personal-input-photo-reset" onChange={
                                                        async (event) => {
                                                            const auth = getAuth();
                                                            const storage = getStorage();
                                                            const storageRef = ref(storage, 'users/' + auth.currentUser.uid + '/avatar');
                                                            const resetBtn = document.getElementById('personal-btn-photo-reset')
                                                            const uploadBtn = document.getElementById('personal-btn-photo-upload')
                                                            const resizedImage = await this.resizeImage({
                                                                "file": event.target.files[0],
                                                                "maxSize": 200
                                                            });

                                                            resetBtn.disabled = true
                                                            uploadBtn.disabled = true
                                                            event.target.disabled = true
                                                            uploadBytes(storageRef, resizedImage).then(() => {
                                                                getDownloadURL(storageRef)
                                                                    .then((url) => {
                                                                        updateProfile(auth.currentUser, {
                                                                            photoURL: url
                                                                        }).then(() => {
                                                                            this.setState({
                                                                                photoURL: url
                                                                            })
                                                                            resetBtn.disabled = false
                                                                            uploadBtn.disabled = false
                                                                            event.target.disabled = false
                                                                        })
                                                                    });
                                                            });
                                                        }
                                                    } accept="image/*" />
                                                    <button type="button" className="btn account-content-tab-content-profile-upload" id="personal-btn-photo-upload" style={this.state.photoURL ? { padding: 0 } : null} onClick={() => this.inputElement.click()}>
                                                        {
                                                            this.state.photoURL ? (
                                                                <img src={this.state.photoURL} alt="" width="120px" height="120px" />
                                                            ) : (
                                                                <i className="bi bi-plus"></i>
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                                <br />
                                                {
                                                    this.state.photoURL ? (
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
                                                                        this.setState({
                                                                            photoURL: ''
                                                                        })
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
                                                            <input type="text" className="form-control account-content-tab-input" id="personal-username" placeholder="ผู้ใช้" maxLength="20" defaultValue={this.state.displayName} />
                                                            <label htmlFor="personal-username">นามแฝงหรือชื่อเล่น</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md">
                                                        <div className="form-floating">
                                                            <select className="form-select account-content-tab-input" id="personal-gender" value={this.state.gender} onChange={
                                                                async (event) => {
                                                                    await this.setState({
                                                                        gender: event.target.value
                                                                    })
                                                                    event.target.value = this.state.gender
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
                                                    <textarea className="form-control account-content-tab-input h-100" rows="5" style={{ resize: "none" }} maxLength="256" placeholder="สู่ความเวิ้งว้างอันไกลโพ้น" id="personal-description" defaultValue={this.state.description}></textarea>
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

                                                            this.setState({
                                                                personalLabel: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> บันทึก',
                                                                personalLabelDisabled: true
                                                            })

                                                            onAuthStateChanged(auth, (user) => {
                                                                if (user) {
                                                                    const dbRef = databaseRef(db, 'data/users/' + user.uid)

                                                                    updateDB(dbRef, {
                                                                        description: inputDescription.value,
                                                                        gender: inputGender.value
                                                                    }).then(() => {
                                                                        updateProfile(auth.currentUser, {
                                                                            displayName: inputUsername.value
                                                                        }).then(async () => {
                                                                            await this.setState({
                                                                                personalLabel: '<i class="bi bi-check-circle"></i> บันทึก',
                                                                                personalLabelDisabled: false
                                                                            })

                                                                            setTimeout(() => {
                                                                                this.setState({
                                                                                    personalLabel: 'บันทึก',
                                                                                    personalLabelDisabled: false
                                                                                })
                                                                            }, 3000)
                                                                        }).catch(async () => {
                                                                            await this.setState({
                                                                                personalLabel: '<i class="bi bi-x-circle"></i> บันทึก',
                                                                                personalLabelDisabled: false
                                                                            })

                                                                            setTimeout(() => {
                                                                                this.setState({
                                                                                    personalLabel: 'บันทึก',
                                                                                    personalLabelDisabled: false
                                                                                })
                                                                            }, 3000)
                                                                        })
                                                                    }).catch(async () => {
                                                                        await this.setState({
                                                                            personalLabel: '<i class="bi bi-x-circle"></i> บันทึก',
                                                                            personalLabelDisabled: false
                                                                        })

                                                                        setTimeout(() => {
                                                                            this.setState({
                                                                                personalLabel: 'บันทึก',
                                                                                personalLabelDisabled: false
                                                                            })
                                                                        }, 3000)
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    } disabled={this.state.personalLabelDisabled} dangerouslySetInnerHTML={{ __html: this.state.personalLabel }}></button>
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
                                                    } disabled={this.state.personalLabelDisabled}>ตั้งใหม่</button>
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
                            <hr />
                            <div className="row mb-2">
                                <label htmlFor="personal-email" className="col-sm-2 col-form-label">ที่อยู่อีเมล</label>
                                {
                                    this.state.email ? (
                                        <div className="col-sm-10">
                                            <input type="email" readOnly className="form-control-plaintext" id="personal-email" value={this.state.email} />
                                        </div>
                                    ) : (
                                        <div className="placeholder-glow col-sm-10">
                                            <span className="placeholder w-100"></span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="row mb-2">
                                <label htmlFor="personal-password" className="col-sm-2 col-form-label">รหัสผ่าน</label>
                                {
                                    this.state.email ? (
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
                            <div className="row mb-3">
                                <label htmlFor="personal-uid" className="col-sm-2 col-form-label">รหัสประจำตัว</label>
                                {
                                    this.state.uid ? (
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" id="personal-uid" value={this.state.uid} />
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

                                            event.target.innerHTML = '<i class="bi bi-check-circle"></i> คัดลอก'
                                            setTimeout(() => {
                                                event.target.innerHTML = 'คัดลอก'
                                            }, 3000)
                                        }
                                    } disabled={this.state.uid ? false : true}>คัดลอก</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
