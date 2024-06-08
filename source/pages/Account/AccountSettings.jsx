import { useState, useContext, useReducer } from 'react'
import { Card, Stack, Form, Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { deleteUser, signOut } from 'firebase/auth'
import { ref as databaseRef, remove } from 'firebase/database'
import { ref as storageRef, deleteObject } from 'firebase/storage'

import LanguageOptions from '@/components/LanguageOptions'

import configs from '@/configs'

import AuthContext from '@/contexts/AuthContext'
import ThemeContext from '@/contexts/ThemeContext'

import DialogConfirm from './components/DialogConfirm'

import { auth, database, storage } from '@/services/firebase'

const removeAccountReducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE_INIT':
            return {
                ...state,
                isSuccess: false,
                isError: false,
                isLoading: false,
                errorMessage: ''
            }
        case 'REMOVING':
            return {
                ...state,
                isSuccess: false,
                isError: false,
                isLoading: true,
                errorMessage: state.errorMessage
            }
        case 'REMOVE_SUCCESS':
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                errorMessage: state.errorMessage
            }
        case 'REMOVE_FAILED':
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

export default function AccountSettings() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountSettings' })
    const { theme, setTheme } = useContext(ThemeContext)
    const { currentUser, isLoading } = useContext(AuthContext)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [devMode, setDevMode] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [state, dispatch] = useReducer(removeAccountReducer, {
        isSuccess: false,
        isError: false,
        isLoading: false,
        errorMessage: ''
    })

    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark'

        setTheme(isCurrentDark ? 'light' : 'dark')
        document.documentElement.dataset.bsTheme = isCurrentDark ? 'light' : 'dark'
        localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark')
    }
    const handleToggleConfirmDialog = (modal) => {
        setShowConfirmDialog(!showConfirmDialog)
        if (modal.isVerified) setIsVerified(true)
    }
    const handleRemoveAccount = async () => {
        const userDatabaseRef = databaseRef(database, `projects/${configs.SITE.NAME}/users/$${currentUser.uid}`)
        const userStorageRef = storageRef(storage, `users/${currentUser.uid}`)

        dispatch({ type: 'REMOVING' })

        try {
            await remove(userDatabaseRef)
            await deleteObject(userStorageRef)
            await deleteUser(currentUser)
        } catch (error) {
            dispatch({
                type: 'REMOVE_FAILED',
                errorMessage: error
            })
            return setTimeout(() => dispatch({ type: 'REMOVE_INIT' }), 3000)
        }

        dispatch({ type: 'REMOVE_SUCCESS' })
        setTimeout(() => dispatch({ type: 'REMOVE_INIT' }), 3000)
        setTimeout(() => {
            try {
                signOut(auth)
            } catch (error) {
                throw new Error(error)
            }
        }, 5000)
    }

    return (
        <>
            <Card className="rounded-4">
                <Card.Body>
                    <Card.Title as="h3">
                        {t('settings')}
                    </Card.Title>
                    <Card.Text>
                        {t('settings_description')}
                    </Card.Text>
                    <br />
                    <h4 className="text-primary mb-3">
                        {t('personal')}
                    </h4>
                    <Card className="rounded-4 mb-3">
                        <Card.Body as={Stack} direction="horizontal" gap={2}>
                            <LanguageOptions className="w-auto rounded-3" />
                            <div>
                                <span>
                                    {t('website_language')}
                                </span>
                                <br />
                                <Form.Text>
                                    {t('website_language_description')}
                                </Form.Text>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="rounded-4 mb-3">
                        <Card.Body>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="settingsTheme"
                                    label={t('dark_theme')}
                                    checked={theme === 'dark'}
                                    onChange={() => handleThemeChange()}
                                />
                                <Form.Text>
                                    {t('dark_theme_description')}
                                </Form.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="rounded-4">
                        <Card.Body>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="settingsDeveloperMode"
                                    label={t('dev_mode')}
                                    checked={devMode}
                                    onChange={() => setDevMode(!devMode)}
                                    disabled
                                />
                                <Form.Text>
                                    {t('dev_mode_description')}
                                </Form.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    <h4 className="text-primary mb-3">
                        {t('manage_account')}
                    </h4>
                    <Card className="rounded-4">
                        <Card.Body>
                            <span>
                                {t('delete_account_and_services')}
                            </span>
                            <p className="text-secondary">
                                {t('delete_account_and_services_description')}
                            </p>
                            <Button
                                variant="danger"
                                disabled={isLoading || state.isLoading}
                                onClick={
                                    () => isVerified ? (
                                        isLoading || state.isLoading ? (
                                            ''
                                        ) : (
                                            handleRemoveAccount()
                                        )
                                    ) : (
                                        isLoading || state.isLoading ? (
                                            ''
                                        ) : (
                                            handleToggleConfirmDialog()
                                        )
                                    )
                                }
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
                                    ) : state.isSuccess ? (
                                        <i className="bi bi-check-circle" />
                                    ) : state.isError ? (
                                        <i className="bi bi-x-circle" />
                                    ) : isVerified ? (
                                        ''
                                    ) : (
                                        <i className="bi bi-lock" />
                                    )
                                }
                                {' '}
                                {t('permanently_delete')}
                            </Button>
                            <DialogConfirm
                                show={showConfirmDialog}
                                onHide={handleToggleConfirmDialog}
                                onExited={
                                    () => (
                                        state.isLoading ? (
                                            null
                                        ) : isVerified ? (
                                            handleRemoveAccount()
                                        ) : (
                                            null
                                        )
                                    )
                                }
                            />
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    )
}
