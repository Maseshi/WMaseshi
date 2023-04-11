import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import HeaderLanguages from './HeaderLanguages'
import HeaderMenu from './HeaderMenu'
import HeaderNotification from './HeaderNotification'
import HeaderProfile from './HeaderProfile'

import { translator } from '../../utils/functions/translator'

export default function HeaderNavbar() {
  const [loaded, setLoaded] = useState(false)
  const [userData, setUserData] = useState()
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user)
        setLoaded(true)
      } else {
        setUserData()
        setLoaded(true)
      }
    })

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (currentScrollPos > prevScrollPos) {
        document.querySelector('.navbar').className = 'navbar-style navbar-hidden navbar navbar-expand-lg navbar-light'
      } else {
        if (window.pageYOffset > 0) {
          document.querySelector('.navbar').className = 'navbar-style navbar-show navbar navbar-expand-lg navbar-light'
        } else {
          document.querySelector('.navbar').className = 'navbar-style navbar navbar-expand-lg navbar-light'
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <nav className="navbar-style navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="Maseshi" width="55" height="55" />
          Maseshi
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {translator().translate.layouts.Header.HeaderNavbar.all_items}
            </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <HeaderMenu />
            <hr />
            <div className="d-flex align-items-center justify-content-center">
              <HeaderNotification />
              <HeaderLanguages />
              <HeaderProfile loaded={loaded} userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
