import PropTypes from 'prop-types'
import { useState, useContext, useReducer } from 'react'
import { Card, Stack, Image, Form, Button, Badge, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
    updateEmail,
    updatePassword,
    sendEmailVerification,
    linkWithPopup,
    unlink,
    OAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from 'firebase/auth'

import microsoftIcon from '@/assets/icons/microsoft.svg'
import googleIcon from '@/assets/icons/google.webp'
import facebookIcon from '@/assets/icons/facebook.webp'
import githubIcon from '@/assets/icons/github.webp'

import { auth } from '@/services/firebase'

import AuthContext from '@/contexts/AuthContext'

import DialogConfirm from './components/DialogConfirm'

import { validateEmail, validatePassword } from '@/utils/validate'

const emailUpdateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_VALUE':
            return {
                ...state,
                value: action.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SECOND_VALUE':
            return {
                ...state,
                value: state.value,
                secondValue: action.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SECOND_VALIDATE':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: action.secondValidate,
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_INIT':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: ''
            }
        case 'UPDATING':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: true,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: true,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_FAILED':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: true,
                isLoading: false,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}
const passwordUpdateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_VALUE':
            return {
                ...state,
                value: action.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SECOND_VALUE':
            return {
                ...state,
                value: state.value,
                secondValue: action.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SECOND_VALIDATE':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: action.secondValidate,
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_INIT':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: ''
            }
        case 'UPDATING':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: false,
                isLoading: true,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: true,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_FAILED':
            return {
                ...state,
                value: state.value,
                secondValue: state.secondValue,
                secondValidate: '',
                isSuccess: false,
                isError: true,
                isLoading: false,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export default function AccountSecurity() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountSecurity' })
    const { currentUser, isLoading } = useContext(AuthContext)
    const [showEmailConfirmDialog, setShowEmailConfirmDialog] = useState(false)
    const [emailState, emailDispatch] = useReducer(emailUpdateReducer, {
        value: '',
        secondValue: '',
        secondValidate: '',
        isSuccess: false,
        isError: false,
        isLoading: false,
        errorMessage: ''
    })
    const [showPasswordConfirmDialog, setShowPasswordConfirmDialog] = useState(false)
    const [passwordState, passwordDispatch] = useReducer(passwordUpdateReducer, {
        value: '',
        secondValue: '',
        secondValidate: '',
        isSuccess: false,
        isError: false,
        isLoading: false,
        errorMessage: ''
    })
    const [isVerified, setIsVerified] = useState(false)
    const [isSendingVerifyEmail, setIsSendingVerifyEmail] = useState(false)
    const [waitVerifyEmail, setWaitVerifyEmail] = useState(0)

    const passwordMinLength = 8

    const handleAuthProvider = (method, action) => {
        let provider

        switch (method) {
            case 'microsoft':
                provider = new OAuthProvider('microsoft.com')
                break
            case 'google':
                provider = new GoogleAuthProvider()
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
                break
            case 'facebook':
                provider = new FacebookAuthProvider()
                break
            case 'github':
                provider = new GithubAuthProvider()
                break
            default:
                break
        }

        if (action === 'link') {
            try {
                linkWithPopup(auth.currentUser, provider)
            } catch (error) {
                const errorCode = error.code
                const errorMessage = error.message

                console.log(errorCode, errorMessage)
            }
        }
        if (action === 'unlink') {
            try {
                unlink(auth.currentUser, provider)
            } catch (error) {
                const errorCode = error.code
                const errorMessage = error.message

                console.log(errorCode, errorMessage)
            }
        }
    }
    const handleToggleEmailConfirmDialog = (event) => {
        if (event?.isVerified) {
            setIsVerified(true)
        } else {
            event?.preventDefault()
        }

        setShowEmailConfirmDialog(!showEmailConfirmDialog)
    }
    const handleChangeEmail = async (event) => {
        event?.preventDefault()

        emailDispatch({ type: 'UPDATING' })

        if (!emailState.value) {
            return emailDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('type_your_new_email')
            })
        }
        if (!validateEmail(emailState.value)) {
            return emailDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('email_format_is_incorrect')
            })
        }
        if (!emailState.secondValue) {
            return emailDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('type_confirm_new_email')
            })
        }
        if (emailState.value !== emailState.secondValue) {
            return emailDispatch({
                type: 'UPDATE_SECOND_VALIDATE',
                secondValidate: t('email_does_not_match')
            })
        }

        try {
            await updateEmail(currentUser, emailState.value)
        } catch (error) {
            emailDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: error
            })
            return setTimeout(() => emailDispatch({ type: 'UPDATE_INIT' }), 3000)
        }

        emailDispatch({ type: 'UPDATE_SUCCESS' })
        setTimeout(() => emailDispatch({ type: 'UPDATE_INIT' }), 3000)
    }
    const handleTogglePasswordConfirmDialog = (event) => {
        if (event?.isVerified) {
            setIsVerified(true)
        } else {
            event?.preventDefault()
        }

        setShowPasswordConfirmDialog(!showPasswordConfirmDialog)
    }
    const handleChangePassword = async (event) => {
        event?.preventDefault()

        passwordDispatch({ type: 'UPDATING' })

        if (!passwordState.value) {
            return passwordDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('type_your_new_password')
            })
        }
        if (passwordState.value < passwordMinLength) {
            return passwordDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('password_must_least_more_than', { number: passwordMinLength })
            })
        }
        if (!validatePassword(passwordState.value)) {
            return passwordDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('password_format_is_incorrect', { number: passwordMinLength })
            })
        }
        if (!passwordState.secondValue) {
            return passwordDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: t('type_confirm_new_password')
            })
        }
        if (passwordState.value !== passwordState.secondValue) {
            return passwordDispatch({
                type: 'UPDATE_SECOND_VALIDATE',
                secondValidate: t('password_does_not_match')
            })
        }

        try {
            await updatePassword(currentUser, passwordState.value)
        } catch (error) {
            passwordDispatch({
                type: 'UPDATE_FAILED',
                errorMessage: error
            })
            return setTimeout(() => passwordDispatch({ type: 'UPDATE_INIT' }), 3000)
        }

        passwordDispatch({ type: 'UPDATE_SUCCESS' })
        setTimeout(() => passwordDispatch({ type: 'UPDATE_INIT' }), 3000)
    }
    const handleSendVerifyEmail = async () => {
        setIsSendingVerifyEmail(true)

        try {
            await sendEmailVerification(currentUser)
        } catch (error) {
            setIsSendingVerifyEmail(false)
            return console.log(error)
        }

        setTimeout(() => {
            let count = 57
            const waitTimer = setInterval(() => {
                if (count <= 0) {
                    clearInterval(waitTimer)
                    setIsSendingVerifyEmail(false)
                    setWaitVerifyEmail(0)
                } else {
                    setIsSendingVerifyEmail(true)
                    setWaitVerifyEmail(count)
                }
                count -= 1
            }, 1000)
        }, 3000)
    }

    const AuthProvider = ({ icon, id, provider, name }) => {
        const authProviderIDs = currentUser ? currentUser.providerData.map(data => data.providerId) : []
        const isLinked = authProviderIDs.includes(id)

        return (
            <Card className="rounded-4 mb-3">
                <Card.Body as={Stack} direction="horizontal" gap={3}>
                    <Image src={icon} alt={provider} width="25px" height="25px" style={provider === 'github' ? { filter: 'invert(100%)' } : null} />
                    <span className="me-auto">{name}</span>
                    {
                        !isLoading && (
                            isLinked ? (
                                <Stack direction="horizontal" gap={3}>
                                    <span className="user-select-all align-middle">
                                        {
                                            currentUser ? (
                                                currentUser.providerData.find(data => data.providerId === id)?.displayName ?? t('unknown')
                                            ) : (
                                                ''
                                            )
                                        }
                                    </span>
                                    <div className="vr" />
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleAuthProvider(provider, 'unlink')}
                                    >
                                        {t('unlink')}
                                    </Button>
                                </Stack>
                            ) : (
                                <Button onClick={() => handleAuthProvider(provider, 'link')}>
                                    {t('link')}
                                </Button>
                            )
                        )
                    }
                </Card.Body>
            </Card>
        )
    }
    AuthProvider.propTypes = {
        icon: PropTypes.node,
        id: PropTypes.string,
        provider: PropTypes.string,
        name: PropTypes.string
    }

    return (
        <Card className="rounded-4">
            <Card.Body>
                <Card.Title as="h3">
                    {t('security')}
                </Card.Title>
                <Card.Text>
                    {t('security_description')}
                </Card.Text>
                <br />
                <h4 className="text-primary mb-3">
                    {t('change_account_data')}
                </h4>
                <Form
                    onSubmit={
                        (event) => (
                            isVerified ? (
                                isLoading || emailState.isLoading ? (
                                    ''
                                ) : (
                                    handleChangeEmail(event)
                                )
                            ) : (
                                isLoading || emailState.isLoading ? (
                                    ''
                                ) : (
                                    handleToggleEmailConfirmDialog(event)
                                )
                            )
                        )
                    }
                >
                    <Form.Group className="mb-3" controlId="securityNewEmail">
                        <Form.Label>
                            {t('new_email')}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            disabled={isLoading || emailState.isLoading}
                            value={emailState.value}
                            required
                            onChange={
                                (event) => {
                                    emailDispatch({
                                        type: 'UPDATE_VALUE',
                                        value: event.target.value
                                    })
                                }
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="securityVerifyNewEmail">
                        <Form.Label>
                            {t('confirm_new_email')}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="off"
                            disabled={isLoading || emailState.isLoading}
                            value={emailState.secondValue}
                            required
                            isInvalid={emailState.secondValidate.length >= 1}
                            onChange={
                                (event) => {
                                    emailDispatch({
                                        type: 'UPDATE_SECOND_VALUE',
                                        secondValue: event.target.value
                                    })
                                }
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailState.secondValidate}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Stack direction="horizontal" gap={2}>
                        {
                            emailState.errorMessage ? (
                                <>
                                    <span className="text-warning">
                                        {emailState.errorMessage}
                                    </span>
                                    <div className="vr"></div>
                                </>
                            ) : (
                                ''
                            )
                        }
                        <Button
                            type="submit"
                            className={
                                emailState.errorMessage ? (
                                    ''
                                ) : (
                                    'ms-auto'
                                )
                            }
                            disabled={isLoading || emailState.isLoading}
                        >
                            {
                                emailState.isLoading ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : emailState.isSuccess ? (
                                    <i className="bi bi-check-circle" />
                                ) : emailState.isError ? (
                                    <i className="bi bi-x-circle" />
                                ) : isVerified ? (
                                    ''
                                ) : (
                                    <i className="bi bi-lock" />
                                )
                            }
                            {' '}
                            {t('update')}
                        </Button>
                        <DialogConfirm
                            show={showEmailConfirmDialog}
                            onHide={handleToggleEmailConfirmDialog}
                            onExited={
                                () => (
                                    emailState.isLoading ? (
                                        null
                                    ) : isVerified ? (
                                        handleChangeEmail()
                                    ) : (
                                        null
                                    )
                                )
                            }
                        />
                    </Stack>
                </Form>
                <hr className="pb-2 mt-4" />
                <Form
                    onSubmit={
                        (event) => (
                            isVerified ? (
                                isLoading || passwordState.isLoading ? (
                                    ''
                                ) : (
                                    handleChangePassword(event)
                                )
                            ) : (
                                isLoading || passwordState.isLoading ? (
                                    ''
                                ) : (
                                    handleTogglePasswordConfirmDialog(event)
                                )
                            )
                        )
                    }
                >
                    <Form.Group className="mb-3" controlId="securityNewPassword">
                        <Form.Label>
                            {t('new_password')}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Abcd1234_"
                            minLength={passwordMinLength}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\S]{8,}$"
                            autoComplete="new-password"
                            disabled={isLoading || passwordState.isLoading}
                            value={passwordState.value}
                            required
                            onChange={
                                (event) => {
                                    passwordDispatch({
                                        type: 'UPDATE_VALUE',
                                        value: event.target.value
                                    })
                                }
                            }

                        />
                        <Form.Text>
                            {t('new_password_description', { number: passwordMinLength })}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="securityVerifyNewPassword">
                        <Form.Label>
                            {t('confirm_new_password')}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Abcd1234_"
                            autoComplete="off"
                            disabled={isLoading || passwordState.isLoading}
                            value={passwordState.secondValue}
                            isInvalid={passwordState.secondValidate.length >= 1}
                            required
                            onChange={
                                (event) => {
                                    passwordDispatch({
                                        type: 'UPDATE_SECOND_VALUE',
                                        secondValue: event.target.value
                                    })
                                }
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {passwordState.secondValidate}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <p>
                        {t('last_change_password')}:
                        {' '}
                        <span className="text-decoration-underline">
                            {
                                currentUser && (
                                    currentUser.reloadUserInfo ? (
                                        new Date(currentUser.reloadUserInfo.passwordUpdatedAt).toLocaleString(i18n.language, { dateStyle: 'long', timeStyle: 'medium' })
                                    ) : (
                                        t('unknown')
                                    )
                                )
                            }
                        </span>
                    </p>
                    <Stack direction="horizontal" gap={2}>
                        {
                            passwordState.errorMessage ? (
                                <>
                                    <span className="text-warning ms-auto">
                                        {passwordState.errorMessage}
                                    </span>
                                    <div className="vr"></div>
                                </>
                            ) : (
                                ''
                            )
                        }
                        <Button
                            type="submit"
                            className={
                                passwordState.errorMessage ? (
                                    ''
                                ) : (
                                    'ms-auto'
                                )
                            }
                            disabled={isLoading || passwordState.isLoading}
                        >
                            {
                                passwordState.isLoading ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : passwordState.isSuccess ? (
                                    <i className="bi bi-check-circle" />
                                ) : passwordState.isError ? (
                                    <i className="bi bi-x-circle" />
                                ) : isVerified ? (
                                    ''
                                ) : (
                                    <i className="bi bi-lock" />
                                )
                            }
                            {' '}
                            {t('update')}
                        </Button>
                        <DialogConfirm
                            show={showPasswordConfirmDialog}
                            onHide={handleTogglePasswordConfirmDialog}
                            onExited={
                                () => (
                                    passwordState.isLoading ? (
                                        null
                                    ) : isVerified ? (
                                        handleChangePassword()
                                    ) : (
                                        null
                                    )
                                )
                            }
                        />
                    </Stack>
                </Form>
                <br />
                <h4 className="text-primary mb-3">
                    {t('verification')}
                </h4>
                <Card className="rounded-4 mb-3">
                    <Card.Body as={Stack} direction="horizontal" gap={3}>
                        {
                            isLoading ? (
                                <Badge pill bg="secondary">
                                    <Spinner animation="border" size="sm" />
                                </Badge>
                            ) : (
                                currentUser ? (
                                    currentUser.emailVerified ? (
                                        <Badge pill bg="success">
                                            {t('confirmed')}
                                        </Badge>
                                    ) : (
                                        <Badge pill bg="warning">
                                            {t('unconfirmed')}
                                        </Badge>
                                    )
                                ) : (
                                    <Badge pill bg="secondary">
                                        {t('please_sign_in')}
                                    </Badge>
                                )
                            )
                        }
                        <span className="me-auto">
                            {t('confirm_your_email')}
                        </span>
                        {
                            isLoading ? '' : (
                                currentUser ? (
                                    currentUser.emailVerified ? '' : (
                                        <Button
                                            disabled={isSendingVerifyEmail || waitVerifyEmail}
                                            onClick={
                                                (event) => isSendingVerifyEmail ? (
                                                    null
                                                ) : waitVerifyEmail > 0 ? (
                                                    null
                                                ) : (
                                                    handleSendVerifyEmail(event)
                                                )
                                            }
                                        >
                                            {
                                                waitVerifyEmail > 0 ? (
                                                    waitVerifyEmail.toString()
                                                ) : (
                                                    ''
                                                )
                                            }
                                            {' '}
                                            ส่ง
                                        </Button>
                                    )
                                ) : ''
                            )
                        }
                    </Card.Body>
                </Card>
                <Card className="rounded-4">
                    <Card.Body as={Stack} direction="horizontal" gap={3}>
                        <Badge pill bg="secondary">
                            {t('unavailable')}
                        </Badge>
                        <span className="me-auto">
                            {t('two_factor')}
                        </span>
                    </Card.Body>
                </Card>
                <br />
                <h4 className="text-primary mb-3">
                    {t('link_to_account')}
                </h4>
                <AuthProvider icon={microsoftIcon} id="microsoft.com" provider="microsoft" name="Microsoft" />
                <AuthProvider icon={googleIcon} id="google.com" provider="google" name="Google" />
                <AuthProvider icon={facebookIcon} id="facebook.com" provider="facebook" name="Facebook" />
                <AuthProvider icon={githubIcon} id="github.com" provider="github" name="Github" />
            </Card.Body>
        </Card>
    )
}
