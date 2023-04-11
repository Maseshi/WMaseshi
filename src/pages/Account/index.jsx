import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Helmet } from 'react-helmet'

// Components
import CookieAccept from '../../components/CookieAccept'

import { translator } from '../../utils/functions/translator'

import Profile from './Profile'
import Navbar from './Navbar'
import Content from './Contents/index'

import './style.css'

export default function Account() {
    const [userData, setUserData] = useState()
    const tabs = ['personal', 'privacy', 'security', 'settings']

    useEffect(() => {
        const auth = getAuth()
        const db = getDatabase()

        const signIn = document.getElementById('signInModal')
        const signInDismiss = document.getElementById('auth-modal-login-dismiss')
        const register = document.getElementById('registerModal')
        const registerDismiss = document.getElementById('auth-modal-register-dismiss')
        const forgot = document.getElementById('forgotModal')
        const forgotDismiss = document.getElementById('auth-modal-forgot-dismiss')

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(db, 'projects/maseshi/users/' + user.uid)

                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val()
                    setUserData({ user, data })
                })

                delete signIn.dataset.bsBackdrop
                delete signIn.dataset.bsKeyboard
                signInDismiss.hidden = false
                signIn.classList.remove('show')
                signIn.style.display = 'none'
                signIn.setAttribute('aria-hidden', 'true')
                signIn.removeAttribute('aria-modal')
                signIn.removeAttribute('role')

                delete register.dataset.bsBackdrop
                delete register.dataset.bsKeyboard
                registerDismiss.hidden = false
                registerDismiss.click()

                delete forgot.dataset.bsBackdrop
                delete forgot.dataset.bsKeyboard
                forgotDismiss.hidden = false
                forgotDismiss.click()
            } else {
                setUserData()

                signIn.dataset.bsBackdrop = 'static'
                signIn.dataset.bsKeyboard = 'false'
                signInDismiss.hidden = true
                signIn.classList.add('show')
                signIn.style.display = 'block'
                signIn.setAttribute('aria-hidden', 'false')
                signIn.setAttribute('aria-modal', 'true')
                signIn.setAttribute('role', 'dialog')

                register.dataset.bsBackdrop = 'static'
                register.dataset.bsKeyboard = 'false'
                registerDismiss.hidden = true

                forgot.dataset.bsBackdrop = 'static'
                forgot.dataset.bsKeyboard = 'false'
                forgotDismiss.hidden = true
            }
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.Account.Account.website_title}</title>
                <meta name="description" content={translator().translate.pages.Account.Account.website_description} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.Account.Account.subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.Account.Account.website_title} />
                <meta property="og:description" content={translator().translate.pages.Account.Account.website_description} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content='https://maseshi.web.app/account' />
                <meta property="og:type" content="website" />
                <link rel="canonical" href='https://maseshi.web.app/account' />
            </Helmet>
            <section className="account container-fluid" id="account">
                <div className="row">
                    <div className="col-md-3">
                        <Profile userData={userData} />
                        <Navbar tabs={tabs} />
                    </div>
                    <div className="col-md-9">
                        <Content userData={userData} tabs={tabs} />
                    </div>
                </div>
                <CookieAccept />
            </section>
        </>
    )
}
