import { Link } from 'react-router-dom'

import { translator } from '../../utils/functions/translator'

export default function HeaderMenu() {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
                <Link className="nav-link" to="/#about">
                    {translator().translate.layouts.Header.HeaderMenu.about}
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/#skills">
                    {translator().translate.layouts.Header.HeaderMenu.ability}
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/projects">
                    {translator().translate.layouts.Header.HeaderMenu.projects}
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/#other">
                    {translator().translate.layouts.Header.HeaderMenu.others}
                </Link>
            </li>
        </ul>
    )
}
