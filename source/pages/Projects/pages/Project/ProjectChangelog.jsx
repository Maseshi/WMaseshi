import PropTypes from 'prop-types'
import { Accordion, Spinner, Badge, ListGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Markdown from '@/libs/Markdown'

import { calculateFileSize } from '@/utils/calculateFileSize'

export default function ProjectChangelog({ data, document }) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectChangelog' })

    return (
        <>
            <Accordion defaultActiveKey="0">
                {
                    data.isLoading ? (
                        <div className="text-center p-5">
                            <Spinner animation="border" />
                            <br />
                            <span>
                                {t('loading')}
                            </span>
                        </div>
                    ) : document.tabs.changelog.content ? (
                        document.tabs.changelog.data?.map((releases, index) => {
                            const assets = releases.assets
                            const name = releases.name
                            const body = releases.body
                            const prerelease = releases.prerelease
                            const zip = releases.zipball_url
                            const tar = releases.tarball_url

                            return (
                                <Accordion.Item
                                    className={
                                        index === 0 ? (
                                            'rounded-top-4 overflow-hidden'
                                        ) : index === (document.tabs.changelog.data.length - 1) ? (
                                            'rounded-bottom-4 overflow-hidden'
                                        ) : (
                                            ''
                                        )
                                    }
                                    eventKey={index}
                                    key={index}
                                >
                                    <Accordion.Header>
                                        {
                                            index === 0 ? (
                                                <Badge className="me-3" pill bg="success">
                                                    {t('latest')}
                                                </Badge>
                                            ) : ''
                                        }
                                        {
                                            prerelease ? (
                                                <Badge className="me-3" pill bg="info">
                                                    {t('test')}
                                                </Badge>
                                            ) : ''
                                        }
                                        {name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Markdown text={body} />
                                        <hr />
                                        <h4>
                                            {t('assets')}
                                            {' '}
                                            <Badge pill bg="primary">
                                                {assets ? (assets.length + 2) : 2}
                                            </Badge>
                                        </h4>
                                        <ListGroup>
                                            {
                                                assets ? (
                                                    assets.map((asset, assetsIndex) => {
                                                        const assetDownloadURL = asset.browser_download_url
                                                        const assetName = asset.name
                                                        const assetSize = asset.size

                                                        return (
                                                            <ListGroup.Item action href={assetDownloadURL} key={assetsIndex}>
                                                                <i className="bi bi-file-earmark-zip" />
                                                                {' '}
                                                                <span>{assetName}</span>
                                                                {' '}
                                                                <span>{calculateFileSize(assetSize)}</span>
                                                            </ListGroup.Item>
                                                        )
                                                    })
                                                ) : ''
                                            }
                                            <ListGroup.Item action href={zip}>
                                                <i className="bi bi-file-earmark-zip" />
                                                {' '}
                                                {t('source_code')}
                                                {' '}
                                                (zip)
                                            </ListGroup.Item>
                                            <ListGroup.Item action href={tar}>
                                                <i className="bi bi-file-earmark-zip" />
                                                {' '}
                                                {t('source_code')}
                                                {' '}
                                                (tar.gz)
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })
                    ) : (
                        <div className="text-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-tags mb-3" viewBox="0 0 16 16">
                                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                            </svg>
                            <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                                {t('no_changelog_for_now')}
                            </p>
                            <small>
                                ERR: DATA_NOT_PROVIDED
                            </small>
                        </div>
                    )
                }
            </Accordion>
        </>
    )
}
ProjectChangelog.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object
}
