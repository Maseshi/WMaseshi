import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Spinner, Card, Row, Col, Image, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ThemeContext from '@/contexts/ThemeContext'

import Markdown from '@/libs/Markdown'

export default function ProjectNews({ data, document }) {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectNews' })
    const { theme } = useContext(ThemeContext)

    const postAtCreation = (established) => {
        if (!established) return 'ไม่ทราบ'

        const date = new Date(established * 1000)
        const day = date.getDate()
        const month = date.toLocaleString(i18n.language, { month: 'long' })
        const year = date.getFullYear() + 543

        return `${day} ${month} ${year}`
    }

    return (
        <>
            {
                data.isLoading ? (
                    <div className="text-center p-5">
                        <Spinner animation="border" />
                        <br />
                        <span>
                            {t('loading')}
                        </span>
                    </div>
                ) : document.tabs.news && document.tabs.news.length > 0 ? (
                    document.tabs.news.map((doc, index) => {
                        const role = doc.author.role ?? 'Member'
                        const profile = doc.author.profile ?? null
                        const username = doc.author.username ?? 'User'
                        const postAt = doc.content.create ?? null
                        const message = doc.content.message ?? null

                        return (
                            <Card className="rounded-4 overflow-hidden" key={index}>
                                <Row>
                                    <Col className={"p-5 text-center bg-" + theme} md={4}>
                                        <Image
                                            rounded
                                            className="rounded-4"
                                            src={profile}
                                            alt={document.id}
                                            width="80px"
                                            height="80px"
                                        />
                                        <h2>
                                            {username}
                                        </h2>
                                        <Badge pill bg="primary">
                                            {role.toUpperCase()}
                                        </Badge>
                                    </Col>
                                    <Col className="p-3" md={8}>
                                        <p className="text-muted">
                                            <strong>
                                                {t('post_at')}:
                                            </strong>
                                            {' '}
                                            {postAtCreation(postAt)}
                                        </p>
                                        <div style={{ whiteSpace: 'pre-wrap' }}>
                                            <Markdown text={message} />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                ) : (
                    <div className="text-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-newspaper mb-3" viewBox="0 0 16 16">
                            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                        </svg>
                        <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                            {t('no_news_for_now')}
                        </p>
                        <small>
                            ERR: DATA_NOT_PROVIDED
                        </small>
                    </div>
                )
            }
        </>
    )
}
ProjectNews.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object
}
