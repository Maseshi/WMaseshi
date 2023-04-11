import { useSearchParams } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

// Function
import { isMobile } from '../../utils/functions/isMobile'
import { translator } from '../../utils/functions/translator'

export default function Navbar({ tabs }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab')

    const handleLogout = () => {
        const auth = getAuth()

        signOut(auth).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="account-navbar mb-3">
            <nav
                className={isMobile() ? "nav nav-tabs nav-justified" : "nav flex-column nav-pills nav-fill"}
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <button
                    className={
                        tabParam ? (
                            tabParam === 'personal' ? (
                                'nav-link active'
                            ) : (
                                'nav-link'
                            )
                        ) : (
                            'nav-link active'
                        )
                    }
                    id="v-pills-personal-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-personal"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-personal"
                    aria-selected={
                        tabParam ? (
                            tabParam === 'personal' ? (
                                'true'
                            ) : (
                                'false'
                            )
                        ) : (
                            'false'
                        )
                    }
                    onClick={() => setSearchParams({ 'tab': 'personal' })}
                >
                    <i className="bi bi-journal-richtext"></i> {translator().translate.pages.Account.Navbar.personal}
                </button>
                <button
                    className={tabParam === 'security' ? 'nav-link active' : 'nav-link'}
                    id="v-pills-security-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-security"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-security"
                    aria-selected={tabParam === 'security' ? 'true' : 'false'}
                    onClick={() => setSearchParams({ 'tab': 'security' })}
                >
                    <i className="bi bi-shield-shaded"></i> {translator().translate.pages.Account.Navbar.security}
                </button>
                <button
                    className={tabParam === 'privacy' ? 'nav-link active' : 'nav-link'}
                    id="v-pills-privacy-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-privacy"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-privacy"
                    aria-selected={tabParam === 'privacy' ? 'true' : 'false'}
                    onClick={() => setSearchParams({ 'tab': 'privacy' })}
                >
                    <i className="bi bi-lock"></i> {translator().translate.pages.Account.Navbar.privacy}
                </button>
                <button
                    className={tabParam === 'settings' ? 'nav-link active' : 'nav-link'}
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected={tabParam === 'settings' ? 'true' : 'false'}
                    onClick={() => setSearchParams({ 'tab': 'settings' })}
                >
                    <i className="bi bi-nut"></i> {translator().translate.pages.Account.Navbar.settings}
                </button>
                {
                    isMobile() ? '' : (
                        <>
                            <hr />
                            <button className="btn btn-outline-danger" id="v-pills-settings-tab" onClick={() => handleLogout}>
                                <i className="bi bi-box-arrow-left"></i> {translator().translate.pages.Account.Navbar.log_out}
                            </button>
                        </>
                    )
                }
            </nav>
        </div>
    )
}
