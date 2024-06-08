import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import CookieAccept from '@/components/CookieAccept'
import ScrollToTop from '@/components/ScrollBack'
import Header from '@/layouts/Header'
import Head from '@/components/Head'

import configs from '@/configs'

import ContactHeader from './ContactHeader'
import ContactContent from './ContactContent'

export default function Contact() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Contact' })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject')}
            />

            <Header>
                <ContactHeader />
            </Header>

            <Container as="main">
                <ContactContent />
            </Container>

            <CookieAccept />
            <ScrollToTop bottom="80px" />
        </>
    )
}
