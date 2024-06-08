import { useState, useEffect, useContext } from 'react'
import { Card, Form, Stack } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ref, update } from 'firebase/database'

import AuthContext from '@/contexts/AuthContext'

import { database } from '@/services/firebase'

export default function AccountPrivacy() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Account.AccountPrivacy' })
    const { currentUser, userData, isLoading } = useContext(AuthContext)
    const [PP, setPP] = useState(false)
    const [ToS, setToS] = useState(false)

    useEffect(() => {
        setPP(userData ? (userData.rule.pp ?? false) : false)
        setToS(userData ? (userData.rule.tos ?? false) : false)
    }, [userData])

    const handleChangePP = async () => {
        const databaseRef = ref(database, `data/users/${currentUser.uid}/rule`)

        try {
            await update(databaseRef, { pp: !PP })
        } catch (error) {
            return setPP(PP)
        }

        setPP(!PP)
    }
    const handleChangeToS = async () => {
        const databaseRef = ref(database, `data/users/${currentUser.uid}/rule`)

        try {
            await update(databaseRef, { tos: !ToS })
        } catch (error) {
            return setToS(ToS)
        }

        setToS(!ToS)
    }

    return (
        <>
            <Card className="rounded-4">
                <Card.Body>
                    <Card.Title as="h3">
                        {t('privacy')}
                    </Card.Title>
                    <Card.Text>
                        {t('privacy_description')}
                    </Card.Text>
                    <br />
                    <Card className="rounded-4 mb-3">
                        <Card.Body>
                            <Form as={Stack} direction="horizontal" gap={2}>
                                <Form.Check
                                    type="switch"
                                    id="privacyRulePP"
                                    label={t('privacy_policy')}
                                    checked={PP}
                                    onChange={() => (isLoading ? null : handleChangePP())}
                                    disabled={isLoading}
                                />
                                <Link className="ms-auto" to="/privacy-policy">
                                    {t('read')}
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="rounded-4 mb-3">
                        <Card.Body>
                            <Form as={Stack} direction="horizontal" gap={2}>
                                <Form.Check
                                    type="switch"
                                    id="privacyRuleToS"
                                    label={t('terms_of_service')}
                                    checked={ToS}
                                    onChange={() => (isLoading ? null : handleChangeToS())}
                                    disabled={isLoading}
                                />
                                <Link className="ms-auto" to="/privacy-policy">
                                    {t('read')}
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="rounded-4 mb-3">
                        <Card.Body>
                            <Form>
                                <Form.Check
                                    className="mb-3"
                                    type="switch"
                                    id={t('cookie_policy')}
                                    label="นโยบายคุกกี้"
                                    checked
                                    disabled
                                />
                                <Form.Text>
                                    {t('cookie_policy_description')}
                                </Form.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    )
}
