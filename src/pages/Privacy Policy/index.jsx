import Welcome from './Welcome'
import Content from './Content'

import CookieAccept from '../../components/CookieAccept/index'

import './style.css'

export default function privacyPolicy() {
    document.title = 'นโยบายความเป็นส่วนตัว | Maseshi'

    return (
        <>
            <Welcome />
            <Content />
            <CookieAccept />
        </>
    )
}
