import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Spinner } from 'react-bootstrap'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Head from '@/components/Head'

import configs from '@/configs'

import Header from '@/layouts/Header'

import ToSHeader from './ToSHeader'
const ToSContent = lazy(() => import('./ToSContent'))

export default function ToS() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.ToS' })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject', { name: configs.SITE.NAME })}
            />

            <Header>
                <ToSHeader />
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
                        <ToSContent />
                    </Suspense>
                </section>
            </Container>

            <CookieAccept />
            <ScrollBack />
        </>
    )
}
