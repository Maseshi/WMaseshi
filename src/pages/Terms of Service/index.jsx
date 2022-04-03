import Welcome from './Welcome'
import Content from './Content'

import CookieAccept from '../../components/CookieAccept'

import './style.css'

export default function termsOfService() {
    document.title = 'เงื่อนไขการให้บริการ | Maseshi'

    return (
        <>
            <Welcome />
            <Content />
            <CookieAccept />
        </>
    )
}
