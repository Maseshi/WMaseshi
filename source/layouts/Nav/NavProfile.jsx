import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Dropdown, Spinner, Form, Button, Image, Placeholder } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signOut } from 'firebase/auth'

import AuthProviders from '@/components/AuthProviders'

import ThemeContext from '@/contexts/ThemeContext'

import { auth } from '@/services/firebase'

import styles from '@/styles/Nav.module.css'

export default function HeaderProfile({ currentUser, isLoading }) {
    const { t } = useTranslation('translation', { keyPrefix: 'layouts.Nav.NavProfile' })
    const { theme, setTheme } = useContext(ThemeContext)

    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark'

        setTheme(isCurrentDark ? 'light' : 'dark')
        document.documentElement.dataset.bsTheme = isCurrentDark ? 'light' : 'dark'
        localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark')
    }
    const handleLogout = () => {
        try {
            signOut(auth)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                className={`${styles["profile-button"]} rounded-circle border`}
                variant={theme}
                id="dropdownProfile"
                aria-label="Profile button"
            >
                {
                    isLoading ? (
                        <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        currentUser && currentUser.photoURL ? (
                            <Image
                                roundedCircle
                                src={currentUser && currentUser.photoURL}
                                alt="User Profile"
                                width="30px"
                                height="30px"
                                loading="lazy"
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        )
                    )
                }
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["profile-dropdown"] + " rounded-4"} align={{ xs: 'start' }}>
                {
                    isLoading ? (
                        <>
                            <Placeholder
                                as={Dropdown.Header}
                                animation="glow"
                            >
                                <Placeholder className="rounded-2" xs={3} />
                            </Placeholder>
                            <Dropdown.Divider className="mt-0" />
                            {
                                Array.from({ length: 4 }, (__, index) => {
                                    return (
                                        <Placeholder
                                            as={Dropdown.Item}
                                            animation="glow"
                                            key={index}
                                        >
                                            <Placeholder className="rounded-2" xs={12} />
                                        </Placeholder>
                                    )
                                })
                            }
                        </>
                    ) : (
                        currentUser ? (
                            <>
                                <Dropdown.Header
                                    className={`${styles['profile-header']} d-flex flex-column align-items-center justify-content-center`}
                                >
                                    <i className="bi bi-circle display-4" />
                                    <span>
                                        {
                                            currentUser.displayName ? (
                                                currentUser.displayName
                                            ) : (
                                                t('user')
                                            )
                                        }
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Divider className="mt-0" />
                                <Dropdown.Item as={Link} to="/account?tab=personal">
                                    {t('personal')}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/account?tab=security">
                                    {t('security')}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/account?tab=privacy">
                                    {t('privacy')}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/account?tab=settings">
                                    {t('settings')}
                                </Dropdown.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown.Header>
                                    {t('manage_account')}
                                </Dropdown.Header>
                                <Form className="px-4 py-3">
                                    <div className="d-grid gap-2 mb-3">
                                        <Button as={Link} variant="primary" to="/account/sign-in">
                                            <i className="bi bi-box-arrow-in-right" /> {t('sign_in')}
                                        </Button>
                                        <Button as={Link} variant="primary" to="/account/register">
                                            <i className="bi bi-plus-circle" /> {t('register')}
                                        </Button>
                                    </div>
                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <hr />
                                                </td>
                                                <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                                    {t('or')}
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
                                        <Link to="/privacy-policy">
                                            {t('privacy_policy')}
                                        </Link>
                                        {' '}&bull;{' '}
                                        <Link to="/terms-of-service">
                                            {t('terms_of_services')}
                                        </Link>
                                    </div>
                                </Form>
                            </>
                        )
                    )
                }
                <Dropdown.Divider />
                <Dropdown.Header>
                    {t('customize')}
                </Dropdown.Header>
                <Form className="px-3 mb-3">
                    <Form.Check
                        type="switch"
                        id="profileTheme"
                        label={t('dark_mode')}
                        checked={theme === 'dark'}
                        onChange={handleThemeChange}
                    />
                </Form>
                {
                    isLoading ? (
                        ''
                    ) : (
                        currentUser ? (
                            <>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Button} className="text-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-left" /> {t('log_out')}
                                </Dropdown.Item>
                            </>
                        ) : (
                            ''
                        )
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
HeaderProfile.propTypes = {
    currentUser: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool
}
