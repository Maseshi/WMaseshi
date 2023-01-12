import HeaderNavbar from './HeaderNavbar'
import Authentication from '../../components/Authentication/index'

import './style.css'

export default function Header() {
    return (
        <header>
            <HeaderNavbar />
            <Authentication />
        </header>
    )
}
