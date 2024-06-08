import { useState, useEffect, useContext } from 'react'
import { Dropdown, Button, Toast, ToastContainer, Container, Image, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import ThemeContext from '@/contexts/ThemeContext'

import { timeSince } from '@/utils/timeSince.js'

import styles from '@/styles/Nav.module.css'

export default function HeaderNotification() {
    const { t } = useTranslation('translation', { keyPrefix: 'layouts.Nav.NavNotification' })
    const { theme } = useContext(ThemeContext)
    const [notification, setNotification] = useState(localStorage ? localStorage.getItem('notification') : [])

    useEffect(() => {
        window.addEventListener('storage', () => setNotification(localStorage.getItem('notification')))
    }, [])

    const handleDismissNotify = (index) => {
        const list = JSON.parse(notification)

        list[index].show = false
        list.splice(index, 1)
        setNotification(notification => ({ ...notification, ...list }))
        localStorage.setItem('notification', JSON.stringify(list))
        window.dispatchEvent(new Event('storage'))
    }
    const handleClearNotify = () => {
        setNotification([])
        localStorage.setItem('notification', '[]')
        window.dispatchEvent(new Event('storage'))
    }

    return (
        <Dropdown className="me-2">
            <Dropdown.Toggle
                className={styles["notification-button"] + " border"}
                variant={theme}
                id="dropdownNotification"
                aria-label="Notification button"
            >
                <i className="bi bi-bell" />
                {
                    notification && notification.length && JSON.parse(notification).length ? (
                        <Badge className="position-absolute top-0 start-100 translate-middle" bg="warning" pill>
                            {notification.length >= 99 ? '99+' : notification.length}
                            <span className="visually-hidden">
                                {t('new_alerts')}
                            </span>
                        </Badge>
                    ) : ''
                }
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["notification-dropdown"] + " rounded-4"} align={{ md: 'end' }}>
                <Dropdown.Header className="hstack gap-2">
                    {t('notification')}
                    {
                        notification && notification.length && JSON.parse(notification).length ? (
                            <Button className="ms-auto" variant={theme} size="sm" onClick={handleClearNotify}>
                                {t('clear')}
                            </Button>
                        ) : ''
                    }
                </Dropdown.Header>
                <Dropdown.Divider />
                <Container>
                    <ToastContainer className="position-relative w-100">
                        {
                            notification && notification.length && JSON.parse(notification).length ? (
                                JSON.parse(notification).map((data, index) => {
                                    const icon = data.icon
                                    const title = data.title
                                    const description = data.description
                                    const when = data.when
                                    const buttonName = data.button.name
                                    const buttonLink = data.button.link

                                    return (
                                        <Toast className="rounded-4 overflow-hidden" show={notification[index].show} onClose={() => handleDismissNotify(index)} key={index}>
                                            <Toast.Header>
                                                <Image src={icon} className="me-2" rounded width='20px' height="20px" alt="Notification icon" />
                                                <strong className="me-auto">
                                                    {title}
                                                </strong>
                                                <small className="text-muted">
                                                    {timeSince(new Date(when))}
                                                </small>
                                            </Toast.Header>
                                            <Toast.Body>
                                                {description}
                                            </Toast.Body>
                                            {
                                                buttonName && buttonLink ? (
                                                    <div className="mt-2 pt-2 border-top">
                                                        <Button href={buttonLink} size="sm">
                                                            {buttonName}
                                                        </Button>
                                                    </div>
                                                ) : ''
                                            }
                                        </Toast>
                                    )
                                })
                            ) : (
                                <div className={styles["notification-error"]}>
                                    <i className="bi bi-app-indicator" />
                                    <br />
                                    <p>
                                        {t('empty_notification')}
                                    </p>
                                </div>
                            )
                        }
                    </ToastContainer>
                </Container>
            </Dropdown.Menu>
        </Dropdown>
    )
}
