import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, Button } from 'react-bootstrap'

import Header from '@/layouts/Header'
import Head from '@/components/Head'

import configs from '@/configs'

export default function PageNotFound() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.PageNotFound' })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('descriptions')}
                subject={t('website_subject')}
            />

            <Header>
                <Container
                    as="section"
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ height: '100vh' }}
                >
                    <h1 className="display-3 fw-bold">
                        404
                    </h1>
                    <small className="text-secondary">
                        PAGE_NOT_FOUND
                    </small>
                    <p>
                        {t('error_description')}
                        <br />
                        {t('suggestions')}
                    </p>
                    <Button as={Link} variant="dark" to="/">
                        {t('back_to_home_page')}
                    </Button>
                </Container>
            </Header>
        </>
    )
}
