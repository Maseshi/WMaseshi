import { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import DialogSupport from './components/DialogSupport'

import configs from '@/configs'

import styles from '@/styles/Home.module.css'

export default function HomeOther() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomeOther' })
    const [show, setShow] = useState()

    const handleSupport = () => setShow(!show)

    return (
        <section className={styles.other} id="other">
            <Container>
                <Row className="g-3 mb-3" xs={1} md={2}>
                    <Col>
                        <Card className={styles['other-card']} bg="dark" text="white">
                            <Card.Body>
                                <Card.Title as="h2">
                                    <i className="bi bi-github" />
                                    {' '}
                                    Github
                                </Card.Title>
                                <Card.Text className="lead">
                                    {t('github_description')}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent border-0">
                                <Button className="w-100" variant="light" size="lg" href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}`} target="_blank">
                                    {t('explore')}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles['other-card']} bg="light" text="dark">
                            <Card.Body>
                                <Card.Title as="h2">
                                    <i className="bi bi-cash-coin" />
                                    {' '}
                                    {t('support')}
                                </Card.Title>
                                <Card.Text className="lead">
                                    {t('support_description')}
                                </Card.Text>
                                <Card.Text className="lead">
                                    {t('support_thank_you')}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent border-0">
                                <Button className="w-100" variant="dark" size="lg" onClick={handleSupport}>
                                    {t('support')}
                                </Button>
                                <DialogSupport show={show} onHide={handleSupport} />
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
