import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Card, Col, Placeholder } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import DataContext from '@/contexts/DataContext'

import styles from '@/styles/ProjectsList.module.css'

export default function ProjectsList({ limit, query }) {
    const { t } = useTranslation('translation', { keyPrefix: 'components.ProjectsList' })
    const { reference } = useContext(DataContext)

    const data = reference.firestore
    const documents = Object.entries(data.documents.Projects)
    const filter = (data) => !query || data[1].title.toLowerCase().includes(query.toLowerCase()) || data[1].type.toLowerCase().includes(query.toLowerCase())

    return (
        <>
            {
                data.isLoading ? (
                    Array.from({ length: (limit ?? 12) }, (__, index) => (
                        <Col className="mb-3" key={index}>
                            <Card className={styles.card}>
                                <Placeholder animation="glow" width="100%" height="100%">
                                    <Placeholder className="rounded-3" style={{ width: '100%', height: '200px' }} />
                                </Placeholder>
                                <Card.Body>
                                    <Placeholder as={Card.Subtitle} animation="glow mb-3">
                                        <Placeholder className="rounded-3" xs={2} />
                                    </Placeholder>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder className="rounded-3" xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder className="rounded-3" xs={7} />
                                        {' '}
                                        <Placeholder className="rounded-3" xs={4} />
                                        {' '}
                                        <Placeholder className="rounded-3" xs={4} />
                                        {' '}
                                        <Placeholder className="rounded-3" xs={6} />
                                        {' '}
                                        <Placeholder className="rounded-3" xs={8} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder className="rounded-3" xs={7} />
                                    </Placeholder>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : data.isError ? (
                    <Col className="text-center p-5 w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-square text-warning" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                        </svg>
                        <br />
                        <h2 className="text-warning">
                            {t('so_bad')}
                        </h2>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {t('error_to_fetch')}
                        </p>
                        <small>
                            ERR: FAILED_TO_FETCH_FROM_DATABASE
                        </small>
                    </Col>
                ) : (
                    documents.filter(data => filter(data)).length ? (
                        documents
                            .splice(0, (limit ?? documents.length))
                            .filter(data => filter(data))
                            .sort((first, second) => first[1].title.localeCompare(second[1].title))
                            .map((data, index) => {
                                const id = data[0]
                                const document = data[1]
                                const icon = document.icon
                                const type = document.type
                                const title = document.title
                                const description = document.description.length >= 60 ? (document.description.substring(0, 60) + '...') : document.description
                                const createAt = new Date(document.createAt * 1000).toLocaleDateString()

                                return (
                                    <Col key={index}>
                                        <Card as={Link} className={styles.card} to={`/projects/${id}`}>
                                            {
                                                icon && icon.src ? (
                                                    <Card.Img
                                                        variant="top"
                                                        className="object-fit-cover"
                                                        src={icon.src}
                                                        alt={title.toLowerCase()}
                                                        width="100%"
                                                        height="200px"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <i className="card-img-top bi bi-archive" />
                                                )
                                            }
                                            <Card.Body className="p-4">
                                                <Card.Subtitle className="text-muted mb-3">
                                                    {type}
                                                </Card.Subtitle>
                                                <Card.Title>
                                                    {title}
                                                </Card.Title>
                                                <Card.Text>
                                                    {description}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>
                                                        {t('create_at')}:
                                                    </strong>
                                                    {' '}
                                                    {createAt}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                    ) : (
                        <Col className="text-center p-5 w-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-cloud-rain text-warning mb-3" viewBox="0 0 16 16">
                                <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z" />
                            </svg>
                            <h2 className="text-warning">
                                {t('not_found')}
                            </h2>
                            <p>
                                {t('can_not_find_any_projects')}
                            </p>
                            <small>
                                ERR: PROJECT_NOT_FOUND
                            </small>
                        </Col>
                    )
                )

            }
        </>
    )
}
ProjectsList.propTypes = {
    limit: PropTypes.number,
    query: PropTypes.string
}
