import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Row, Col, Image, Placeholder, Badge, Button, Tab } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import AuthContext from '@/contexts/AuthContext'

import AccountEmpty from './AccountEmpty'
import AccountPersonal from './AccountPersonal'
import AccountSecurity from './AccountSecurity'
import AccountPrivacy from './AccountPrivacy'
import AccountSettings from './AccountSettings'

import styles from '@/styles/Account.module.css'

export default function AccountContent() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountContent' })
    const { currentUser, userData, isLoading } = useContext(AuthContext)
    const [, setSearchParams] = useSearchParams()

    return (
        <>
            <Card className={`${styles.profile} rounded-4 mb-3`}>
                <Card.Body as={Row}>
                    <Col className="text-center text-md-start" md="auto">
                        {
                            isLoading ? (
                                <Placeholder animation="glow">
                                    <Placeholder className="rounded-circle" style={{ width: '90px', height: '90px' }} />
                                </Placeholder>
                            ) : currentUser && currentUser.photoURL ? (
                                <Image
                                    roundedCircle
                                    src={currentUser.photoURL ?? null}
                                    alt={currentUser.displayName ?? t('profile_picture')}
                                    width="90px"
                                    height="90px"
                                    loading="lazy"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="90"
                                    height="90"
                                    fill="currentColor"
                                    className="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            )
                        }
                    </Col>
                    <Col className="text-center text-md-start">
                        {
                            isLoading ? (
                                <Placeholder as="h2" animation="glow">
                                    <Placeholder className="rounded-3" xs={3} />
                                </Placeholder>
                            ) : currentUser ? (
                                <h2 className="text-truncate">
                                    {currentUser.displayName ?? t('user')}
                                </h2>
                            ) : (
                                <h2 className="text-truncate">
                                    {t('user')}
                                </h2>
                            )
                        }
                        {
                            isLoading ? (
                                <Placeholder animation="glow">
                                    <Placeholder className="placeholder rounded-3" xs={4} />
                                </Placeholder>
                            ) : userData ? (
                                <span className="text-truncate">
                                    {userData.description ?? ''}
                                </span>
                            ) : (
                                ''
                            )

                        }
                        <br />
                        {
                            isLoading ? (
                                <Placeholder animation="glow">
                                    <Badge className="rounded-circle p-1" bg="secondary">
                                        <span className="visually-hidden">
                                            {t('status')}
                                        </span>
                                    </Badge>
                                    {' '}
                                    <Placeholder className="placeholder rounded-3" xs={2} />
                                </Placeholder>
                            ) : (
                                <>
                                    <Badge className="rounded-circle p-1" bg="success">
                                        <span className="visually-hidden">
                                            {t('status')}
                                        </span>
                                    </Badge>
                                    {' '}
                                    {t('online')}
                                </>
                            )
                        }
                    </Col>
                    <Col className="text-center text-md-end align-self-center my-3" md="auto">
                        <Button onClick={() => setSearchParams({ 'tab': 'personal' })}>
                            {t('edit_profile')}
                        </Button>
                    </Col>
                </Card.Body>
            </Card >
            <Tab.Content>
                <Tab.Pane eventKey="empty">
                    <AccountEmpty />
                </Tab.Pane>
                <Tab.Pane eventKey="personal">
                    <AccountPersonal />
                </Tab.Pane>
                <Tab.Pane eventKey="security">
                    <AccountSecurity />
                </Tab.Pane>
                <Tab.Pane eventKey="notification" />
                <Tab.Pane eventKey="privacy">
                    <AccountPrivacy />
                </Tab.Pane>
                <Tab.Pane eventKey="settings">
                    <AccountSettings />
                </Tab.Pane>
            </Tab.Content>
        </>
    )
}
