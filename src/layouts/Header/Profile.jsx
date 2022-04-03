import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'

export default function Profile(props) {
    const [langSelection, setLangSelection] = useState('th')

    const loaded = props.loaded
    const user = props.user

    const handleLogout = () => {
        const auth = getAuth()

        signOut(auth).catch((error) => {
            console.log(error)
        })
    }

    return (
        <span className="navbar-text text-center">
            <div className="navbar-profile">
                {
                    loaded ? (
                        user ? (
                            <div className="dropdown">
                                <button type="button" className="btn btn-navbar-profile" id="authDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {
                                        user.photoURL ? (
                                            <img src={user.photoURL} alt="" width="40px" height="40px" />
                                        ) : (
                                            <i className="bi bi-person-circle"></i>
                                        )
                                    }
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="authDropdown">
                                    <li>
                                        <h6 className="dropdown-header">
                                            {
                                                user.displayName ? (
                                                    user.displayName
                                                ) : (
                                                    "ผู้ใช้งาน"
                                                )
                                            }
                                        </h6>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/account?tab=personal">ข้อมูลส่วนตัว</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/account?tab=security">ความปลอดภัย</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/account?tab=privacy">ความเป็นส่วนตัว</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/account?tab=settings">การตั้งค่า</a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <h6 className="dropdown-header">ปรับแต่ง</h6>
                                    </li>
                                    <div className="px-3 mb-3">
                                        <select className="form-select" value={langSelection} onChange={(event) => setLangSelection(event.target.value)} aria-label="Language options">
                                            <option value="language" disabled>ภาษา</option>
                                            <option value="th">ไทย</option>
                                            <option value="en" disabled>English</option>
                                        </select>
                                    </div>
                                    <div className="px-3 mb-3">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">โหมดตอนกลางคืน</label>
                                        </div>
                                    </div>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={() => handleLogout()}>
                                            <i className="bi bi-box-arrow-left"></i> ออกจากระบบ
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <button type="button" className="btn btn-navbar-profile" data-bs-toggle="modal" data-bs-target="#signInModal">
                                <i className="bi bi-person-circle"></i>
                            </button>
                        )
                    ) : (
                        <div className="spinner-border text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )
                }
            </div>
        </span>
    )
}