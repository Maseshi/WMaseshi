import psd from '@webtoon/psd'
import hljs from 'highlight.js'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Spinner, Breadcrumb, ListGroup, Placeholder, Image, Card, Row, Col, Stack, Button } from 'react-bootstrap'

import configs from '@/configs'

import Markdown from '@/libs/Markdown'

import { calculateFileSize } from '@/utils/calculateFileSize'
import { validateImage, validateAudio, validateMarkdown, validatePhotoshop, validateFLStudio } from '@/utils/validate'

import octokit from '@/services/octokit'

import 'highlight.js/styles/github.css'
import styles from '@/styles/Project.module.css'

export default function ProjectSourceCode({ data, document, id }) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectSourceCode' })
    const [directory, setDirectory] = useState()
    const [content, setContent] = useState()
    const [file, setFile] = useState()
    const [path, setPath] = useState([])
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [action, setAction] = useState({
        wordWrap: false,
        raw: {
            show: false,
            rawContent: '',
            formatContent: ''
        }
    })

    const version = '1.3.0'

    useEffect(() => {
        const getDirectory = async () => {
            if (!data.isLoading && document.tabs.source_code.content) {
                const source_code = document.tabs.source_code.data

                source_code?.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

                setDirectory(source_code)
                setLoading(false)
            }
        }
        getDirectory()
    }, [data.isLoading, document])

    const backToDirectory = async (url, index) => {
        const source_code = document.tabs.source_code.content

        setLoading(true)

        if (source_code) {
            const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: configs.SITE.SOCIAL_MEDIA.GITHUB,
                repo: source_code,
                path: url[index]
            })

            if (response.status === 404) return
            if (response.status === 200) {
                const folders = response.data

                folders.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

                setDirectory(folders)
                setContent()
                setFile()
                setPath(path.slice(0, (index + 1)))
                setHistory(history.slice(0, (index + 1)))
                setAction(
                    prev => ({
                        ...prev,
                        wordWrap: false,
                        raw: {
                            show: false,
                            rawContent: '',
                            formatContent: ''
                        }
                    })
                )
                return setLoading(false)
            }
        }
    }
    const openFolder = async (dir) => {
        const source_code = document.tabs.source_code.content

        setLoading(true)

        if (source_code) {
            const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: configs.SITE.SOCIAL_MEDIA.GITHUB,
                repo: source_code,
                path: dir
            })

            if (response.status === 404) return
            if (response.status === 200) {
                const folders = response.data
                const paths = dir.split('/')

                history.push(dir)
                folders.sort((a, b) => a.type.localeCompare(b.type, navigator.languages[0] || navigator.language, { numeric: true, ignorePunctuation: true }))

                setDirectory(folders)
                setContent()
                setFile()
                setPath(paths)
                setHistory(history)
                return setLoading(false)
            }
        }
    }
    const openFile = async (dir) => {
        const source_code = document.tabs.source_code.content

        setLoading(true)

        if (source_code) {
            const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: configs.SITE.SOCIAL_MEDIA.GITHUB,
                repo: source_code,
                path: dir
            })

            if (response.status === 404) return
            if (response.status === 200) {
                const responseFile = response.data
                const fileName = responseFile.name
                const fileContent = responseFile.content
                const fileDownload = responseFile.download_url
                const paths = dir.split('/')

                if (validateImage(fileName)) {
                    setContent(
                        <Image
                            rounded
                            className="text-center p-5 rounded-4"
                            src={fileDownload}
                            alt={fileName}
                            width="100%"
                        />
                    )
                } else if (validateAudio(fileName)) {
                    const fileExtension = fileName.split('.').pop()

                    setContent(
                        <audio className="text-center p-5" controls>
                            <source src={fileDownload} type={`audio/${fileExtension}`} />
                            {t('your_browser_is_not_support_audio')}
                        </audio>
                    )
                } else if (validateMarkdown(fileName)) {
                    let fileExtension = 'plaintext'
                    const decodedBase64 = atob(fileContent)

                    if (fileName.substr(0, fileName.indexOf('.'))) {
                        if (/[.]/.exec(fileName)) {
                            fileExtension = fileName.split('.').pop()
                        }
                    }

                    setContent(decodedBase64)
                    setAction(
                        prev => ({
                            ...prev,
                            raw: {
                                ...prev.raw,
                                rawContent: decodedBase64,
                                formatContent: hljs.highlight(decodedBase64, { language: fileExtension }).value
                            }
                        })
                    )
                } else if (validatePhotoshop(fileName)) {
                    const response = await fetch(fileDownload)
                    const file = await response.arrayBuffer()
                    const psdFile = psd.parse(file)

                    const canvasElement = window.document.createElement('canvas')
                    const context = canvasElement.getContext('2d')
                    const compositeBuffer = await psdFile.composite()
                    const imageData = new ImageData(
                        compositeBuffer,
                        psdFile.width,
                        psdFile.height
                    )

                    canvasElement.width = psdFile.width
                    canvasElement.height = psdFile.height

                    context.putImageData(imageData, 0, 0)

                    setContent(
                        <Image
                            rounded
                            className="text-center p-5 rounded-4"
                            src={canvasElement.toDataURL('image/png')}
                            alt={fileName}
                            width="100%"
                        />
                    )
                } else if (validateFLStudio(fileName)) {
                    setContent(
                        <div className="text-center p-5">
                            <h5>
                                <i className="bi bi-exclamation-circle-fill" />
                                {' '}
                                {t('not_support_fl_studio')}
                            </h5>
                            <span className="text-muted">
                                ERR: FL_STUDIO_FILE_DOES_NOT_SUPPORTED
                            </span>
                            <br />
                            <Button variant="link" href={fileDownload} target="_blank">
                                {t('view_raw_file')}
                            </Button>
                        </div>
                    )
                } else if (fileContent) {
                    try {
                        try {
                            let fileExtension = 'plaintext'
                            const decodedBase64 = atob(fileContent)

                            if (fileName.substr(0, fileName.indexOf('.'))) {
                                if (/[.]/.exec(fileName)) {
                                    fileExtension = fileName.split('.').pop()
                                }
                            }

                            setContent(hljs.highlight(decodedBase64, { language: fileExtension }).value)
                        } catch (error) {
                            const decodedBase64 = atob(fileContent)

                            setContent(hljs.highlight(decodedBase64, { language: 'plaintext' }).value)
                        }
                    } catch (error) {
                        setContent(
                            <div className="text-center p-5">
                                <h5>
                                    <i className="bi bi-exclamation-circle-fill" />
                                    {' '}
                                    {t('can_not_open_file')}
                                </h5>
                                <small className="text-muted">
                                    ERR: CAN_NOT_OPEN_FILE
                                </small>
                                <br />
                                <span>
                                    MSG: {error}
                                </span>
                                <br />
                                <Button variant="link" href={fileDownload} target="_blank">
                                    {t('view_raw_file')}
                                </Button>
                            </div>
                        )
                    }
                } else {
                    setContent(
                        <div className="text-center p-5">
                            <h5>
                                <i className="bi bi-exclamation-circle-fill" />
                                {' '}
                                {t('file_too_large')}
                            </h5>
                            <span className="text-muted">
                                ERR: LIMIT_FILE_SIZE
                            </span>
                            <br />
                            <Button variant="link" href={fileDownload} target="_blank">
                                {t('view_raw_file')}
                            </Button>
                        </div>
                    )
                }

                history.push(dir)

                setDirectory()
                setFile(responseFile)
                setPath(paths)
                setHistory(history)
                return setLoading(false)
            }
        }
    }

    const handleRawShow = () => {
        setContent(
            action.raw.show ? (
                action.raw.rawContent
            ) : (
                action.raw.formatContent
            )
        )
        setAction(
            prev => ({
                ...prev,
                raw: {
                    ...prev.raw,
                    show: !prev.raw.show,
                }
            })
        )
    }
    const handleCopyCode = () => {
        try {
            navigator.clipboard.writeText(
                action.raw.show ? (
                    action.raw.rawContent
                ) : (
                    action.raw.formatContent
                )
            )
        } catch (error) {
            console.error('Error copying text:', error)
        }
    }
    const handleWordWrap = () => {
        setAction(
            prev => ({
                ...prev,
                wordWrap: !prev.wordWrap,
            })
        )
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
                ) : document.tabs.source_code && document.tabs.source_code.content ? (
                    <>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            <Trans
                                t={t}
                                i18nKey="reference_from_github"
                                values={{ name: configs.SITE.SOCIAL_MEDIA.GITHUB }}
                                components={[
                                    <a
                                        href={`https://github.com/${configs.SITE.SOCIAL_MEDIA.GITHUB}/${id}`}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        key={0}
                                    >
                                        https://github.com/{configs.SITE.SOCIAL_MEDIA.GITHUB}/{id}
                                    </a>
                                ]}
                            />
                        </p>
                        <div className="border rounded-4">
                            {
                                path ? (
                                    <Breadcrumb className="pt-3 px-3">
                                        <Breadcrumb.Item
                                            className={`${styles.breadcrumb} align-self-center`}
                                            href={path.length ? (`#${id}-source-code`) : null}
                                            active={path.length <= 0}
                                            onClick={path.length ? () => backToDirectory('', -1) : null}
                                        >
                                            <i className="bi bi-house-fill" />
                                        </Breadcrumb.Item>
                                        {
                                            path.length ? (
                                                path.map((data, index) => {
                                                    if ((index + 1) === path.length) {
                                                        return (
                                                            <Breadcrumb.Item
                                                                className="align-self-center"
                                                                active
                                                                key={index}
                                                            >
                                                                {data}
                                                            </Breadcrumb.Item>
                                                        )
                                                    } else {
                                                        return (
                                                            <Breadcrumb.Item
                                                                className="align-self-center"
                                                                href={`#${id}-source-code`}
                                                                key={index}
                                                                onClick={() => backToDirectory(history, index)}
                                                            >
                                                                {data}
                                                            </Breadcrumb.Item>
                                                        )
                                                    }
                                                })
                                            ) : ''
                                        }
                                        {
                                            loading ? (
                                                <Breadcrumb.Item className="align-self-center">
                                                    <Spinner animation="border" size="sm" />
                                                </Breadcrumb.Item>
                                            ) : ''
                                        }
                                    </Breadcrumb>
                                ) : ''
                            }
                            {
                                directory ? (
                                    <ListGroup className="rounded-4">
                                        {
                                            directory.length ? (
                                                <>
                                                    {
                                                        /* {
                                                            path && path.length ? (
                                                                <button
                                                                    className={loading ? "list-group-item list-group-item-action border-start-0 border-end-0 disabled" : "list-group-item list-group-item-action border-start-0 border-end-0"}
                                                                    type="button"
                                                                    onClick={() => backToDirectory(path, path.length)}
                                                                >
                                                                    <i className="bi bi-folder-fill" /> <span className="projects-source-code-file-name">..</span>
                                                                </button>
                                                            ) : ''
                                                        } */
                                                    }
                                                    {
                                                        directory.map((list, index) => {
                                                            let fileSize = '', icon = ''
                                                            const directoryName = list.name
                                                            const directoryType = list.type
                                                            const directoryPath = list.path
                                                            const directorySize = list.size

                                                            if (directorySize) fileSize = calculateFileSize(directorySize)

                                                            switch (directoryType) {
                                                                case 'file':
                                                                    if (validateImage(directoryName)) {
                                                                        icon = <i className="bi bi-file-image" />
                                                                    } else if (validateAudio(directoryName)) {
                                                                        icon = <i className="bi bi-file-music" />
                                                                    } else if (validateMarkdown(directoryName)) {
                                                                        if (directoryName.toLowerCase() === 'readme.md') {
                                                                            icon = <i className="bi bi-journal" />
                                                                        } else {
                                                                            icon = <i className="bi bi-filetype-md" />
                                                                        }
                                                                    } else if (validatePhotoshop(directoryName)) {
                                                                        icon = <i className="bi bi-filetype-psd" />
                                                                    } else {
                                                                        icon = <i className="bi bi-file-earmark-text" />
                                                                    }
                                                                    break
                                                                case 'dir':
                                                                    icon = <i className="bi bi-folder-fill" />
                                                                    break
                                                                default:
                                                                    icon = <i className="bi bi-exclamation-circle" />
                                                            }

                                                            return (
                                                                <ListGroup.Item
                                                                    className="border-start-0 border-end-0"
                                                                    action
                                                                    key={index}
                                                                    disabled={loading}
                                                                    onClick={directoryType === "file" ? () => openFile(directoryPath) : () => openFolder(directoryPath)}
                                                                >
                                                                    {icon}
                                                                    {' '}
                                                                    <span>
                                                                        {directoryName}
                                                                    </span>
                                                                    {' '}
                                                                    <span className="float-end">
                                                                        {fileSize}
                                                                    </span>
                                                                </ListGroup.Item>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                loading ? (
                                                    Array.from({ length: 8 }), (__, index) => (
                                                        <ListGroup.Item as={Placeholder} animation="glow" key={index}>
                                                            <Placeholder style={{ width: '2%' }} />
                                                            {' '}
                                                            <Placeholder xs={2} />
                                                        </ListGroup.Item>
                                                    )
                                                ) : ''
                                            )
                                        }
                                    </ListGroup>
                                ) : content ? (
                                    <Card className="overflow-hidden rounded-4 border-start-0 border-end-0">
                                        <Card.Header className={styles['header-code']}>
                                            <Row>
                                                <Col className="align-self-center text-start" md={8}>
                                                    <h4>{file.name}</h4>
                                                    <span>
                                                        {t('file_size')}:
                                                        {' '}
                                                        {calculateFileSize(file.size)}
                                                    </span>
                                                    <br />
                                                    <span>
                                                        SHA:
                                                        {' '}
                                                        {file.sha}
                                                    </span>
                                                </Col>
                                                <Col className="align-self-center text-end" md={4}>
                                                    <Stack className="flex-row-reverse" direction="horizontal" gap={2}>
                                                        {
                                                            action.raw.rawContent && action.raw.formatContent ? (
                                                                <Button
                                                                    variant="outline-primary"
                                                                    active={action.raw.show}
                                                                    onClick={() => handleRawShow()}
                                                                >
                                                                    <i className="bi bi-filetype-raw" />
                                                                </Button>
                                                            ) : ''
                                                        }
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => handleCopyCode()}
                                                        >
                                                            <i className="bi bi-files" />
                                                        </Button>
                                                        <Button
                                                            variant="outline-primary"
                                                            active={action.wordWrap}
                                                            onClick={() => handleWordWrap()}
                                                        >
                                                            <i className="bi bi-card-text" />
                                                        </Button>
                                                        <Button href={file.download_url}>
                                                            <i className="bi bi-download" />
                                                            {' '}
                                                            {t('download')}
                                                        </Button>
                                                    </Stack>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            {
                                                action.raw.rawContent && action.raw.formatContent ? (
                                                    action.raw.show ? (
                                                        <pre style={{ whiteSpace: action.wordWrap ? 'break-spaces' : 'pre' }}>
                                                            <code
                                                                style={{ backgroundColor: 'transparent', padding: '0', borderRadius: '0' }}
                                                                id={id + "-" + file.name.toLowerCase() + "-code"}
                                                                dangerouslySetInnerHTML={{ __html: content }}
                                                            />
                                                        </pre>
                                                    ) : (
                                                        <Markdown text={content} />
                                                    )
                                                ) : (
                                                    <pre style={{ whiteSpace: action.wordWrap ? 'break-spaces' : 'pre' }}>
                                                        <code
                                                            style={{ backgroundColor: 'transparent', padding: '0', borderRadius: '0' }}
                                                            id={id + "-" + file.name.toLowerCase() + "-code"}
                                                            dangerouslySetInnerHTML={{ __html: content }}
                                                        />
                                                    </pre>
                                                )
                                            }
                                        </Card.Body>
                                    </Card>
                                ) : (
                                    ''
                                )
                            }
                            <div className="p-2 text-center">
                                <span>
                                    {t('source_code_reader')}
                                    {' '}
                                    v{version}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-code-square mb-3" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                        </svg>
                        <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                            {t('no_source_code_available')}
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
ProjectSourceCode.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object,
    id: PropTypes.string
}
