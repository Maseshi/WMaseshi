import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import configs from '@/configs'

import DataContext from '@/contexts/DataContext'

import ProjectBackground from './ProjectBackground'
import ProjectDetail from './ProjectDetail'
import ProjectContents from './ProjectContents'
import ProjectSidebar from './ProjectSidebar'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Head from '@/components/Head'

export default function Project() {
    const location = useLocation()
    const { id } = useParams()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.Project' })
    const { reference } = useContext(DataContext)

    const data = reference.firestore
    const document = data.isLoading ? null : data.documents.Projects[id]

    return (
        <>
            <Head
                title={`${(document?.title ?? id)} - ${configs.SITE.NAME}`}
                description={document?.description ?? ''}
                subject={t('project_detail', { title: (document?.title ?? id) })}
                url={`${configs.SITE.URL}/projects/${id}`}
            />

            <Container as="main" fluid>
                <Row as="section">
                    <Col md={3}>
                        <ProjectSidebar reference={reference} location={location} />
                    </Col>
                    <Col md={9}>
                        <ProjectBackground data={data} document={document} />
                        <ProjectDetail data={data} document={document} />
                        <ProjectContents data={data} document={document} id={id} />
                    </Col>
                </Row>
            </Container>

            <CookieAccept />
            <ScrollBack />
        </>
    )
}
