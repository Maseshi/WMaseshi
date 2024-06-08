import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap'

import configs from '@/configs'

import styles from '@/styles/Projects.module.css'

export default function ProjectsHeader() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Projects.ProjectsHeader' })

    return (
        <Container as="section" className={styles.header}>
            <Row className="align-items-center" xs={1} md={2}>
                <Col xs={{ order: 'last' }} md={{ order: 'first' }}>
                    <h1 className="fw-bold">
                        {
                            i18n.language === 'en' ? (
                                <>
                                    {t('mine')}
                                    {' '}
                                </>
                            ) : (
                                t('projects')
                            )
                        }
                        <span className="text-primary">
                            {
                                i18n.language === 'en' ? (
                                    t('projects')
                                ) : (
                                    t('mine')
                                )
                            }
                        </span>
                    </h1>
                    <p>
                        {t('projects_center', { name: configs.SITE.NAME })}
                    </p>
                </Col>
                <Col className="text-center text-md-end mb-3" xs={{ order: 'first' }} md={{ order: 'last' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" className="bi bi-archive-fill bg-light p-5 rounded-5" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                    </svg>
                </Col>
            </Row>
        </Container>
    )
}
