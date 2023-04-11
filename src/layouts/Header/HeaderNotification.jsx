import { useState, useEffect } from 'react'

import { timeSince } from '../../utils/functions/timeSince'
import { translator } from '../../utils/functions/translator'

export default function HeaderNotification() {
    const [notification, setNotification] = useState(localStorage.getItem('notification'))

    useEffect(() => {
        const list = localStorage.getItem('notification')

        if (!list) localStorage.setItem('notification', '[]')

        window.addEventListener('storage', () => {
            setNotification(localStorage.getItem('notification'))
        })
    }, [])

    const handleClearNotify = () => {
        localStorage.setItem('notification', '[]')
        window.dispatchEvent(new Event('storage'))
    }

    return (
        <div className="navar-notification me-3">
            <div className="dropdown">
                <button type="button" className="navbar-notification-button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <i className="bi bi-bell"></i>
                    {
                        notification && JSON.parse(notification).length ? (
                            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-light rounded-circle">
                                <span className="visually-hidden">
                                    {translator().translate.layouts.Header.HeaderNotification.new_alerts}
                                </span>
                            </span>
                        ) : ''
                    }
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{ margin: 0 }}>
                    <li>
                        <div className="d-flex">
                            <div className="align-self-start align-self-center">
                                <h6 className="dropdown-header">
                                    {translator().translate.layouts.Header.HeaderNotification.notification}
                                </h6>
                            </div>
                            <div className="align-self-end align-self-center ms-auto me-3">
                                {
                                    notification && JSON.parse(notification).length ? (
                                        <button type="button" className="navbar-button btn btn-light justify-content-end" onClick={() => handleClearNotify}>
                                            {translator().translate.layouts.Header.HeaderNotification.clear}
                                        </button>
                                    ) : ''
                                }

                            </div>
                        </div>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <div className="position-relative toast-container mx-auto p-3" aria-live="polite" aria-atomic="true">
                            {
                                notification && JSON.parse(notification).length ? (
                                    JSON.parse(notification).map((data, index) => {
                                        const icon = data.icon || '/android-icon-36x36.png'
                                        const title = data.title || ''
                                        const description = data.description || ''
                                        const when = data.when || ''
                                        const buttonName = data.button ? data.button.name : ''
                                        const buttonLink = data.button ? data.button.link : ''

                                        const handleDismissNotify = () => {
                                            const list = JSON.parse(notification)
                                            const item = list.indexOf(index)

                                            if (item > -1) list.splice(item, 1)

                                            const json = JSON.stringify(list)

                                            localStorage.setItem('notification', json)
                                            window.dispatchEvent(new Event('storage'))
                                        }

                                        return (
                                            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" key={index}>
                                                <div className="toast-header">
                                                    <img src={icon} className="rounded me-2" width="20px" height="20px" alt="Notification icon" />
                                                    <strong className="me-auto">
                                                        {title}
                                                    </strong>
                                                    <small>
                                                        {timeSince(new Date(when))}
                                                    </small>
                                                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => handleDismissNotify}></button>
                                                </div>
                                                <div className="toast-body">
                                                    {description}
                                                </div>
                                                {
                                                    buttonName && buttonLink ? (
                                                        <div className="mt-2 pt-2 border-top">
                                                            <a className="btn btn-primary btn-sm" href={buttonLink}>
                                                                {buttonName}
                                                            </a>
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="navbar-notification-error">
                                        <i className="bi bi-app-indicator"></i>
                                        <br />
                                        <p>
                                            {translator().translate.layouts.Header.HeaderNotification.empty_notification}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
