import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Menu from './Menu'
import Profile from './Profile'
import Auth from '../../components/Auth/index'

import './style.css'

export default function Header() {
    const [loaded, setLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoaded(true)
                setCurrentUser(user)
            } else {
                setLoaded(true)
                setCurrentUser()
            }
        })

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset

            if (currentScrollPos > prevScrollPos) {
                document.querySelector('.navbar').className = 'navbar navbar-style navbar-expand-lg navbar-light navbar-hidden'
            } else {
                if (window.pageYOffset > 0) {
                    document.querySelector('.navbar').className = 'navbar navbar-style navbar-expand-lg navbar-light navbar-show'
                } else {
                    document.querySelector('.navbar').className = 'navbar navbar-style navbar-expand-lg navbar-light'
                }
            }

            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])

    return (
        <header>
            <nav className="navbar navbar-style navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="/favicon-96x96.png" alt="favicon" width="55" height="55" />
                        Maseshi
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">รายการทั้งหมด</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <Menu />
                            <hr />
                            <Profile loaded={loaded} user={currentUser} />
                        </div>
                    </div>
                </div>
            </nav>
            <Auth />
        </header>
    )
}
