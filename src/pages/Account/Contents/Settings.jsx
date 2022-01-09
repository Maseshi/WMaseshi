import React, { Component } from 'react'
import {
    getAuth,
    onAuthStateChanged,
    deleteUser
} from 'firebase/auth'

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            deleteAccountLabel: 'ลบบัญชีนี้อย่างถาวร',
            deleteAccountError: ''
        }
    }

    componentDidMount() {
        const auth = getAuth()
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email

                this.setState({
                    email: email || ''
                })
            }
        })
    }

    render() {
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
                            <hr />
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
                            <hr />
                            <div className="card account-content-tab-card">
                                <div className="card-body">
                                    <h5 className="card-title">ลบบัญชีและบริการ</h5>
                                    <p className="card-content">หากคุณไม่ได้ใช้งานบัญชีนี้แล้วคุณสามารถลบบัญชีของคุณได้ ซึ่งจะเป็นการลบข้อมูลของคุณทั้งหมดอย่างถาวรและจะไม่สามารถกู้คืนกลับมาได้อีกครั้ง โปรดพิจารณาอีกครั้งสำหรับการดำเนินการลบบัญชีของคุณ</p>
                                    <button type="button" className="btn btn-danger account-content-tab-button" onClick={
                                        (event) => {
                                            const auth = getAuth()
                                            const user = auth.currentUser
                                            const element = document.getElementById('verifyChangeModal')

                                            this.setState({
                                                deleteAccountLabel: '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> ลบบัญชีนี้อย่างถาวร',
                                            })

                                            event.target.disabled = true

                                            element.addEventListener('hidden.bs.modal', () => {
                                                if (this.props.verify === 0) {
                                                    this.setState({
                                                        deleteAccountLabel: 'ลบบัญชีนี้อย่างถาวร'
                                                    })
                                                    event.target.disabled = false
                                                }
                                                if (this.props.verify === 1) {
                                                    deleteUser(user).then(() => {
                                                        event.target.disabled = false
                                                        this.setState({
                                                            deleteAccountLabel: '<i class="bi bi-check-circle"></i> ลบบัญชีนี้อย่างถาวร'
                                                        })
                                                        setTimeout(() => {
                                                            this.setState({
                                                                deleteAccountLabel: 'ลบบัญชีนี้อย่างถาวร'
                                                            })
                                                        }, 3000)
                                                    }).catch((error) => {
                                                        this.setState({
                                                            deleteAccountLabel: '<i class="bi bi-x-circle"></i> ลบบัญชีนี้อย่างถาวร',
                                                            deleteAccountError: 'ไม่สามารถลบบัญชีนี้อย่างถาวรได้ ข้อผิดพลาด: ' + error.message
                                                        })
                                                    });
                                                }
                                            })
                                        }
                                    } disabled={this.state.email ? false : true} data-bs-toggle="modal" data-bs-target="#verifyChangeModal" dangerouslySetInnerHTML={{ __html: this.state.deleteAccountLabel }}></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
