import { getAuth, signOut } from 'firebase/auth'

// Function
import { isMobile } from '../../utils/functions/isMobile'

export default function Navbar() {
    return (
        <div className="account-navbar mb-3">
            <nav className={isMobile() ? "nav nav-tabs nav-justified" : "nav flex-column nav-pills nav-fill"} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link" id="v-pills-personal-tab" onClick={
                    () => {
                        const url = new URL(window.location)
                        url.searchParams.set('tab', 'personal')
                        window.history.pushState({}, '', url)
                    }
                } data-bs-toggle="pill" data-bs-target="#v-pills-personal" type="button" role="tab" aria-controls="v-pills-personal" aria-selected="false"><i className="bi bi-journal-richtext"></i> ข้อมูลส่วนตัว</button>
                <button className="nav-link" id="v-pills-security-tab" onClick={
                    () => {
                        const url = new URL(window.location)
                        url.searchParams.set('tab', 'security')
                        window.history.pushState({}, '', url)
                    }
                } data-bs-toggle="pill" data-bs-target="#v-pills-security" type="button" role="tab" aria-controls="v-pills-security" aria-selected="false"><i className="bi bi-shield-shaded"></i> ความปลอดภัย</button>
                <button className="nav-link" id="v-pills-privacy-tab" onClick={
                    () => {
                        const url = new URL(window.location)
                        url.searchParams.set('tab', 'privacy')
                        window.history.pushState({}, '', url)
                    }
                } data-bs-toggle="pill" data-bs-target="#v-pills-privacy" type="button" role="tab" aria-controls="v-pills-privacy" aria-selected="false"><i className="bi bi-lock"></i> ความเป็นส่วนตัว</button>
                <button className="nav-link" id="v-pills-settings-tab" onClick={
                    () => {
                        const url = new URL(window.location)
                        url.searchParams.set('tab', 'settings')
                        window.history.pushState({}, '', url)
                    }
                } data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="bi bi-nut"></i> การตั้งค่า</button>
                {
                    isMobile() ? null : (
                        <>
                            <hr />
                            <button className="btn btn-outline-danger" id="v-pills-settings-tab" onClick={
                                () => {
                                    const auth = getAuth()
                                    signOut(auth).catch((error) => {
                                        console.log(error)
                                    })
                                }
                            }><i className="bi bi-box-arrow-left"></i> ออกจากระบบ</button>
                        </>
                    )
                }
            </nav>
        </div>
    )
}
