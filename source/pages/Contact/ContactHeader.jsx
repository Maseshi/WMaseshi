import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import styles from '@/styles/Contact.module.css'

export default function ContactContent() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Contact' })

    return (
        <section className={styles.header}>
            <Container>
                <Row className="align-items-center" xs={1} md={2}>
                    <Col md={{ order: 'first' }} xs={{ order: 'last' }}>
                        <h1 className="fw-bold">
                            <span className="text-primary">
                                {t('contact')}
                            </span>
                            {t('our')}
                        </h1>
                        <p>
                            {t('contact_description')}
                        </p>
                    </Col>
                    <Col className="text-center text-md-end mb-3" md={{ order: 'last' }} xs={{ order: 'first' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" className="bi bi-person-lines-fill bg-light p-5 rounded-5" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
