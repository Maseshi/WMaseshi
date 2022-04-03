import { useState } from 'react'
import { getAuth, deleteUser } from 'firebase/auth'
import { getDatabase, ref, remove } from 'firebase/database'
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage"

export default function Settings(props) {
    const [lang, setLang] = useState('th')
    const [deleteAccountLabel, setDeleteAccountLabel] = useState('ลบบัญชีนี้อย่างถาวร')
    const [deleteAccountError, setDeleteAccountError] = useState('')

    const userData = props.userData
    const verify = props.verify

    return (
        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
            <div className="account-content-tab-title">
                <h1>การตั้งค่า</h1>
                <p>ตั้งค่าบัญชีของคุณเพื่อให้ตรงกับความต้องการของคุณ</p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card account-content-tab-card mb-3">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2><i className="bi bi-gear"></i> การตั้งค่าทั่วไป</h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <select className="form-select w-auto" value={lang} onChange={(event) => setLang(event.target.value)} aria-label="Language options">
                                    <option value="language" disabled>ภาษา</option>
                                    <option value="th">ไทย</option>
                                    <option value="en" disabled>English</option>
                                </select>
                                <div>
                                    <span>ภาษาของเว็บไซต์</span>
                                    <br />
                                    <p className="text-secondary m-0">เปลี่ยนภาษาของเว็บไซต์ให้ตรงกับภาษาของคุณ จะช่วยให้คุณเข้าใจเนื้อหาได้ง่ายกว่า</p>
                                </div>
                            </div>
                        </div>
                        <div className="card account-content-tab-card">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    <input className="form-check-input" type="checkbox" role="switch" id="settings-dark-mode" disabled />
                                    <label className="form-check-label" htmlFor="settings-dark-mode">โหมดตอนกลางคืน</label>
                                    <p className="text-secondary m-0">เปลี่ยนธีมของเว็บไซต์นี้เป็นสีมืดหลังจากเปิดใช้งาน ซึ่งจะช่วยให้สบายตามากยิ่งขึ้น</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2><i className="bi bi-file-earmark-person"></i> จัดการบัญชี</h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card">
                            <div className="card-body">
                                <h5 className="card-title">ลบบัญชีและบริการ</h5>
                                <p className="card-content">หากคุณไม่ได้ใช้งานบัญชีนี้แล้วคุณสามารถลบบัญชีของคุณได้ ซึ่งจะเป็นการลบข้อมูลของคุณทั้งหมดอย่างถาวรและจะไม่สามารถกู้คืนกลับมาได้อีกครั้ง โปรดพิจารณาอีกครั้งสำหรับการดำเนินการลบบัญชีของคุณ</p>
                                <button type="button" className="btn btn-danger account-content-tab-button" onClick={
                                    (event) => {
                                        const auth = getAuth()
                                        const database = getDatabase()
                                        const storage = getStorage()
                                        const user = auth.currentUser
                                        const dbRef = ref(database, 'data/users/' + user.uid)
                                        const stRef = storageRef(storage, 'users/' + user.uid)
                                        const element = document.getElementById('verifyChangeModal')

                                        setDeleteAccountLabel('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ลบบัญชีนี้อย่างถาวร')
                                        event.target.disabled = true

                                        element.addEventListener('hidden.bs.modal', () => {
                                            if (verify === 0) {
                                                setDeleteAccountLabel('ลบบัญชีนี้อย่างถาวร')
                                                event.target.disabled = false
                                            }
                                            if (verify === 1) {
                                                deleteUser(user).then(() => {
                                                    remove(dbRef).then(() => {
                                                        deleteObject(stRef).then(() => {
                                                            event.target.disabled = false
                                                            setDeleteAccountLabel('<i class="bi bi-check-circle"></i> ลบบัญชีนี้อย่างถาวร')
                                                            setTimeout(() => {
                                                                setDeleteAccountLabel('ลบบัญชีนี้อย่างถาวร')
                                                            }, 3000)
                                                        })
                                                    })
                                                }).catch((error) => {
                                                    setDeleteAccountLabel('<i class="bi bi-x-circle"></i> ลบบัญชีนี้อย่างถาวร')
                                                    setDeleteAccountError('ไม่สามารถลบบัญชีนี้อย่างถาวรได้ ข้อผิดพลาด: ' + error.message)
                                                });
                                            }
                                        })
                                    }
                                } disabled={userData && userData.user.email ? false : true} data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: deleteAccountLabel }}></button>
                                {deleteAccountError ? <p className="text-danger fs-6 mb-0 mt-1">{deleteAccountError}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
