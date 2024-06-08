import { useContext } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ProjectsList from '@/components/ProjectsList'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Home.module.css'

export default function HomeProjects() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.HomeProjects' })
    const { theme } = useContext(ThemeContext)

    return (
        <section className={styles.projects} id="projects">
            <Container>
                <Container className="text-center mb-5">
                    <small className="text-primary">
                        {t('projects')}
                    </small>
                    <h2 className="fw-bold">
                        <i className="bi bi-box-seam" />
                        {' '}
                        {t('all_projects')}
                    </h2>
                    <p>
                        {t('all_projects_subject', { name: configs.SITE.NAME })}
                    </p>
                </Container>
                <Row className="g-3 mb-3" xs={1} md={3} lg={4}>
                    <ProjectsList limit={4} />
                </Row>
                <div className="d-grid gap-2 d-md-flex">
                    <Button
                        className="w-100"
                        variant="dark"
                        size="lg"
                        href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}`}
                        target="_blank"
                    >
                        <i className="bi bi-github" />
                        {' '}
                        {configs.SITE.NAME}
                    </Button>
                    <Button
                        as={Link}
                        className="w-100"
                        variant={'outline-' + (theme === 'dark' ? 'light' : 'dark')}
                        size="lg"
                        to="./projects"
                    >
                        {t('explore_more_projects')}
                    </Button>
                </div>
            </Container>
        </section>
    )
}
