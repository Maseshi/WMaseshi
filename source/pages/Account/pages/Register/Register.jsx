import ReCAPTCHA from 'react-google-recaptcha'
import { useState, useContext, createRef } from 'react'
import { Card, Image, Form, Stack, Button, Spinner } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

import AuthProviders from '@/components/AuthProviders'
import CookieAccept from '@/components/CookieAccept'
import Head from '@/components/Head'

import configs from '@/configs'

import AuthContext from '@/contexts/AuthContext'
import ThemeContext from '@/contexts/ThemeContext'

import { auth, database } from '@/services/firebase'

import styles from '@/styles/Account.module.css'

import { validateEmail, validatePassword } from '@/utils/validate'

export default function Register() {
    const navigate = useNavigate()
    const reCaptchaRef = createRef()
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.pages.Register' })
    const { currentUser } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState({ validate: '', value: '' })
    const [password, setPassword] = useState({ validate: '', value: '' })
    const [confirmPassword, setConfirmPassword] = useState({ validate: '', value: '' })
    const [rule, setRule] = useState({ validate: '', value: false })
    const [validate, setValidate] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    if (currentUser) navigate('/', { replace: true })

    const handleSubmit = (event) => {
        event.preventDefault()

        const passwordMaxLength = 8

        setEmail((prevData) => ({ ...prevData, validate: '' }))
        setPassword((prevData) => ({ ...prevData, validate: '' }))
        setConfirmPassword((prevData) => ({ ...prevData, validate: '' }))
        setRule((prevData) => ({ ...prevData, validate: '' }))
        setValidate('')
        setIsRegistering(true)

        if (!email.value) {
            setValidate(t('error_invalid_email'))
            return setIsRegistering(false)
        }
        if (!validateEmail(email.value)) {
            setValidate(t('email_format_is_incorrect'))
            return setIsRegistering(false)
        }
        if (!password.value) {
            setValidate(t('error_missing_password'))
            return setIsRegistering(false)
        }
        if (password.value < passwordMaxLength) {
            setValidate(t('password_at_least'))
            return setIsRegistering(false)
        }
        if (!validatePassword(password.value)) {
            setValidate(t('password_format_is_incorrect'))
            return setIsRegistering(false)
        }
        if (!confirmPassword.value) {
            setValidate(t('need_to_verify_password'))
            return setIsRegistering(false)
        }
        if (password.value !== confirmPassword.value) {
            setValidate(t('password_is_not_match'))
            return setIsRegistering(false)
        }
        if (!rule.value) {
            setValidate(
                t('please_accept_rule', { name: configs.SITE.NAME })
            )
            return setIsRegistering(false)
        }

        reCaptchaRef.current.execute()
    }
    const onReCAPTCHAChange = async (value) => {
        if (!value) {
            setValidate(t('can_not_verify'))
            return setIsRegistering(false)
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

            await set(ref(database, `data/users/${userCredential.user.uid}`), {
                description: '',
                gender: '',
                role: 'member',
                rule: {
                    pp: true,
                    tos: true
                }
            })
            await sendEmailVerification(userCredential.user)
            await signInWithEmailAndPassword(auth, email.value, password.value)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setValidate(t('error_email_already_in_use'))
                    return setIsRegistering(false)
                case 'auth/invalid-email':
                    setEmail(
                        (prevData) => ({
                            ...prevData,
                            validate: t('error_invalid_email', { name: configs.SITE.NAME })
                        })
                    )
                    return setIsRegistering(false)
                case 'auth/missing-password':
                    setPassword((prevData) => ({ ...prevData, validate: t('error_missing_password') }))
                    return setIsRegistering(false)
                case 'auth/invalid-value-(email),-starting-an-object-on-a-scalar-field-invalid-value-(password),-starting-an-object-on-a-scalar-field':
                    setValidate(t('error_invalid_email_and_password'))
                    return setIsRegistering(false)
                case 'auth/wrong-password':
                    setValidate(t('error_wrong_password'))
                    return setIsRegistering(false)
                case 'auth/user-not-found':
                    setValidate(t('error_user_not_found'))
                    return setIsRegistering(false)
                case 'auth/too-many-requests':
                    setValidate(t('too_many_requests'))
                    return setIsRegistering(false)
                case 'auth/network-request-failed':
                    setValidate(t('error_network_request_failed'))
                    return setIsRegistering(false)
                default:
                    setValidate(t('error_unknown_problem'))
                    setIsRegistering(false)
                    throw Error(error)
            }
        }

        setIsRegistering(false)
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
                            {configs.SITE.NAME}
                        </div>
                        <h1 className="text-center mb-3">
                            {t('create_new_account')}
                        </h1>
                        <Form
                            className="mb-3"
                            onSubmit={
                                (event) => isRegistering ? (
                                    undefined
                                ) : (
                                    handleSubmit(event)
                                )
                            }
                        >
                            <Form.Group className="mb-3" controlId="registerEmail">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-envelope-fill" />{' '}{t('email')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email.value}
                                    required
                                    disabled={isRegistering}
                                    isInvalid={email.validate.length >= 1}
                                    onChange={(event) => setEmail((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {email.validate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="registerPassword">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-key-fill" />{' '}{t('password')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="password"
                                    placeholder="Abcd1234_"
                                    value={password.value}
                                    required
                                    minLength="8"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\S]{8,}$"
                                    autoComplete="new-password"
                                    disabled={isRegistering}
                                    isInvalid={password.validate.length >= 1}
                                    onChange={(event) => setPassword((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {password.validate}
                                </Form.Control.Feedback>
                                <Form.Text>
                                    {t('password_pattern')}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="registerConfirmPassword">
                                <Form.Label className={styles.label}>
                                    <i className="bi bi-key-fill" />{' '}{t('confirm_password')}
                                </Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    type="password"
                                    placeholder="Abcd1234_"
                                    value={confirmPassword.value}
                                    required
                                    autoComplete="off"
                                    disabled={isRegistering}
                                    isInvalid={confirmPassword.validate.length >= 1}
                                    onChange={(event) => setConfirmPassword((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {confirmPassword.validate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id="registerRule"
                                    label={t('register_rules')}
                                    required
                                    disabled={isRegistering}
                                    isInvalid={rule.validate.length >= 1}
                                    feedback={rule.validate}
                                    feedbackType="invalid"
                                    onChange={(event) => setRule((prevData) => ({ ...prevData, value: event.target.value }))}
                                />
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
                                    disabled={isRegistering}
                                >
                                    {
                                        isRegistering ? (
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
                                    {t('create_new_account')}
                                </Button>
                                <Button
                                    type="button"
                                    variant={theme}
                                    disabled={isRegistering}
                                    onClick={() => handleNavigate()}
                                >
                                    {t('cancel')}
                                </Button>
                            </div>
                        </Form>
                        <Stack direction="horizontal" gap={2}>
                            <Button as={Link} className="me-auto" variant="link" to="/account/sign-in">
                                {t('already_account')}
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
