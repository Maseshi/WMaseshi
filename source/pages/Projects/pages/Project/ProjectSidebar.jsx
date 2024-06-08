import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Offcanvas, OverlayTrigger, Tooltip, Card, Placeholder, Button, Badge, FloatingLabel, Form, Nav, Image } from 'react-bootstrap'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Project.module.css'

export default function ProjectSidebar({ reference, location }) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectSidebar' })
    const { theme } = useContext(ThemeContext)
    const [toggle, setToggle] = useState(false)
    const [query, setQuery] = useState('')

    const data = reference.firestore
    const documents = data.isLoading ? null : data.documents.Projects

    const handleSidebarToggle = () => setToggle(!toggle)
    const checkSearchResult = () => {
        return Object.entries(documents).filter(doc => {
            return !query || doc[1].title.toLowerCase().includes(query.toLowerCase())
        })
    }

    return (
        <>
            <Button
                className={`${styles['sidebar-button']} d-md-none`}
                onClick={() => handleSidebarToggle()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </Button>
            <Offcanvas
                show={toggle}
                onHide={handleSidebarToggle}
                responsive="md"
                className={styles.sidebar}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {t('side_bar')}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column flex-shrink-0 ">
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip id="button-tooltip">
                                {t('we_now_managing_system')}
                            </Tooltip>
                        }
                    >
                        <Card className="rounded-4 bg-primary text-center text-white mb-3">
                            <Card.Body>
                                <i className="bi bi-info-circle" />
                                {' '}
                                {t('in_beta_test')}
                            </Card.Body>
                        </Card>
                    </OverlayTrigger>
                    <FloatingLabel
                        controlId="projectSearchProjects"
                        label={
                            <>
                                <i className="bi bi-search" />
                                {' '}
                                {t('search_projects')}
                            </>
                        }
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            className="rounded-4"
                            placeholder={t('search_projects')}
                            onChange={event => setQuery(event.target.value)}
                        />
                    </FloatingLabel>
                    <div className="d-flex flex-row align-items-center mb-3">
                        <Button
                            as={Link}
                            variant={theme}
                            className="rounded-3 me-3 px-2 py-1"
                            to="/projects"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </Button>
                        <h2 className="mb-0">
                            {t('projects')}
                        </h2>
                        <Badge className="ms-auto" pill bg="primary">
                            {
                                data.isLoading ? (
                                    '-:-'
                                ) : (
                                    Object.entries(documents).length
                                )
                            }
                        </Badge>
                    </div>
                    <Nav
                        as="ul"
                        variant="pills"
                        navbarScroll={true}
                        activeKey={location.pathname}
                        className="flex-column text-nowrap mb-auto"
                    >
                        {
                            data.isLoading ? (
                                Array.from({ length: 12 }, (__, index) => {
                                    return (
                                        <Placeholder
                                            as={Nav.Item}
                                            animation="glow"
                                            className="border rounded-4 p-3 mb-2"
                                            key={index}
                                        >
                                            <Placeholder className="rounded-2" style={{ width: '30px', height: '30px' }} />
                                            {' '}
                                            <Placeholder className="rounded-2" xs={4} />
                                        </Placeholder>
                                    )
                                })
                            ) : (
                                checkSearchResult().length ? (
                                    Object.entries(documents)
                                        .sort((a, b) => a[1].title.localeCompare(b[1].title))
                                        .filter(doc => !query || doc[1].title.toLowerCase().includes(query.toLowerCase()))
                                        .map((doc, index) => {
                                            const id = doc[0]
                                            const document = doc[1]

                                            return (
                                                <Nav.Item
                                                    as="li"
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    <Nav.Link
                                                        as={Link}
                                                        className={`${styles.link} border rounded-4 p-3`}
                                                        eventKey={`/projects/${id}`}
                                                        to={`/projects/${id}`}
                                                    >
                                                        {
                                                            document.icon && document.icon.src ? (
                                                                <Image
                                                                    src={document.icon.src}
                                                                    rounded
                                                                    alt={document.title}
                                                                    width={30}
                                                                    height={30}
                                                                />
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-archive bg-light text-dark p-2 rounded-3" viewBox="0 0 16 16">
                                                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                                </svg>
                                                            )
                                                        }
                                                        {' '}
                                                        {document.title}
                                                        {
                                                            document.status === 1 ? (
                                                                <Badge className="float-end" pill bg="secondary">
                                                                    {t('closed')}
                                                                </Badge>
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                    </Nav.Link>
                                                </Nav.Item>
                                            )
                                        })
                                ) : (
                                    <div className="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-journal-x text-warning" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z" />
                                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                        </svg>
                                        <br />
                                        <h2 className="d-inline-block text-warning text-truncate" style={{ maxWidth: '200px' }}>
                                            {t('not_found', { query: query })}
                                        </h2>
                                        <p style={{ whiteSpace: 'pre-line' }}>
                                            {t('project_not_found')}
                                        </p>
                                        <small>
                                            ERR: PROJECT_NOT_FOUND
                                        </small>
                                    </div>
                                )
                            )
                        }
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
ProjectSidebar.propTypes = {
    reference: PropTypes.object,
    location: PropTypes.object
}
