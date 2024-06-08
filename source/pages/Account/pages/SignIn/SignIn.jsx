import ReCAPTCHA from 'react-google-recaptcha'
import { useState, useContext, createRef } from 'react'
import { Card, Image, Form, Stack, Button, Spinner } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signInWithEmailAndPassword } from 'firebase/auth'

import AuthProviders from '@/components/AuthProviders'
import CookieAccept from '@/components/CookieAccept'
import Head from '@/components/Head'

import configs from '@/configs'
import { auth } from '@/services/firebase'

import AuthContext from '@/contexts/AuthContext'
import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Account.module.css'

export default function SignIn() {
    const navigate = useNavigate()
    const reCaptchaRef = createRef()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.pages.SignIn' })
    const { currentUser } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState({ validate: '', value: '' })
    const [password, setPassword] = useState({ validate: '', value: '' })
    const [validate, setValidate] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)

    if (currentUser) navigate('/', { replace: true })

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmail((prevData) => ({ ...prevData, validate: '' }))
        setPassword((prevData) => ({ ...prevData, validate: '' }))
        setValidate('')
        setIsSigningIn(true)

        if (!email.value) {
            setValidate(t('error_invalid_email'))
            return setIsSigningIn(false)
        }
        if (!password.value) {
            setValidate(t('error_missing_password'))
            return setIsSigningIn(false)
        }

        reCaptchaRef.current.execute()
    }
    const onReCAPTCHAChange = async (value) => {
        if (!value) {
            setValidate('')
            return setIsSigningIn(false)
        }

        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setValidate(t('error_email_already_in_use'))
                    return setIsSigningIn(false)
                case 'auth/invalid-email':
                    setEmail(
                        (prevData) => ({
                            ...prevData,
                            validate: t('error_invalid_email', { name: configs.SITE.NAME })
                        })
                    )
                    return setIsSigningIn(false)
                case 'auth/missing-password':
                    setPassword((prevData) => ({ ...prevData, validate: t('error_missing_password') }))
                    return setIsSigningIn(false)
                case 'auth/invalid-value-(email),-starting-an-object-on-a-scalar-field-invalid-value-(password),-starting-an-object-on-a-scalar-field':
                    setValidate(t('error_invalid_email_and_password'))
                    return setIsSigningIn(false)
                case 'auth/wrong-password':
                    setValidate(t('error_wrong_password'))
                    return setIsSigningIn(false)
                case 'auth/user-not-found':
                    setValidate(t('error_user_not_found'))
                    return setIsSigningIn(false)
                case 'auth/too-many-requests':
                    setValidate(t('error_too_many_requests'))
                    return setIsSigningIn(false)
                case 'auth/network-request-failed':
                    setValidate(t('error_network_request_failed'))
                    return setIsSigningIn(false)
                default:
                    setValidate(t('error_unknown_problem'))
                    setIsSigningIn(false)
                    throw Error(error)
            }
        }

        setIsSigningIn(false)
        handleNavigate()

        reCaptchaRef.current.reset()
    }
    const handleNavigate = (url = '/') => navigate(url, { replace: true })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description', { name: configs.SITE.NAME })}
                subject={t('website_subject')}
            />

            <main className={styles.auth}>
                <Card className={styles.card}>
                    <Card.Body>
                        <div className={styles.brand}>
                            <Image src="/icon.svg" alt="favicon" width="50px" height="50px" />
                            MASE<span className="text-primary">SHI</span>
                        </div>
                        <h1 className="text-center my-3">
                            {t('sign_in')}
                        </h1>
                        <Form className="mb-3" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="signInEmail">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-envelope-fill" />{' '}{t('email')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email.value}
                                    required
                                    disabled={isSigningIn}
                                    isInvalid={email.validate.length >= 1}
                                    onChange={(event) => setEmail((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {email.validate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="signInPassword">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-key-fill" />{' '}{t('password')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="password"
                                    placeholder="Abcd1234_"
                                    value={password.value}
                                    required
                                    disabled={isSigningIn}
                                    isInvalid={password.validate.length >= 1}
                                    onChange={(event) => setPassword((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {password.validate}
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
                                    disabled={isSigningIn}
                                >
                                    {
                                        isSigningIn ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <i className="bi bi-box-arrow-in-right" />
                                        )
                                    }
                                    {' '}
                                    {t('sign_in')}
                                </Button>
                                <Button
                                    type="button"
                                    variant={theme}
                                    disabled={isSigningIn}
                                    onClick={() => handleNavigate()}
                                >
                                    {t('cancel')}
                                </Button>
                            </div>
                        </Form>
                        <Stack direction="horizontal" gap={2}>
                            <Button as={Link} className="me-auto" variant="link" to="/account/register">
                                {t('register')}
                            </Button>
                            <Button as={Link} variant="link" to="/account/forgot">
                                {t('forgot_password')}
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
                            {' '}
                            &bull;
                            {' '}
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
