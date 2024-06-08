import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Container, Carousel, Row, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Waves from '@/components/Waves'

// Assets
import htmlLogo from '@/assets/icons/html-5.webp'
import cssLogo from '@/assets/icons/css-3.webp'
import jsLogo from '@/assets/icons/js.webp'
import bootstrapLogo from '@/assets/icons/bootstrap.svg'
import batchLogo from '@/assets/icons/batch.webp'
import gitLogo from '@/assets/icons/git.webp'
import javaLogo from '@/assets/icons/java.webp'
import jsonLogo from '@/assets/icons/json.webp'
import nodeJsLogo from '@/assets/icons/node-js.webp'
import reactJsLogo from '@/assets/icons/react-js.svg'
import visualStudioLogo from '@/assets/icons/visual-studio.webp'
import unityLogo from '@/assets/icons/unity.webp'
import cLogo from '@/assets/icons/c-program.svg'
import googleCloudLogo from '@/assets/icons/google-cloud-platform.svg'
import googleColabLogo from '@/assets/icons/google-colab.svg'
import herokuLogo from '@/assets/icons/heroku.svg'
import jqueryLogo from '@/assets/icons/jquery.svg'
import jupyterNotebookLogo from '@/assets/icons/jupyter-notebook.svg'
import markdownLogo from '@/assets/icons/markdown.svg'
import npmLogo from '@/assets/icons/npm.svg'
import powershellLogo from '@/assets/icons/powershell.svg'
import pythonLogo from '@/assets/icons/python.svg'
import reactRouterLogo from '@/assets/icons/react-router.svg'
import replItLogo from '@/assets/icons/repl-it.svg'
import viteLogo from '@/assets/icons/vite.svg'
import wixLogo from '@/assets/icons/wix.svg'
import nextJsLogo from '@/assets/icons/next-js.webp'
import yarnLogo from '@/assets/icons/yarn.svg'
import linuxLogo from '@/assets/icons/linux.svg'
import dockerLogo from '@/assets/icons/docker.webp'
import i18nextLogo from '@/assets/icons/i18next.webp'
import kaliLogo from '@/assets/icons/kali.svg'
import figmaLogo from '@/assets/icons/figma.svg'
import recaptchaLogo from '@/assets/icons/recaptcha.webp'
import photoshopLogo from '@/assets/icons/photoshop.svg'
import windowsLogo from '@/assets/icons/windows.svg'
import debianLogo from '@/assets/icons/debian.svg'
import visualStudioCodeLogo from '@/assets/icons/visual-studio-code.webp'
import vmwareLogo from '@/assets/icons/vmware.svg'
import kubernetesLogo from '@/assets/icons/kubernetes.svg'
import minikubeLogo from '@/assets/icons/minikube.svg'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Home.module.css'

export default function Skills() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomeSkills' })
    const { theme } = useContext(ThemeContext)

    const SkillIcons = ({ src, width, height, alt }) => {
        return (
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip id={alt.toLowerCase().replace(' ', '-')}>
                        {alt}
                    </Tooltip>
                }
            >
                <div className={styles["skills-icon"]}>
                    <Image
                        className="p-4"
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        loading="lazy"
                    />
                </div>
            </OverlayTrigger>
        )
    }
    SkillIcons.propTypes = {
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
            <section className={styles.skills} id="skills">
                <Container>
                    <Container className="text-center mb-5">
                        <small className="text-primary">
                            {t('skills')}
                        </small>
                        <h2 className="fw-bold">
                            <i className="bi bi-journal-code" />
                            {' '}
                            {t('ability')}
                        </h2>
                        <p>
                            {t('ability_subject')}
                        </p>
                    </Container>
                    <Carousel
                        indicators={false}
                        prevIcon={
                            <i
                                className={
                                    `bi bi-chevron-left h2 pe-5 text-${theme === 'dark' ? 'light' : 'dark'}`
                                }
                            />
                        }
                        nextIcon={
                            <i
                                className={
                                    `bi bi-chevron-right h2 ps-5 text-${theme === 'dark' ? 'light' : 'dark'}`
                                }
                            />
                        }
                    >
                        <Carousel.Item>
                            <Row className="g-4" xs={3} md={4}>
                                <Col>
                                    <SkillIcons src={htmlLogo} width="100px" height="100px" alt="HTML" />
                                </Col>
                                <Col>
                                    <SkillIcons src={cssLogo} width="100px" height="100px" alt="CSS" />
                                </Col>
                                <Col>
                                    <SkillIcons src={jsLogo} width="100px" height="100px" alt="JavaScript" />
                                </Col>
                                <Col>
                                    <SkillIcons src={bootstrapLogo} width="110px" height="100px" alt="Bootstrap" />
                                </Col>
                                <Col>
                                    <SkillIcons src={batchLogo} width="100px" height="100px" alt="Batch" />
                                </Col>
                                <Col>
                                    <SkillIcons src={gitLogo} width="100px" height="100px" alt="Git" />
                                </Col>
                                <Col>
                                    <SkillIcons src={javaLogo} width="100px" height="100px" alt="Java" />
                                </Col>
                                <Col>
                                    <SkillIcons src={jsonLogo} width="100px" height="100px" alt="Json" />
                                </Col>
                                <Col>
                                    <SkillIcons src={unityLogo} width="100px" height="100px" alt="Unity" />
                                </Col>
                                <Col>
                                    <SkillIcons src={cLogo} width="100px" height="100px" alt="C" />
                                </Col>
                                <Col>
                                    <SkillIcons src={googleCloudLogo} width="100px" height="100px" alt="Google Cloud Platform" />
                                </Col>
                                <Col>
                                    <SkillIcons src={googleColabLogo} width="100px" height="100px" alt="Google Colab" />
                                </Col>
                                <Col>
                                    <SkillIcons src={herokuLogo} width="100px" height="100px" alt="Heroku" />
                                </Col>
                                <Col>
                                    <SkillIcons src={jqueryLogo} width="100px" height="100px" alt="JQuery" />
                                </Col>
                                <Col>
                                    <SkillIcons src={jupyterNotebookLogo} width="100px" height="100px" alt="Jupyter Notebook" />
                                </Col>
                                <Col>
                                    <SkillIcons src={markdownLogo} width="100px" height="100px" alt="Markdown" />
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Row className="g-4" xs={3} md={4}>
                                <Col>
                                    <SkillIcons src={nodeJsLogo} width="100px" height="100px" alt="Node.js" />
                                </Col>
                                <Col>
                                    <SkillIcons src={reactJsLogo} width="100px" height="100px" alt="React.js" />
                                </Col>
                                <Col>
                                    <SkillIcons src={visualStudioLogo} width="100px" height="100px" alt="Visual Studio" />
                                </Col>
                                <Col>
                                    <SkillIcons src={npmLogo} width="100px" height="100px" alt="NPM" />
                                </Col>
                                <Col>
                                    <SkillIcons src={powershellLogo} width="100px" height="100px" alt="Powershell" />
                                </Col>
                                <Col>
                                    <SkillIcons src={pythonLogo} width="100px" height="100px" alt="Python" />
                                </Col>
                                <Col>
                                    <SkillIcons src={reactRouterLogo} width="100px" height="100px" alt="React Router" />
                                </Col>
                                <Col>
                                    <SkillIcons src={replItLogo} width="100px" height="100px" alt="Repl.it" />
                                </Col>
                                <Col>
                                    <SkillIcons src={viteLogo} width="100px" height="100px" alt="Vite" />
                                </Col>
                                <Col>
                                    <SkillIcons src={wixLogo} width="100px" height="100px" alt="Wix" />
                                </Col>
                                <Col>
                                    <SkillIcons src={nextJsLogo} width="100px" height="100px" alt="Next.js" />
                                </Col>
                                <Col>
                                    <SkillIcons src={yarnLogo} width="100px" height="100px" alt="Yarn" />
                                </Col>
                                <Col>
                                    <SkillIcons src={linuxLogo} width="100px" height="100px" alt="Linux" />
                                </Col>
                                <Col>
                                    <SkillIcons src={dockerLogo} width="100px" height="100px" alt="Docker" />
                                </Col>
                                <Col>
                                    <SkillIcons src={i18nextLogo} width="100px" height="100px" alt="i18next" />
                                </Col>
                                <Col>
                                    <SkillIcons src={kaliLogo} width="100px" height="100px" alt="Kali (Backtrack)" />
                                </Col>
                            </Row>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Row className="g-4" xs={3} md={4}>
                                <Col>
                                    <SkillIcons src={figmaLogo} width="100px" height="100px" alt="Figma" />
                                </Col>
                                <Col>
                                    <SkillIcons src={recaptchaLogo} width="100px" height="100px" alt="ReCaptcha" />
                                </Col>
                                <Col>
                                    <SkillIcons src={photoshopLogo} width="100px" height="100px" alt="Photoshop" />
                                </Col>
                                <Col>
                                    <SkillIcons src={windowsLogo} width="100px" height="100px" alt="Windows" />
                                </Col>
                                <Col>
                                    <SkillIcons src={debianLogo} width="100px" height="100px" alt="Debian" />
                                </Col>
                                <Col>
                                    <SkillIcons src={visualStudioCodeLogo} width="100px" height="100px" alt="Visual Studio Code" />
                                </Col>
                                <Col>
                                    <SkillIcons src={vmwareLogo} width="100px" height="100px" alt="VMware" />
                                </Col>
                                <Col>
                                    <SkillIcons src={kubernetesLogo} width="100px" height="100px" alt="Kubernetes" />
                                </Col>
                                <Col>
                                    <SkillIcons src={minikubeLogo} width="100px" height="100px" alt="Minikube" />
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
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
