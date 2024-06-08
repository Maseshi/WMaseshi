import { useState, useContext } from 'react'
import { Badge, Nav, Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import AuthContext from '@/contexts/AuthContext'

import { auth } from '@/services/firebase'

export default function AccountNavbar() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountNavbar' })
    const { currentUser, isLoading } = useContext(AuthContext)
    const [, setSearchParams] = useSearchParams()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const menuTabs = [
        { key: 'personal', title: (<><i className="bi bi-journal-richtext" />{' '}{t('personal')}</>), disabled: false },
        { key: 'security', title: (<><i className="bi bi-shield-lock" />{' '}{t('security')}</>), disabled: false },
        { key: 'notification', title: (<><i className="bi bi-bell" />{' '}{t('notification')}</>), disabled: true },
        { key: 'privacy', title: (<><i className="bi bi-person-lock" />{' '}{t('privacy')}</>), disabled: false },
        { key: 'settings', title: (<><i className="bi bi-gear" />{' '}{t('settings')}</>), disabled: false }
    ]

    const handleSignOut = async () => {
        setIsSigningOut(true)

        try {
            await signOut(auth)
        } catch (error) {
            setIsSigningOut(false)
            throw new Error(error)
        }

        setIsSigningOut(false)
    }

    return (
        <>
            <strong>
                <h1>
                    <span className="text-primary">
                        {
                            i18n.language === 'en' ? (
                                t('account')
                            ) : (
                                t('center')
                            )
                        }
                    </span>
                    {
                        i18n.language === 'en' ? (
                            ''
                        ) : (
                            t('account')
                        )
                    }
                    {' '}
                    <Badge pill bg="info" style={{ fontSize: 'small', verticalAlign: 'top' }}>
                        {t('beta')}
                    </Badge>
                </h1>
                <p>
                    👋{' '}{t('hi')}
                    <span className="text-truncate">
                        {currentUser ? `, ${t('you')} ${currentUser.displayName ?? t('user')}` : ''}
                    </span>!
                </p>
            </strong>
            <br />
            <br />
            <Nav
                className="flex-column w-100"
                variant="pills"
            >
                {
                    menuTabs.map((data, index) => {
                        return (
                            <Nav.Item key={index}>
                                <Nav.Link
                                    className="rounded-4"
                                    eventKey={data.key}
                                    disabled={data.disabled}
                                    onClick={() => setSearchParams({ 'tab': data.key })}
                                >
                                    {data.title}
                                </Nav.Link>
                            </Nav.Item>
                        )
                    })
                }
            </Nav>
            <hr />
            <Button
                className="text-start border-0 w-100"
                variant="outline-danger"
                disabled={isLoading || isSigningOut}
                onClick={() => handleSignOut}
            >
                {
                    isSigningOut ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <i className="bi bi-box-arrow-left" />
                    )
                }
                {' '}
                {t('sign_out')}
            </Button>
        </>
    )
}
