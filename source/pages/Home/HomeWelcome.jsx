import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { Container, Row, Col, Button, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Typewriter from '@/components/Typewriter'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

import DialogSupport from './components/DialogSupport'

import styles from '@/styles/Home.module.css'

export default function Welcome() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomeWelcome' })
    const [show, setShow] = useState(false)

    const handleSupport = () => setShow(!show)

    return (
        <section className={styles.welcome}>
            <Container className="h-100">
                <Row className="h-100 align-items-center">
                    <Col md={5} className="mb-3">
                        <div className={styles.creator}></div>
                    </Col>
                    <Col md={5} className="mb-3">
                        <small className="text-primary">
                            {t('hello')}
                        </small>
                        <h1 className="fw-bold">
                            <Typewriter
                                text={t('i_am', { name: configs.SITE.NAME })}
                                delay={100}
                            />
                        </h1>
                        <p>
                            <Typewriter text={t('subject')} delay={20} />
                        </p>
                        <div className="d-grid gap-2 d-md-flex">
                            <Link className="btn btn-primary w-100" to="/projects">
                                {t('explore_all_projects')}
                            </Link>
                            <Button className="w-100" variant="outline-primary" onClick={handleSupport}>
                                {t('support')}
                            </Button>
                            <DialogSupport show={show} onHide={handleSupport} />
                        </div>
                    </Col>
                    <Col md={2} className="mb-3">
                        <Nav className="text-center flex-md-column" as="ul">
                            <SocialMedia href={`https://facebook.com/${configs.SITE.SOCIAL_MEDIA.FACEBOOK}`} label="Facebook" iconName="facebook" />
                            <SocialMedia href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}`} label="Github" iconName="github" />
                            <SocialMedia href={`https://instagram.com/${configs.SITE.SOCIAL_MEDIA.INSTAGRAM}`} label="Instagram" iconName="instagram" />
                            <SocialMedia href={`https://x.com/${configs.SITE.SOCIAL_MEDIA.X}`} label="X" iconName="twitter" />
                            <SocialMedia href={`https://g.dev/${configs.SITE.SOCIAL_MEDIA.GOOGLE}`} label="Google" iconName="google" />
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

function SocialMedia({ href, label, iconName }) {
    const { theme } = useContext(ThemeContext)

    return (
        <Nav.Item as="li">
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip id={label.toLowerCase().replace(' ', '-')}>
                        {label}
                    </Tooltip>
                }
            >
                <Nav.Link
                    href={href}
                    target="_blank"
                    aria-label={label}
                >
                    <i className={`bi bi-${iconName} h2 ${theme === 'dark' ? 'text-dark-emphasis' : 'text-dark'}`} />
                </Nav.Link>
            </OverlayTrigger>
        </Nav.Item >
    )
}
SocialMedia.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
}
