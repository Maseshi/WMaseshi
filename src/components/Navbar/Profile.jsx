import { Component } from 'react'
import { isMobile } from 'react-device-detect'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const auth = getAuth()
        signOut(auth).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({
                    currentUser: user
                })
            } else {
                this.setState({
                    currentUser: null
                })
            }
        })
    }

    render() {
        return (
            <span className="navbar-text text-center">
                <div className="navbar-profile">
                    {
                        this.state.currentUser ? (
                            <div className="dropdown">
                                <button type="button" className="btn btn-navbar-profile" id="authDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {
                                        this.state.currentUser.photoURL ? (
                                            <img src={this.state.currentUser.photoURL} alt="" width="40px" height="40px" />
                                        ) : (
                                            <i className="bi bi-person-circle"></i>
                                        )
                                    }
                                </button>
                                <ul className={isMobile ? "dropdown-menu dropdown-menu-start" : "dropdown-menu dropdown-menu-end"} aria-labelledby="authDropdown">
                                    <li>
                                        <h6 className="dropdown-header">
                                            {
                                                this.state.currentUser.displayName ? (
                                                    this.state.currentUser.displayName
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
                                    <div className="px-3">
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">โหมดตอนกลางคืน</label>
                                        </div>
                                    </div>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={this.handleLogout}>
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
                    }
                </div>
            </span>
        )
    }
}