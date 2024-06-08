import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { FloatingLabel, Form, Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

import AuthContext from '@/contexts/AuthContext'

import Dialog from '@/components/Dialog'

export default function DialogConfirm(props) {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.components.DialogConfirm' })
    const { currentUser } = useContext(AuthContext)
    const [password, setPassword] = useState('')
    const [validate, setValidate] = useState('')
    const [isChecking, setIsChecking] = useState(false)

    const handleVerify = async () => {
        setValidate('')
        setIsChecking(true)
        props.onHide.isVerified = false

        if (!password) {
            setValidate(t('empty_password'))
            setIsChecking(false)
            return props.onHide.isVerified = false
        }

        try {
            await reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(currentUser.email, password))
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setValidate(t('incorrect_password'))
                setIsChecking(false)
                return props.onHide.isVerified = false
            } else {
                console.log(error)
                setValidate(t('error_unknown'))
                setIsChecking(false)
                return props.onHide.isVerified = false
            }
        }

        setPassword('')
        setIsChecking(false)
        props.onHide({ isVerified: true })
    }

    return (
        <Dialog
            {...props}
            centered
            id="dialogConfirm"
            title={t('verify_change')}
        >
            <p>
                {t('type_your_account_password')}
            </p>
            <FloatingLabel
                controlId="accountVerify"
                label={t('password')}
            >
                <Form.Control
                    type="password"
                    placeholder={t('password')}
                    autoComplete="off"
                    isInvalid={validate.length >= 1}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {validate}
                </Form.Control.Feedback>
            </FloatingLabel>
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button
                    className="w-100"
                    variant="secondary"
                    disabled={isChecking}
                    onClick={props.onHide}
                >
                    {t('cancel')}
                </Button>
                <Button
                    className="w-100"
                    disabled={isChecking}
                    onClick={() => (isChecking ? null : handleVerify())}
                >
                    {
                        isChecking ? (
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
                    {t('confirm')}
                </Button>
            </div>
        </Dialog>
    )
}
DialogConfirm.propTypes = {
    onHide: PropTypes.func
}
