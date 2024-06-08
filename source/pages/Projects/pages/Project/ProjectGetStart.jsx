import PropTypes from 'prop-types'
import { useState } from 'react'
import { Spinner, Row, Col, Button, Form, Image, InputGroup, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { HfInference } from '@huggingface/inference'

import config from '@/configs'

import Markdown from '@/libs/Markdown'

export default function ProjectGetStart({ data, document, id }) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.pages.Project.ProjectGetStart' })
    const [compute, setCompute] = useState({
        status: 100,
        prompt: '',
        negative_prompt: '',
        seed: Math.floor(Math.random() * 1000000000),
        model: 'stabilityai/stable-diffusion-2',
        compute_time: 0,
        device: null,
        src: null
    })

    const inference = new HfInference(config.HF_ACCESS_TOKEN)

    if (!data.isLoading) {
        const content = document.tabs.get_start.content
        const type = document.tabs.get_start.type

        if (content && type && type === 'huggingface') {
            if (content.startsWith('---')) {
                const position = content.indexOf('---', 3)
                const metadata = content.substring(0, (position + 3))

                document.tabs.get_start.content = content.replace(metadata, '')
            }
        }
    }

    const handleCompute = async () => {
        setCompute(prev => ({ ...prev, status: 102 }))

        try {
            const model = `Maseshi/${document.tabs.get_start.host.repo_model}`
            const prompt = compute.prompt
            const negativePrompt = 'blurry'
            const seed = Math.floor(Math.random() * 1000000000)
            const startTime = new Date().getTime()
            const result = await inference.textToImage({
                inputs: `${prompt}, ${seed}`,
                negative_prompt: negativePrompt,
                model: model
            })
            const endTime = new Date().getTime()
            const computeTime = ((endTime - startTime) / 1000)

            if (result.size) {
                setCompute(
                    prev => ({
                        ...prev,
                        status: 200,
                        prompt: prompt,
                        negative_prompt: negativePrompt,
                        seed: seed,
                        model: model,
                        compute_time: computeTime,
                        device: computeTime <= 100 ? 'gpu' : 'cpu',
                        src: URL.createObjectURL(result)
                    })
                )
            } else {
                setCompute(prev => ({ ...prev, status: 400 }))
            }
        } catch (error) {
            console.log(error)
            setCompute(prev => ({ ...prev, status: 500 }))
        }
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
                ) : document.tabs.get_start && document.tabs.get_start.content ? (
                    document.tabs.get_start.host.enable ? (
                        <Row>
                            <Col md={{ span: 8, order: 'first' }} xs={{ order: 'last' }}>
                                <Markdown text={document.tabs.get_start.content} />
                            </Col>
                            <Col className="mb-3" md={{ span: 4, order: 'last' }} xs={{ order: 'first' }}>
                                <h6 className="mb-3">
                                    <i className="text-warning bi bi-lightning-charge-fill" />
                                    {' '}
                                    <strong>
                                        {t('hosted_inference_api')}
                                    </strong>
                                </h6>
                                <InputGroup>
                                    <Form.Control
                                        className="rounded-start-3"
                                        placeholder={t('type_your_sentences')}
                                        aria-label={t('input_data')}
                                        aria-describedby={`${id}ComputeButton`}
                                        disabled={compute.status === 102}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        className="rounded-end-3"
                                        id={`${id}ComputeButton`}
                                        disabled={compute.status === 102}
                                        onClick={() => handleCompute()}
                                    >
                                        {
                                            compute.status === 102 ? (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                ''
                                            )
                                        }
                                        {' '}
                                        {t('compute')}
                                    </Button>
                                </InputGroup>
                                <Form.Text>
                                    {
                                        compute.status === 100 ? (
                                            t('inference_api')
                                        ) : compute.status === 200 ? (
                                            t('time_to_compute', {
                                                device: compute.device.toUpperCase(),
                                                time: compute.compute_time
                                            })
                                        ) : compute.status === 400 ? (
                                            t('request_has_been_reset')
                                        ) : compute.status === 500 ? (
                                            t('host_error')
                                        ) : (
                                            ''
                                        )
                                    }
                                </Form.Text>
                                {
                                    compute ? (
                                        <Image
                                            rounded
                                            className="mt-3 mb-3"
                                            src={compute.src}
                                            alt={compute.prompt}
                                        />
                                    ) : ''
                                }
                                <Card className="rounded-4 mt-3">
                                    <Card.Body>
                                        <Card.Title>
                                            <i className="bi bi-bookmark" />
                                            {' '}
                                            {t('frequently_asked_questions')}
                                        </Card.Title>
                                        <Card.Text as="ul">
                                            <li>
                                                <span className="fw-bold">
                                                    {t('why_is_black')}
                                                </span>
                                                <p className="text-secondary">
                                                    {t('is_have_delicate')}
                                                </p>
                                            </li>
                                            <li>
                                                <span className="fw-bold">
                                                    {t('compute_vary_long')}
                                                </span>
                                                <p className="text-secondary">
                                                    {t('is_downloading_or_cpu')}
                                                </p>
                                            </li>
                                            <li>
                                                <span className="fw-bold">
                                                    {t('can_view_history')}
                                                </span>
                                                <p className="text-secondary">
                                                    {t('compute_data_delete_automatic')}
                                                </p>
                                            </li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Markdown text={document.tabs.get_start.content} />
                    )
                ) : (
                    <div className="text-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-card-heading mb-3" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                            <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
                        </svg>
                        <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                            {t('document_not_found')}
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
ProjectGetStart.propTypes = {
    data: PropTypes.object,
    document: PropTypes.object,
    id: PropTypes.string
}