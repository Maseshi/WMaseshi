import { useState, useEffect, useContext } from 'react'
import { Container, Navbar, Offcanvas, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import NavLanguages from './NavLanguages'
import NavMenu from './NavMenu'
import NavNotification from './NavNotification'
import NavProfile from './NavProfile'

import AuthContext from '@/contexts/AuthContext'

import styles from '@/styles/Nav.module.css'

export default function Nav() {
    const { t } = useTranslation('translation', { keyPrefix: 'layouts.Nav.Nav' })
    const { currentUser, isLoading } = useContext(AuthContext)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const controlNavbar = () => {
            const nav = document.querySelector('nav')

            if (nav && (window.scrollY > lastScrollY)) {
                nav.classList.remove(styles.show)
                nav.classList.add(styles.hidden)
            } else {
                if (window.scrollY > 0) {
                    nav.classList.add(styles.show)
                    nav.classList.remove(styles.hidden)
                } else {
                    nav.classList.remove(styles.show, styles.hidden)
                }
            }

            setLastScrollY(window.scrollY)
        }

        window.addEventListener('scroll', controlNavbar)
        return () => window.removeEventListener('scroll', controlNavbar)
    }, [lastScrollY])

    return (
            <Navbar className={styles.nav} expand="lg">
                <Container fluid>
                    <Navbar.Brand className={styles.brand} as={Link} to="/">
                        <Image className="d-inline-block align-middle" src="/icon.svg" alt="favicon" width="45px" height="45px" />
                        {' '}
                        MASE<span className="text-primary">SHI</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas className={styles.offcanvas} placement="end" id="offcanvasNavbar">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                {t('all_items')}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <NavMenu />
                            <hr />
                            <div className="d-flex align-items-center justify-content-center">
                                <NavNotification />
                                <NavLanguages />
                                <NavProfile currentUser={currentUser} isLoading={isLoading} />
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
    )
}
