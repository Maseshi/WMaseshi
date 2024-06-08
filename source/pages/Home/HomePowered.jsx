import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import googleCloudRectangle from '@/assets/images/google-cloud-rectangle.svg'
import firebaseRectangle from '@/assets/images/firebase-rectangle.svg'
import reactRectangle from '@/assets/images/react-js-rectangle.svg'
import bootstrapRectangle from '@/assets/images/bootstrap-rectangle.svg'

import Waves from '@/components/Waves'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Home.module.css'

export default function HomePowered() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomePowered' })
    const { theme } = useContext(ThemeContext)

    const Rectangle = ({ src, width, height, alt }) => {
        return (
            <Col className="align-self-center align-items-center">
                <Image
                    className="object-fit-cover"
                    src={src}
                    width={width}
                    height={height}
                    alt={alt}
                    loading="lazy"
                />
            </Col>
        )
    }
    Rectangle.propTypes = {
        src: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }

    return (
        <>
            <Waves
                position="top"
                r={theme === 'dark' ? 15 : 240}
                g={theme === 'dark' ? 15 : 240}
                b={theme === 'dark' ? 15 : 250}
            />
            <section className={styles.powered} id="powered">
                <Container>
                    <Container className="text-secondary text-center mb-5">
                        <small className="text-primary">
                            POWERED
                        </small>
                        <h2 className="fw-bold">
                            {t('powered_by')}
                        </h2>
                    </Container>
                    <div className="text-center">
                        <Row className="g-3 text-center justify-content-center" xs={1} md={3}>
                            <Rectangle src={googleCloudRectangle} width="100%" height="100%" alt="Google Cloud Rectangle" />
                            <Rectangle src={firebaseRectangle} width="300px" height="100%" alt="Firebase Rectangle" />
                            <Rectangle src={reactRectangle} width="300px" height="100%" alt="React js Rectangle" />
                            <Rectangle src={bootstrapRectangle} width="100%" height="100px" alt="Bootstrap Rectangle" />
                        </Row>
                    </div>
                </Container>
            </section>
            <Waves
                position="bottom"
                r={theme === 'dark' ? 15 : 240}
                g={theme === 'dark' ? 15 : 240}
                b={theme === 'dark' ? 15 : 250}
            />
        </>
    )
}
