import { useContext } from 'react'
import { Container, Tab, Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import AccountContent from './AccountContent'
import AccountNavbar from './AccountNavbar'

// Components
import CookieAccept from '@/components/CookieAccept'
import Head from '@/components/Head'

import configs from '@/configs'

import AuthContext from '@/contexts/AuthContext'

export default function Account() {
    const navigate = useNavigate()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.Account' })
    const [searchParams] = useSearchParams()
    const { currentUser, userData, isLoading, isError } = useContext(AuthContext)

    const tabs = ['personal', 'security', 'privacy', 'settings']

    if (!isLoading && !isError && !currentUser && !userData) navigate('/account/sign-in', { replace: true })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject', { name: configs.SITE.NAME })}
            />

            <Container as="main">
                <Tab.Container
                    id="account"
                    activeKey={
                        searchParams.get('tab') ? (
                            tabs.includes(searchParams.get('tab')) ? (
                                searchParams.get('tab')
                            ) : (
                                'empty'
                            )
                        ) : 'personal'
                    }
                >
                    <Row as="section">
                        <Col className="mb-3" md={3}>
                            <AccountNavbar />
                        </Col>
                        <Col md={9}>
                            <AccountContent />
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>

            <CookieAccept />
        </>
    )
}
