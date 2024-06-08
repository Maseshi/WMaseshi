import { useState, useEffect } from 'react'
import { Toast, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { getCookie, setCookie } from '@/utils/cookieManager'

import styles from '@/styles/CookieAccept.module.css'

export default function CookieAccept() {
    const { t } = useTranslation('translation', { keyPrefix: 'components.CookieAccept' })
    const [accepted, setAccepted] = useState(true)

    const handleAcceptCookie = () => {
        setAccepted(!accepted)
        setCookie('cookie', 'true', 60)
    }

    useEffect(() => {
        if (!getCookie('cookie')) {
            setAccepted(false)
            setCookie('cookie', 'false')
        }
    }, [])

    return (
        <Toast
            id="cookieAccept"
            className={styles.toast + " overflow-hidden rounded-4"}
            show={!accepted}
        >
            <Toast.Body className="d-flex flex-row">
                <div className="align-self-center p-1">
                    <h1 className="m-0">🍪</h1>
                </div>
                <div className="align-self-center p-1">
                    <p className="m-0">
                        {t('cookie_info')}
                    </p>
                    <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {t('what_are_cookies')}
                    </a>
                </div>
                <div className="align-self-center p-1">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAcceptCookie}
                    >
                        {t('agree')}
                    </Button>
                </div>
            </Toast.Body>
        </Toast>
    )
}
