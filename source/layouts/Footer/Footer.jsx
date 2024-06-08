import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Nav, Image } from 'react-bootstrap'

import Waves from '@/components/Waves'

import configs from '@/configs'

import nodePackage from '../../../package.json'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Footer.module.css'

export default function Footer() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'layouts.Footer' })
    const { theme } = useContext(ThemeContext)

    return (
        <footer>
            <Waves
                position="top"
                r={theme === 'dark' ? 15 : 240}
                g={theme === 'dark' ? 15 : 240}
                b={theme === 'dark' ? 15 : 250}
            />
            <div className={styles.info}>
                <Container>
                    <Row className="g-4" xs={1} md={4}>
                        <Col>
                            <Nav as="ul" className="flex-column">
                                <Nav.Item as="li" className="mb-4">
                                    <Link className={styles.brand} to="/">
                                        <Image
                                            className="d-inline-block align-middle"
                                            src="/icon.svg"
                                            alt="favicon"
                                            width="40px"
                                            height="40px"
                                        />
                                        {' '}
                                        MASE<span className="text-primary">SHI</span>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <p>
                                        {
                                            t('website_info', { full_name: configs.SITE.COPYRIGHTS })
                                        }
                                    </p>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <p>
                                        {t('need_to_contact')}
                                        <br />
                                        <a href={`mailto:${configs.SITE.EMAIL}`}>
                                            {configs.SITE.EMAIL}
                                        </a>
                                    </p>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <p>
                                        {t('currently') + (' v' + nodePackage.version + ' ') + t('code_licensed')}
                                        {' '}
                                        <a
                                            href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}/WMaseshi/blob/main/LICENSE`}
                                            rel="noreferrer noopener"
                                            target="_blank"
                                        >
                                            MIT
                                        </a>
                                    </p>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav as="ul" className="flex-column">
                                <Nav.Item as="li" className="mb-4">
                                    <span className="h5 fw-bold">
                                        {t('other_links')}
                                    </span>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="/projects">
                                        {t('all_projects')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="/account">
                                        {t('account')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href="https://maseshi.statuspage.io/" target="_blank">
                                        {t('status')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="/privacy-policy">
                                        {t('privacy_policy')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="/terms-of-service">
                                        {t('terms_of_services')}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav as="ul" className="flex-column">
                                <Nav.Item as="li" className="mb-4">
                                    <span className="h5 fw-bold">
                                        {t('follow')}
                                    </span>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://facebook.com/${configs.SITE.SOCIAL_MEDIA.FACEBOOK}`} target="_blank">
                                        Facebook
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}`} target="_blank">
                                        Github
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://instagram.com/${configs.SITE.SOCIAL_MEDIA.INSTAGRAM}`} target="_blank">
                                        Instagram
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://x.com/${configs.SITE.SOCIAL_MEDIA.X}`} target="_blank">
                                        X
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://g.dev/${configs.SITE.SOCIAL_MEDIA.GOOGLE}`} target="_blank">
                                        Google
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav as="ul" className="flex-column">
                                <Nav.Item as="li" className="mb-4">
                                    <span className="h5 fw-bold">
                                        {t('resources')}
                                    </span>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as={Link} to="/projects/wmaseshi?tab=source-code">
                                        {t('open_source')}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}/WMaseshi/blob/main/LICENSE`} target="_blank">
                                        {t('license')}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.raw + " text-center"}>
                <span>
                    <Link to="/privacy-policy">
                        {t('privacy_policy')}
                    </Link>
                    {' '}
                    &bull;
                    {' '}
                    <Link to="/terms-of-service">
                        {t('terms_of_services')}
                    </Link>
                </span>
                <br />
                <span>
                    {
                        t('copyright', {
                            from: new Date(new Date().setFullYear(2020)).toLocaleString(i18n.language, { year: 'numeric' }).split(' ').pop(),
                            to: new Date().toLocaleString(i18n.language, { year: 'numeric' }).split(' ').pop(),
                            full_name: configs.SITE.COPYRIGHTS
                        })
                    }
                </span>
            </div>
        </footer>
    )
}
