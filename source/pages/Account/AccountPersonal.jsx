import { useState, useEffect, useContext, useReducer } from 'react'
import {
    Card,
    Image,
    Placeholder,
    Form,
    Button,
    Row,
    Col,
    Spinner,
    OverlayTrigger,
    Tooltip,
    Stack
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { updateProfile } from 'firebase/auth'
import { ref as databaseRef, update } from 'firebase/database'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import configs from '@/configs'
import { database, storage } from '@/services/firebase'

import AuthContext from '@/contexts/AuthContext'

import { resizeImage } from '@/utils/resizeImage'

const updateProfileReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_INIT':
            return {
                ...state,
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: ''
            }
        case 'UPDATING':
            return {
                ...state,
                isSuccess: false,
                isError: false,
                isLoading: true,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'UPDATE_FAILED':
            return {
                ...state,
                isSuccess: false,
                isError: true,
                isLoading: false,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export default function AccountPersonal() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountPersonal' })
    const { currentUser, userData, isLoading } = useContext(AuthContext)
    const [isUploading, setIsUploading] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [gender, setGender] = useState('unspecified')
    const [license, setLicense] = useState('')
    const [state, dispatch] = useReducer(updateProfileReducer, {
        isSuccess: false,
        isError: false,
        isLoading: false,
        errorMessage: ''
    })

    const displayNameMaxLength = 15
    const licenseMaxLength = 300

    useEffect(() => {
        setDisplayName(currentUser ? (currentUser.displayName ?? '') : '')
        setGender(userData ? (userData.gender ?? 'unspecified') : 'unspecified')
        setLicense(userData ? (userData.license ?? '') : '')
    }, [currentUser, userData])

    const handleUploadAvatar = async (event) => {
        const storageRef = ref(storage, `users/${currentUser.uid}/avatar`)

        setIsUploading(true)

        const file = event.target.files[0]
        const resizedImage = await resizeImage(file, 200, 200)
        const avatarSnapshot = await uploadBytes(storageRef, resizedImage)
        const avatarURL = await getDownloadURL(avatarSnapshot.ref)

        await updateProfile(currentUser, { photoURL: avatarURL })

        setIsUploading(false)
    }
    const handleResetAvatar = async () => {
        const storageRef = ref(storage, `users/${currentUser.uid}/avatar`)

        setIsUploading(true)

        await deleteObject(storageRef)
        await updateProfile(currentUser, { photoURL: null })

        setIsUploading(false)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        const userRef = databaseRef(database, `projects/${configs.SITE.NAME.toLowerCase()}/users/${currentUser.uid}`)

        dispatch({ type: 'UPDATING' })

        if (!displayName) return dispatch({
            type: 'UPDATE_FAILED',
            errorMessage: t('name_must_not_empty')
        })
        if (displayName.length > displayNameMaxLength) return dispatch({
            type: 'UPDATE_FAILED',
            errorMessage: t('name_must_not_more_than', { number: displayNameMaxLength })
        })
        if (license.length > licenseMaxLength) return dispatch({
            type: 'UPDATE_FAILED',
            errorMessage: t('license_must_not_more_than', { number: licenseMaxLength })
        })

        try {
            await updateProfile(currentUser, { displayName })
            await update(userRef, { license, gender })
        } catch (error) {
            dispatch({
                type: 'UPDATE_FAILED',
                errorMessage: error
            })
            return setTimeout(() => {
                dispatch({
                    type: 'UPDATE_INIT',
                    errorMessage: error
                })
            }, 3000)
        }

        dispatch({ type: 'UPDATE_SUCCESS' })
        setTimeout(() => dispatch({ type: 'UPDATE_INIT' }), 3000)
    }
    const handleUIDCopy = (event) => {
        const target = event.target

        target.select()
        target.setSelectionRange(0, target.value.length)

        try {
            navigator.clipboard.writeText(target.value)
        } catch (error) {
            console.error('Error copying text:', error)
        }
    }

    return (
        <>
            <Card className="rounded-4">
                <Card.Body className="card-body">
                    <Card.Title as="h3">
                        {t('personal')}
                    </Card.Title>
                    <Card.Text>
                        {t('personal_description')}
                    </Card.Text>
                    <br />
                    <h4 className="text-primary mb-3">
                        {t('profile')}
                    </h4>
                    <Form.Group
                        as={Stack}
                        gap={3}
                        direction="horizontal"
                        className="align-self-center align-items-center"
                        controlId="personalUploadAvatar"
                    >
                        {
                            isLoading ? (
                                <Placeholder animation="glow">
                                    <Placeholder className="rounded-circle" style={{ width: '90px', height: '90px' }} />
                                </Placeholder>
                            ) : currentUser && currentUser.photoURL ? (
                                <Image
                                    roundedCircle
                                    src={currentUser.photoURL ?? null}
                                    alt={currentUser.displayName ?? t('profile_picture')}
                                    width="90px"
                                    height="90px"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="90"
                                    height="90"
                                    fill="currentColor"
                                    className="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            )
                        }
                        <Button
                            as={Form.Label}
                            className={
                                isLoading || isUploading ? (
                                    "rounded-4 mb-0 disabled"
                                ) : (
                                    "rounded-4 mb-0"
                                )
                            }
                        >
                            {t('change')}
                        </Button>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={isLoading || isUploading}
                            onChange={(event) => (isLoading || isUploading ? null : handleUploadAvatar(event))}
                        />
                        <Button
                            variant="outline-primary"
                            disabled={isLoading || isUploading}
                            onClick={() => (isLoading || isUploading ? null : handleResetAvatar())}
                        >
                            {t('reset')}
                        </Button>
                    </Form.Group>
                    <Form.Text>
                        {t('upload_profile_rule')}
                        <br />
                        {t('upload_profile_description_rule')}
                    </Form.Text>
                    <hr className="pb-2 mt-4" />
                    <Form
                        onSubmit={
                            (event) => isLoading || state.isLoading ? (
                                ''
                            ) : (
                                handleSubmit(event)
                            )
                        }
                    >
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="personalDisplayName">
                                    <Form.Label>
                                        {t('username')}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="rounded-3"
                                        placeholder={t('type_your_nickname')}
                                        maxLength={displayNameMaxLength}
                                        value={displayName}
                                        disabled={isLoading || state.isLoading}
                                        required
                                        onChange={(event) => setDisplayName(event.target.value)}
                                    />
                                    <Form.Text>
                                        {t('maximum_name_length', { number: displayNameMaxLength })}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="personalGender">
                                    <Form.Label>
                                        {t('gender')}
                                    </Form.Label>
                                    <Form.Select
                                        className="rounded-3"
                                        disabled={isLoading || state.isLoading}
                                        aria-label="Gender"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    >
                                        <option value="unspecified">
                                            {t('unspecified')}
                                        </option>
                                        <option value="male">
                                            {t('male')}
                                        </option>
                                        <option value="female">
                                            {t('female')}
                                        </option>
                                        <option value="other">
                                            {t('other')}
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="personalLicense">
                            <Form.Label>
                                {t('license')}
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                className="rounded-3"
                                rows={3}
                                maxLength={licenseMaxLength}
                                placeholder={t('type_your_license')}
                                value={license}
                                disabled={isLoading || state.isLoading}
                                onChange={(event) => setLicense(event.target.value)}
                            />
                            <Form.Text>
                                {t('maximum_license_length', { number: licenseMaxLength })}
                            </Form.Text>
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                            {
                                state.errorMessage ? (
                                    <>
                                        <span className="ms-auto text-warning">
                                            {state.errorMessage}
                                        </span>
                                        <div className="vr" />
                                    </>
                                ) : (
                                    ''
                                )
                            }
                            <Button
                                className={
                                    state.errorMessage ? (
                                        "btn btn-primary"
                                    ) : (
                                        "btn btn-primary ms-auto"
                                    )
                                }
                                type="submit"
                                id="personalSubmit"
                                disabled={isLoading || state.isLoading}
                            >
                                {
                                    state.isLoading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : state.isError ? (
                                        <i className="bi bi-x-circle" />
                                    ) : state.isSuccess ? (
                                        <i className="bi bi-check-circle" />
                                    ) : (
                                        ''
                                    )
                                }
                                {' '}
                                {t('update')}
                            </Button>
                        </Stack>
                    </Form>
                    <br />
                    <h4 className="text-primary mb-3">
                        {t('login_data')}
                    </h4>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="personalRole">
                            <Form.Label column sm="2">
                                {t('role')}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    disabled={isLoading}
                                    aria-label={t('user_role')}
                                    defaultValue={userData ? (userData.role ?? t('user')) : ''}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="personalCreateAt">
                            <Form.Label column sm="2">
                                {t('create_at')}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    disabled={isLoading}
                                    aria-label={t('user_create_at')}
                                    defaultValue={
                                        currentUser && currentUser.metadata ? (
                                            new Date(currentUser.metadata.creationTime).toLocaleString(i18n.language, { dateStyle: 'medium', timeStyle: 'medium' })
                                            ??
                                            t('unknown')
                                        ) : (
                                            ''
                                        )
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="personalLastSignIn">
                            <Form.Label column sm="2">
                                {t('last_sign_in')}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    disabled={isLoading}
                                    aria-label={t('user_last_sign_in')}
                                    defaultValue={
                                        currentUser && currentUser.metadata ? (
                                            new Date(currentUser.metadata.lastSignInTime).toLocaleString(i18n.language, { dateStyle: 'medium', timeStyle: 'medium' })
                                            ??
                                            t('unknown')
                                        ) : (
                                            ''
                                        )
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="personalEmail">
                            <Form.Label column sm="2">
                                {t('email_address')}
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    disabled={isLoading}
                                    aria-label={t('user_email')}
                                    defaultValue={currentUser ? (currentUser.email ?? '') : ''}
                                />
                            </Col>
                        </Form.Group>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) => (
                                <Tooltip id="personalUIDTooltip" {...props}>
                                    {t('click_to_copy')}
                                </Tooltip>
                            )}
                        >
                            <Form.Group as={Row} className="mb-3" controlId="personalUID">
                                <Form.Label column sm="2">
                                    {t('user_id')}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        readOnly
                                        disabled={isLoading}
                                        aria-label={t('id_of_user')}
                                        defaultValue={currentUser ? (currentUser.uid ?? '') : ''}
                                        onClick={(event) => handleUIDCopy(event)}
                                    />
                                </Col>
                            </Form.Group>
                        </OverlayTrigger>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
