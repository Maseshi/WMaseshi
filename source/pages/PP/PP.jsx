import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Spinner } from 'react-bootstrap'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Head from '@/components/Head'

import configs from '@/configs'

import Header from '@/layouts/Header'

import PPHeader from './PPHeader'
const PPContent = lazy(() => import('./PPContent'))

export default function PP() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.PP' })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject', { name: configs.SITE.NAME })}
            />

            <Header>
                <PPHeader />
            </Header>

            <Container as="main">
                <section>
                    <Suspense
                        fallback={
                            <Spinner
                                animation="grow"
                                role="status"
                            />
                        }
                    >
                        <PPContent />
                    </Suspense>
                </section>
            </Container>

            <CookieAccept />
            <ScrollBack />
        </>
    )
}
