import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

import Providers from '../../components/Authentication/Providers'

import { translator } from '../../utils/functions/translator'

export default function HeaderProfile({ loaded, userData }) {
    const handleLogout = () => {
        const auth = getAuth()

        signOut(auth).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="navbar-profile">
            {
                loaded ? (
                    <div className="dropdown">
                        <button type="button" className="navbar-profile-button" data-bs-toggle="dropdown" aria-expanded="false">
                            {
                                userData && userData.photoURL ? (
                                    <img src={userData.photoURL} alt="User Profile" width="40px" height="40px" />
                                ) : (
                                    <i className="bi bi-person-circle"></i>
                                )
                            }
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" style={{ margin: 0 }}>
                            {
                                userData ? (
                                    <>
                                        <li>
                                            <h6 className="dropdown-header">
                                                {
                                                    userData.displayName ? (
                                                        userData.displayName
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
                                                {translator().translate.layouts.Header.HeaderProfile.manage_account}
                                            </h6>
                                        </li>
                                        <form className="px-4 py-3">
                                            <div className="d-grid gap-2 mb-3">
                                                <button type="button" className="navbar-button btn btn-primary" id="signInModalHeaderButton" data-bs-toggle="modal" data-bs-target="#signInModal">
                                                    <i className="bi bi-box-arrow-in-right"></i> {translator().translate.layouts.Header.HeaderProfile.sign_in}
                                                </button>
                                                <button type="button" className="navbar-button btn btn-primary" id="registerModalHeaderButton" data-bs-toggle="modal" data-bs-target="#registerModal">
                                                    <i className="bi bi-plus-circle"></i> {translator().translate.layouts.Header.HeaderProfile.register}
                                                </button>
                                            </div>
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <hr />
                                                        </td>
                                                        <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                                            {translator().translate.layouts.Header.HeaderProfile.or}
                                                        </td>
                                                        <td>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="text-center mb-3">
                                                <Providers />
                                            </div>
                                            <div className="text-center">
                                                <Link to="/privacy-policy">{translator().translate.layouts.Header.HeaderProfile.privacy_policy}</Link> &bull; <Link to="/terms-of-service">{translator().translate.layouts.Header.HeaderProfile.terms_of_services}</Link>
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
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                        {translator().translate.layouts.Header.HeaderProfile.dark_mode}
                                    </label>
                                </div>
                            </div>
                            {
                                userData ? (
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