import { useState, useEffect } from 'react'
import { getDatabase, ref as databaseRef, update as updateDB } from "firebase/database"
import { getAuth, onAuthStateChanged } from "firebase/auth"

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
                <h1>ความเป็นส่วนตัว</h1>
                <p>รักษาความเป็นส่วนตัวของคุณและเลือกที่จะยอมรับข้อตกลงต่างๆ ของเรา</p>
            </div>
            <br />
            <div className="account-content-tab-content">

                <div className="card account-content-tab-card">
                    <div className="card-body">
                        <div className="account-content-tab-content-title">
                            <h2><i className="bi bi-bookmark-star"></i> ข้อตกลง</h2>
                        </div>
                        <hr className="account-content-tab-content-horizon" />
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    {
                                        userData && userData.data && userData.data.rule.pp ? (
                                            <input className="form-check-input" type="checkbox" role="switch" id="privacy-pp" onChange={
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
                                            } checked={ pp } />
                                        ) : (
                                            <input className="form-check-input" type="checkbox" role="switch" id="privacy-pp" disabled checked />
                                        )
                                    }
                                    <label className="form-check-label" htmlFor="privacy-pp">นโยบายความเป็นส่วนตัว</label>
                                </div>
                                <a className="ml-auto" href="/privacy-policy">อ่าน</a>
                            </div>
                        </div>
                        <div className="card account-content-tab-card mb-3">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    {
                                        userData && userData.data && userData.data.rule.tos ? (
                                            <input className="form-check-input" type="checkbox" role="switch" id="privacy-tos" onChange={
                                                (event) => {
                                                    const auth = getAuth()
                                                    const db = getDatabase()
    
                                                    event.target.disabled = true
                                                    setTos(event.target.checked)
                                                    event.target.checked = tos
    
                                                    onAuthStateChanged(auth, (user) => {
                                                        if (user) {
                                                            const dbRef = databaseRef(db, 'data/users/' + user.uid + '/rule')
    
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
                                            } checked={ tos } />
                                        ) : (
                                            <input className="form-check-input" type="checkbox" role="switch" id="privacy-tos" disabled checked />
                                        )
                                    }
                                    <label className="form-check-label" htmlFor="privacy-tos">เงื่อนไขการให้บริการ</label>
                                </div>
                                <a className="ml-auto" href="/terms-of-service">อ่าน</a>
                            </div>
                        </div>
                        <div className="card account-content-tab-card">
                            <div className="card-body hstack gap-3">
                                <div className="form-check form-switch me-auto">
                                    <input className="form-check-input" type="checkbox" role="switch" id="privacy-tos" checked disabled />
                                    <label className="form-check-label" htmlFor="privacy-tos">นโยบายคุกกี้</label>
                                    <p className="text-secondary m-0">เมื่อคุณเข้าชมหรือใช้งานเว็บไซต์นี้ จะเริ่มมีการรวมรวบข้อมูลผ่านคุกกี้ทันทีและเทคโนโลยีติดตามอื่นๆ เพื่อที่จะระบุตัวตนหรือเก็บข้อมูลในเบราว์เซอร์ของคุณให้ทำงานได้อย่างถูกต้องและมีประสิทธิภาพสูงสุด ดังนั้นคุกกี้จึงมีความจำเป็นอย่างมากสำหรับเว็บไซต์ เราจึงไม่สามารถให้การตั้งค่านี้ได้เพื่อให้เว็บไซต์ยังคงทำงานได้อย่างถูกต้อง</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
