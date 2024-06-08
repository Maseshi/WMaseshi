import ReCAPTCHA from 'react-google-recaptcha'
import { useState, createRef, useContext } from 'react'
import { Row, Col, Card, Form, FloatingLabel, Button, Alert, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import EMAIL from '@/assets/html/email.html?raw'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

import { validateEmail } from '@/utils/validate'

export default function ContactContent() {
    const reCaptchaRef = createRef()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Contact' })
    const { theme } = useContext(ThemeContext)
    const [name, setName] = useState({ validate: '', value: '' })
    const [email, setEmail] = useState({ validate: '', value: '' })
    const [subject, setSubject] = useState({ validate: '', value: '' })
    const [message, setMessage] = useState({ validate: '', value: '' })
    const [result, setResult] = useState({ variant: 'success', text: '' })
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        const subjectMinLength = 5
        const subjectMaxLength = 200
        const messageMinLength = 10
        const messageMaxLength = 1000

        setName((prevData) => ({ ...prevData, validate: '' }))
        setEmail((prevData) => ({ ...prevData, validate: '' }))
        setSubject((prevData) => ({ ...prevData, validate: '' }))
        setMessage((prevData) => ({ ...prevData, validate: '' }))
        setResult({ variant: 'success', text: '' })
        setIsSending(true)

        if (!name) {
            setResult(t('type_your_name'))
            return setIsSending(false)
        }
        if (!email) {
            setResult(t('type_your_email'))
            return setIsSending(false)
        }
        if (!validateEmail(email)) {
            setResult(t('email_format_is_incorrect'))
            return setIsSending(false)
        }
        if (!subject) {
            setResult(t('type_your_subject'))
            return setIsSending(false)
        }
        if (subject.length < subjectMinLength) {
            setResult(t('subject_too_short'))
            return setIsSending(false)
        }
        if (subject.length > subjectMaxLength) {
            setResult(t('subject_too_long'))
            return setIsSending(false)
        }
        if (!message) {
            setResult(t('type_your_message'))
            return setIsSending(false)
        }
        if (message.length < messageMinLength) {
            setResult(t('message_too_short'))
            return setIsSending(false)
        }
        if (message.length > messageMaxLength) {
            setResult(t('message_too_long'))
            return setIsSending(false)
        }

        reCaptchaRef.current.execute()
    }
    const onReCAPTCHAChange = async (captchaCode) => {
        if (!captchaCode) return

        const response = await new Promise((resolve) => {
            let req = new XMLHttpRequest()
            let body = JSON.stringify({
                Host: configs.SMTP.HOST,
                Username: configs.SMTP.USERNAME,
                Password: configs.SMTP.PASSWORD,
                To: 'dermhioasw123@gmail.com',
                From: 'dermhioasw123@gmail.com',
                Subject: subject,
                Body: EMAIL.replace('{name}', name).replace('{email}', email).replace('{subject}', subject).replace('{message}', message),
                nocache: Math.floor(1e6 * Math.random() + 1),
                Action: "Send"
            })

            req.open('POST', 'https://smtpjs.com/v3/smtpjs.aspx')
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            req.onload = async () => resolve(await req.responseText)
            req.send(body)
        })

        if (response === 'OK') {
            setResult((prevData) => ({ ...prevData, text: t('sended_your_contact') }))
        } else {
            setResult({ variant: 'danger', text: t('error_while_sending') })
        }

        reCaptchaRef.current.reset()
    }

    return (
        <section>
            <Row className="g-4">
                <Col md={8}>
                    <Card
                        as={Form}
                        className="rounded-4"
                        onSubmit={
                            isSending ? (
                                ''
                            ) : (
                                handleSubmit
                            )
                        }
                    >
                        <Card.Body className="p-5">
                            <Card.Title as="h2">
                                {t('contact_our')}
                            </Card.Title>
                            <Card.Text>
                                {t('contact_our_description')}
                            </Card.Text>
                            <FloatingLabel
                                controlId="nameContact"
                                label={
                                    (
                                        <>
                                            <i className="bi bi-info" />{' '}{t('name')}
                                        </>
                                    )
                                }
                                className="mb-3"
                            >
                                <Form.Control
                                    className="rounded-4"
                                    type="text"
                                    value={name.value}
                                    disabled={isSending}
                                    placeholder={t('fill_your_name')}
                                    isInvalid={name.validate.length >= 1}
                                    onChange={(event) => setName((prevData) => ({ ...prevData, value: event.target.value }))}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="emailContact"
                                label={
                                    (
                                        <>
                                            <i className="bi bi-envelope" />{' '}{t('email_address')}
                                        </>
                                    )
                                }
                                className="mb-3"
                            >
                                <Form.Control
                                    className="rounded-4"
                                    type="email"
                                    value={email.value}
                                    disabled={isSending}
                                    placeholder={t('fill_your_email_address')}
                                    isInvalid={email.validate.length >= 1}
                                    onChange={(event) => setEmail((prevData) => ({ ...prevData, value: event.target.value }))}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="subjectContact"
                                label={
                                    (
                                        <>
                                            <i className="bi bi-type" />{' '}{t('subject')}
                                        </>
                                    )
                                }
                                className="mb-3"
                            >
                                <Form.Control
                                    className="rounded-4"
                                    type="text"
                                    value={subject.value}
                                    disabled={isSending}
                                    minLength={5}
                                    maxLength={200}
                                    placeholder={t('fill_your_subject')}
                                    isInvalid={subject.validate.length >= 1}
                                    onChange={(event) => setSubject((prevData) => ({ ...prevData, value: event.target.value }))}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="messageContact"
                                label={
                                    <>
                                        <i className="bi bi-chat-right-text" />
                                        {' '}
                                        {t('message')}
                                    </>
                                }
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    className="rounded-4"
                                    value={message.value}
                                    disabled={isSending}
                                    minLength={10}
                                    maxLength={1000}
                                    placeholder={t('fill_your_message')}
                                    isInvalid={message.validate.length >= 1}
                                    onChange={(event) => setMessage((prevData) => ({ ...prevData, value: event.target.value }))}
                                    style={{ minHeight: '100px' }}
                                    required
                                />
                            </FloatingLabel>
                            {
                                result && (
                                    result.text.length >= 1 ? (
                                        <Alert variant={result.variant}>
                                            {result.text}
                                        </Alert>
                                    ) : (
                                        ''
                                    )
                                )
                            }
                            <ReCAPTCHA
                                ref={reCaptchaRef}
                                size="invisible"
                                sitekey={configs.RECAPTCHA_V3_PROVIDER}
                                onChange={onReCAPTCHAChange}
                                theme={theme}
                            />
                            <Button
                                id="submitContact"
                                className="w-100"
                                variant="primary"
                                type="submit"
                            >
                                {
                                    isSending ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <i className="bi bi-send" />
                                    )
                                }
                                {' '}
                                {t('send')}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <div className="mb-3">
                        <h3>
                            {t('services')}
                        </h3>
                        <p className="lead">
                            {t('services_description', { full_name: configs.SITE.COPYRIGHTS })}
                        </p>
                    </div>
                    <div className="mb-3">
                        <h3>
                            {t('location')}
                        </h3>
                        <p className="lead">
                            {t('thailand')}
                        </p>
                    </div>
                    <div className="mb-3">
                        <h3>
                            {t('contact')}
                        </h3>
                        <a href={`mailto:${configs.SITE.EMAIL}`}>
                            {configs.SITE.EMAIL}
                        </a>
                        <br />
                        <a href={`tel:${configs.SITE.PHONE}`}>
                            {configs.SITE.PHONE}
                        </a>
                    </div>
                </Col>
            </Row>
        </section>
    )
}
