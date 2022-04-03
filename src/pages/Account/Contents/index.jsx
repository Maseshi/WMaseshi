import { useState } from 'react'
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth'

import Personal from './Personal'
import Security from './Security'
import Privacy from './Privacy'
import Settings from './Settings'

export default function Contents(props) {
    const [verify, setVerify] = useState(0)
    const [validateVerifyPasswordModal, setValidateVerifyPasswordModal] = useState()
    const [verifyPasswordModal, setVerifyPasswordModal] = useState('ยืนยัน')

    const userData = props.userData

    return (
        <div className="account-content" >
            <div className="tab-content" id="v-pills-tabContent">

                <Personal userData={userData} verify={verify} />
                <Security userData={userData} verify={verify} />
                <Privacy userData={userData} verify={verify} />
                <Settings userData={userData} verify={verify} />

            </div>
            <div className="modal fade" id="verifyChangeModal" tabIndex="-1" aria-labelledby="verifyChangeModalLabel" aria-hidden="true">
                <div className="account-modal-dialog modal-dialog modal-dialog-centered">
                    <div className="account-modal-content modal-content">
                        <div className="account-modal-header modal-header">
                            <h3 className="modal-title" id="verifyChangeModalLabel">ยืนยันการเปลี่ยนแปลง</h3>
                            <button type="button" className="account-modal-btn-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <hr className="account-modal-horizon" />
                        <div className="modal-body">
                            <p>กรุณาใส่รหัสผ่านปัจจุบันของคุณ เพื่อยืนยันการเปลี่ยนแปลงนี้</p>
                            <div className="form-floating">
                                <input type="password" className={validateVerifyPasswordModal ? 'form-control account-content-tab-input is-invalid' : 'form-control account-content-tab-input'} id="security-password-verify-modal" placeholder="รหัสผ่าน" aria-describedby="securityPasswordVerifyModalFeedback" />
                                <label htmlFor="security-password-verify-modal">รหัสผ่าน</label>
                                <div className="invalid-feedback" id="securityPasswordVerifyModalFeedback">{validateVerifyPasswordModal}</div>
                            </div>
                            <br />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="button" className="btn account-content-tab-button btn-secondary w-100" data-bs-dismiss="modal" id="verifyChangeCloseModal" aria-label="Close">ยกเลิก</button>
                                <button type="button" className="btn account-content-tab-button btn-primary w-100" onClick={
                                    () => {
                                        const auth = getAuth();
                                        const user = auth.currentUser;

                                        const email = user.email
                                        const password = document.getElementById('security-password-verify-modal')
                                        const credential = EmailAuthProvider.credential(email, password.value)

                                        setVerifyPasswordModal('<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ยืนยัน')
                                        setValidateVerifyPasswordModal('')

                                        if (password.value) {
                                            reauthenticateWithCredential(user, credential).then(() => {
                                                const element = document.getElementById('verifyChangeCloseModal')

                                                element.click()
                                                password.value = ''
                                                setVerifyPasswordModal('ยืนยัน')
                                                setVerify(1)
                                                element.addEventListener('hidden.bs.modal', () => {
                                                    setVerify(0)
                                                })
                                            }).catch((error) => {
                                                if (error.code === 'auth/wrong-password') {
                                                    setValidateVerifyPasswordModal('รหัสผ่านไม่ถูกต้อง')
                                                    setVerifyPasswordModal('<i class="bi bi-x-circle"></i> ยืนยัน')
                                                    setTimeout(() => {
                                                        setVerifyPasswordModal('ยืนยัน')
                                                    }, 3000)
                                                } else {
                                                    console.log(error)
                                                    setValidateVerifyPasswordModal('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ')
                                                    setVerifyPasswordModal('<i class="bi bi-x-circle"></i> ยืนยัน')
                                                    setTimeout(() => {
                                                        setVerifyPasswordModal('ยืนยัน')
                                                    }, 3000)
                                                }
                                            })
                                        } else {
                                            setValidateVerifyPasswordModal('กรุณากรอกรหัสผ่านเพื่อยืนยันตัวตน')
                                            setVerifyPasswordModal('<i class="bi bi-x-circle"></i> ยืนยัน')
                                            setTimeout(() => {
                                                setVerifyPasswordModal('ยืนยัน')
                                            }, 3000)
                                        }
                                    }
                                } dangerouslySetInnerHTML={{ __html: verifyPasswordModal }}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
