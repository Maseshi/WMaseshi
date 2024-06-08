import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Row, Col, Badge, Button, Placeholder, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styles from '@/styles/Project.module.css'

export default function ProjectDetail({ data, document }) {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectDetail' })

    const createAtCreation = (createAt) => {
        if (!createAt) return t('unknown')

        const date = new Date(createAt * 1000)
        const when = date.toLocaleString(i18n.language, { dateStyle: 'long' })

        return when
    }
    const statusCreation = (status) => {
        const statusMappings = [
            { variant: 'primary', text: t('test') },
            { variant: 'secondary', text: t('closed') },
            { variant: 'success', text: t('normal') },
            { variant: 'danger', text: t('error') },
            { variant: 'warning', text: t('problem') },
            { variant: 'info', text: t('development') },
            { variant: 'light', text: t('unknown') },
            { variant: 'dark', text: t('unspecified') }
        ]
        const { variant, text } = statusMappings[status] || statusMappings[7]

        return (
            <Badge pill bg={variant}>
                {text}
            </Badge>
        )
    }
    const linksCreation = (links) => {
        if (!links || !Array.isArray(links)) return ''

        return links.map((link, index) => (
            <li key={index}>
                <a
                    className="d-inline-block text-truncate"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ maxWidth: '95vw' }}
                >
                    <i className="bi bi-link-45deg" />
                    {' '}
                    {link}
                </a>
            </li>
        ))
    }
    const tagsCreation = (tags) => {
        if (!Array.isArray(tags) || tags.length === 0) return ''

        return tags.map((tag, index) => (
            <Fragment key={index}>
                <Badge pill bg="primary">
                    {tag}
                </Badge>
                {' '}
            </Fragment>
        ))
    }
    const buttonsCreation = (buttons) => {
        if (!Array.isArray(buttons) || buttons.length === 0) return ''

        return buttons.map((button, index) => {
            if (!button.link || !button.name) return ''

            const validColorIndices = [0, 1, 2, 3, 4, 5, 6, 7]
            const buttonStyle = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
            const buttonVariant = validColorIndices.includes(button.color) ? buttonStyle[button.color] : buttonStyle[7]

            return (
                <Button
                    key={index}
                    className="mb-3"
                    variant={buttonVariant}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={button.disabled}
                >
                    {button.name}
                </Button>
            )
        })
    }

    return (
        <>
            {
                data.isLoading ? (
                    <Placeholder as={Row} animation="glow">
                        <Col className="text-center mb-3" md={2}>
                            <Placeholder className="rounded-4" style={{ 'width': '100px', 'height': '100px' }} />
                        </Col>
                        <Col className="mb-3" md={8}>
                            <h3 aria-hidden="true">
                                <Placeholder className="rounded-3" style={{ 'width': '100px', 'height': '30px' }} />
                            </h3>
                            <p aria-hidden="true">
                                <Placeholder className="rounded-3" style={{ 'width': '100px', 'height': '20px' }} />
                                <Placeholder className="rounded-3 ms-1" style={{ 'width': '160px', 'height': '20px' }} />
                                <Placeholder className="rounded-3 ms-1" style={{ 'width': '80px', 'height': '20px' }} />
                                <Placeholder className="rounded-3 ms-1" style={{ 'width': '50px', 'height': '20px' }} />
                            </p>
                            <p aria-hidden="true">
                                <Placeholder className="rounded-3" xs={3} />
                                <Placeholder className="rounded-3 ms-1" xs={2} />
                                <Placeholder className="rounded-3 ms-1" xs={2} />
                                <Placeholder className="rounded-3 ms-1" xs={4} />
                                <Placeholder className="rounded-3 ms-1" xs={5} />
                            </p>
                            <p aria-hidden="true">
                                <Placeholder className="rounded-3" xs={2} />
                                <Placeholder className="rounded-3 ms-1" xs={1} />
                                <Placeholder className="rounded-3 ms-1" xs={1} />
                                <Placeholder className="rounded-3 ms-1" xs={2} />
                            </p>
                        </Col>
                        <Col className="text-center align-self-center" md={2}>
                            <Placeholder.Button xs={8} aria-hidden="true" />
                        </Col>
                    </Placeholder>
                ) : data.isError ? (
                    <div className="text-center p-5">
                        <i className="bi bi-journal-x display-3" />
                        <br />
                        <h3>
                            {t('error_to_fetch_project', { query: document.title })}
                        </h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {t('can_not_load_detail')}
                        </p>
                        <Button as={Link} to="/projects">
                            {t('back')}
                        </Button>
                    </div>
                ) : (
                    <Row>
                        <Col className="mb-3 text-center" md={2}>
                            {
                                document.icon && document.icon.src ? (
                                    <Image
                                        className="rounded-4"
                                        src={document.icon.src}
                                        alt={document.title}
                                        width="100px"
                                        height="100px"
                                    />
                                ) : (
                                    <div className={styles['icon-bi'] + " rounded-4"}>
                                        <i className="bi bi-archive" />
                                    </div>
                                )
                            }
                        </Col>
                        <Col className="mb-3" md={8}>
                            <h1>
                                {document.title}
                            </h1>
                            <p className="text-muted">
                                {document.type}
                                <span>
                                    {' '}•{' '}
                                </span>
                                <strong>
                                    {t('create_at')}:
                                </strong>
                                {' '}
                                {createAtCreation(document.createAt)}
                                <span>
                                    {' '}•{' '}
                                </span>
                                <strong>
                                    {t('status')}:
                                </strong>
                                {' '}
                                {statusCreation(document.status)}
                            </p>
                            <p>{document.description}</p>
                            <ul className="list-unstyled mb-3">
                                {linksCreation(document.links)}
                            </ul>
                            {tagsCreation(document.tags)}
                        </Col>
                        <Col className="text-center align-self-center" md={2}>
                            {buttonsCreation(document.buttons)}
                        </Col>
                    </Row>
                )
            }
        </>
    )
}
ProjectDetail.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object
}
