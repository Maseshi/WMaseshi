import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Image } from 'react-bootstrap'

import AboutHeader from '@/assets/images/about-header.webp'

import Waves from '@/components/Waves'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Home.module.css'

export default function HomeAbout() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomeAbout' })
    const { theme } = useContext(ThemeContext)

    const getAge = (dateString) => {
        const today = new Date()
        const birthDate = new Date(dateString)
        const month = today.getMonth() - birthDate.getMonth()
        let age = today.getFullYear() - birthDate.getFullYear()

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--

        return age
    }

    return (
        <>
            <Waves
                className={styles.waves}
                r={theme === 'dark' ? 17 : 255}
                g={theme === 'dark' ? 17 : 255}
                b={theme === 'dark' ? 17 : 255}
            />
            <section className={styles.about} id="about">
                <Container>
                    <Container className="text-center mb-5">
                        <small className="text-primary">
                            {t('introduce_yourself')}
                        </small>
                        <h2 className="fw-blod">
                            <i className="bi bi-card-heading" />
                            {' '}
                            {t('about_me')}
                        </h2>
                        <p>
                            {t('about_me_subject', { name: configs.SITE.NAME })}
                        </p>
                    </Container>
                    <Row className="g-4 py-5" xs={1} md={2}>
                        <Col className="text-center">
                            <Image
                                className="rounded-4 shadow-lg"
                                thumbnail
                                fluid
                                src={AboutHeader}
                                width="100%"
                                height="100%"
                                alt="workspace"
                                loading="lazy"
                            />
                        </Col>
                        <Col>
                            <h3>
                                {t('personal')}
                            </h3>
                            <p>
                                {t('personal_subject')}
                            </p>
                            <br />
                            <Row as="dl">
                                <Col as="dt" sm="3">
                                    {t('nickname')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {t('nickname_name')}
                                </Col>

                                <Col as="dt" sm="3">
                                    {t('alias')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {
                                        t('alias_name', {
                                            name: configs.SITE.NAME,
                                            pronunciation: configs.SITE.PRONUNCIATION
                                        })
                                    }
                                </Col>

                                <Col as="dt" sm="3">
                                    {t('birthday')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {t('birthday_at')}
                                    {' '}
                                    ({getAge('2005/01/12')}
                                    {' '}
                                    {t('years_old')})
                                </Col>

                                <Col as="dt" sm="3">
                                    {t('hobby')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {t('write_a_program')}
                                </Col>

                                <Col as="dt" sm="3">
                                    {t('education')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {t('university_of_phayao')}
                                </Col>
                                <Col as="dt" sm="3"></Col>
                                <Col as="dd" sm="9">
                                    {t('group')}
                                </Col>
                                <Col as="dt" sm="3"></Col>
                                <Col as="dd" sm="9">
                                    {t('branch')}
                                </Col>

                                <Col as="dt" sm="3">
                                    {t('favorite_color')}
                                </Col>
                                <Col as="dd" sm="9">
                                    {t('white')},
                                    {' '}
                                    {t('light_blue')},
                                    {' '}
                                    {t('black')}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="g-4 py-5" xs={1} md={2}>
                        <Col>
                            <h3>
                                {t('why')}
                            </h3>
                            <p>
                                {t('why_description')}
                            </p>
                        </Col>
                        <Col>
                            <h3>
                                {t('difficult')}
                            </h3>
                            <p>
                                {t('difficult_description')}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
