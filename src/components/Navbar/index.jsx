import { useState, useEffect } from 'react'

import Menu from './Menu'
import Profile from './Profile'
import Auth from '../../containers/Auth/index'

import './style.css'

export default function Navbar(props) {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

    function handleScroll() {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos > prevScrollPos) {
            document.querySelector(".navbar").className = "navbar navbar-style navbar-expand-lg navbar-light navbar-hidden";
        } else {
            if (window.pageYOffset > 0) {
                document.querySelector(".navbar").className = "navbar navbar-style navbar-expand-lg navbar-light navbar-background";
            } else {
                document.querySelector(".navbar").className = "navbar navbar-style navbar-expand-lg navbar-light";
            }
        }
        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    return (
        <>
            <nav className="navbar navbar-style navbar-expand-lg navbar-light">
                <div className="container">
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
                            <Profile />
                        </div>
                    </div>
                </div>
            </nav>
            <Auth />
        </>
    )
}
