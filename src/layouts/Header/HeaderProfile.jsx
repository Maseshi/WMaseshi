import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

import AuthProviders from '../../components/Authentication/AuthProviders'

import { setCookie } from '../../utils/functions/setCookie'
import { translator } from '../../utils/functions/translator'

import config from '../../configs/data'

export default function HeaderProfile(props) {
    const [firstClick, setFirstClick] = useState(false)
    const [languageSelection, setLanguageSelection] = useState(translator().code)

    const loadedProps = props.loaded
    const userDataProps = props.userData

    const handleLogout = () => {
        const auth = getAuth()

        signOut(auth).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="navbar-profile">
            {
                loadedProps ? (
                    <div className="dropdown">
                        <button
                            type="button"
                            className="navbar-profile-button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={
                                () => {
                                    const { Dropdown } = require('bootstrap')

                                    const dropdown = document.querySelector('.navbar-profile-button')
                                    const instance = Dropdown.getOrCreateInstance(dropdown)

                                    if (!firstClick) {
                                        setFirstClick(true)
                                        instance.hide()
                                    }

                                    instance.toggle()
                                }
                            }
                        >
                            {
                                userDataProps && userDataProps.photoURL ? (
                                    <img src={userDataProps.photoURL} alt="User Profile" width="40px" height="40px" />
                                ) : (
                                    <i className="bi bi-person-circle"></i>
                                )
                            }
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" style={{ margin: 0 }}>
                            {
                                userDataProps ? (
                                    <>
                                        <li>
                                            <h6 className="dropdown-header">
                                                {
                                                    userDataProps.displayName ? (
                                                        userDataProps.displayName
                                                    ) : (
                                                        translator().translate.layouts.Header.HeaderProfile.user
                                                    )
                                                }
                                            </h6>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/account?tab=personal">
                                                {translator().translate.layouts.Header.HeaderProfile.personal}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/account?tab=security">
                                                {translator().translate.layouts.Header.HeaderProfile.security}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/account?tab=privacy">
                                                {translator().translate.layouts.Header.HeaderProfile.privacy}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/account?tab=settings">
                                                {translator().translate.layouts.Header.HeaderProfile.settings}
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <h6 className="dropdown-header">
                                                จัดการบัญชี
                                            </h6>
                                        </li>
                                        <form className="px-4 py-3">
                                            <div className="d-grid gap-2 mb-3">
                                                <button type="button" className="navbar-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#signInModal">
                                                    <i className="bi bi-box-arrow-in-right"></i> ลงชื่อเข้าใช้
                                                </button>
                                                <button type="button" className="navbar-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerModal">
                                                    <i className="bi bi-plus-circle"></i> สร้างบัญชีใหม่
                                                </button>
                                            </div>
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <hr />
                                                        </td>
                                                        <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                                            หรือ
                                                        </td>
                                                        <td>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="text-center mb-3">
                                                <AuthProviders />
                                            </div>
                                            <div className="text-center">
                                                <Link to="/privacy-policy">นโยบายความเป็นส่วนตัว</Link> &bull; <Link to="/terms-of-service">เงื่อนไขการให้บริการ</Link>
                                            </div>
                                        </form>
                                    </>
                                )
                            }
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <h6 className="dropdown-header">
                                    {translator().translate.layouts.Header.HeaderProfile.customize}
                                </h6>
                            </li>
                            <div className="px-3 mb-3">
                                <div className="input-group">
                                    <div className="input-group-text">
                                        <i className="bi bi-translate"></i>
                                    </div>
                                    <select
                                        className="form-select"
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
                                </div>
                            </div>
                            <div className="px-3 mb-3">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                        {translator().translate.layouts.Header.HeaderProfile.dark_mode}
                                    </label>
                                </div>
                            </div>
                            {
                                userDataProps ? (
                                    <>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item text-danger" onClick={() => handleLogout()}>
                                                <i className="bi bi-box-arrow-left"></i> {translator().translate.layouts.Header.HeaderProfile.log_out}
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    ''
                                )
                            }
                        </ul>
                    </div>
                ) : (
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
            }
        </div>
    )
}