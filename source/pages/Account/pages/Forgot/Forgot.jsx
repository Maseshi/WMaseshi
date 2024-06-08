import ReCAPTCHA from 'react-google-recaptcha'
import { useState, useContext, createRef } from 'react'
import { Card, Form, Image, Stack, Button, Spinner } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sendPasswordResetEmail } from 'firebase/auth'

import AuthProviders from '@/components/AuthProviders'
import CookieAccept from '@/components/CookieAccept'
import Head from '@/components/Head'

import configs from '@/configs'
import { auth } from '@/services/firebase'

import AuthContext from '@/contexts/AuthContext'
import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Account.module.css'

export default function Forgot() {
    const navigate = useNavigate()
    const reCaptchaRef = createRef()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.pages.Forgot' })
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useContext(AuthContext)
    const [email, setEmail] = useState({ validate: '', value: '' })
    const [validate, setValidate] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [wait, setWait] = useState(0)

    if (currentUser) navigate('/', { replace: true })

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmail((prevData) => ({ ...prevData, validate: '' }))
        setValidate('')
        setIsSending(true)

        if (!email.value) {
            setValidate(t('empty_email'))
            return setIsSending(false)
        }

        reCaptchaRef.current.execute()
    }
    const onReCAPTCHAChange = async (value) => {
        if (!value) {
            setValidate(t('can_not_verify'))
            return setIsSending(false)
        }

        try {
            await sendPasswordResetEmail(auth, email.value)
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setValidate(t('error_account_not_found'))
                    return setIsSending(false)
                case 'auth/too-many-requests':
                    setValidate(t('error_maximum_quota'))
                    return setIsSending(false)
                default:
                    setValidate(t('error_unknown_problem'))
                    setIsSending(false)
                    throw Error(error)
            }
        }

        setIsSuccess(true)

        let count = 60
        const waitTimer = setInterval(() => {
            if (count <= 0) {
                clearInterval(waitTimer)
                setIsSending(false)
                setIsSuccess(false)
                setWait(0)
            } else {
                setIsSending(true)
                setIsSuccess(true)
                setWait(count)
            }
            count -= 1
        }, 1000)
    }
    const handleNavigate = (url = '/') => navigate(url, { replace: true })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject')}
            />

            <main className={styles.auth}>
                <Card className={`${styles.card} card`}>
                    <Card.Body>
                        <div className={styles.brand}>
                            <Image src="/icon.svg" alt="favicon" width='50px' height='50px' />
                            {configs.SITE.NAME}
                        </div>
                        <h1 className="text-center my-3">
                            {t('forgot_password')}
                        </h1>
                        <Form
                            className="mb-3"
                            onSubmit={
                                isSending && wait ? (
                                    ''
                                ) : (
                                    handleSubmit
                                )
                            }
                        >
                            <Form.Group className="mb-3" controlId="forgotEmail">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-envelope-fill" />{' '}{t('email')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email.value}
                                    required
                                    disabled={isSending}
                                    isInvalid={email.validate.length >= 1}
                                    onChange={(event) => setEmail((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {email.validate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                validate && (
                                    validate.length >= 1 ? (
                                        <p className="text-warning text-center mb-3">
                                            {validate}
                                        </p>
                                    ) : (
                                        ''
                                    )
                                )
                            }
                            <div className="d-grid gap-2">
                                <ReCAPTCHA
                                    theme={theme}
                                    ref={reCaptchaRef}
                                    size="invisible"
                                    sitekey={configs.RECAPTCHA_V3_PROVIDER}
                                    onChange={onReCAPTCHAChange}
                                />
                                <Button
                                    type="submit"
                                    disabled={isSending}
                                >
                                    {
                                        wait ? (
                                            ''
                                        ) : (
                                            isSending ? (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <i className="bi bi-envelope" />
                                            )
                                        )
                                    }
                                    {' '}
                                    {
                                        isSuccess ? (
                                            `${wait} ${t('sended_verify_email')}`
                                        ) : (
                                            t('send_verify_email')
                                        )
                                    }
                                </Button>
                                <Button
                                    type="button"
                                    variant={theme}
                                    disabled={isSending}
                                    onClick={() => handleNavigate()}
                                >
                                    {t('cancel')}
                                </Button>
                            </div>
                        </Form>
                        <Stack direction="horizontal" gap={2}>
                            <Button as={Link} className="me-auto" variant="link" to="/account/sign-in">
                                {t('sign_in')}
                            </Button>
                            <Button as={Link} variant="link" to="/account/register">
                                {t('register')}
                            </Button>
                        </Stack>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <hr />
                                    </td>
                                    <td style={{ width: "1px", padding: "0 10px", whiteSpace: "nowrap" }}>
                                        {t('or')}
                                    </td>
                                    <td>
                                        <hr />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center my-3">
                            <AuthProviders />
                        </div>
                        <div className="text-center">
                            <Link to="/privacy-policy">
                                {t('privacy_policy')}
                            </Link>
                            {' '}&bull;{' '}
                            <Link to="/terms-of-service">
                                {t('terms_of_services')}
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </main>

            <CookieAccept />
        </>
    )
}
