import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import DocumentMeta from 'react-document-meta'

// Components
import CookieAccept from '../../components/CookieAccept'

import { translator } from '../../utils/functions/translator'

import Profile from './Profile'
import Navbar from './Navbar'
import Content from './Contents/index'

import './style.css'

export default function Account() {
    const [userData, setUserData] = useState()

    useEffect(() => {
        const { Modal } = require('bootstrap')

        const signIn = document.getElementById('signInModal')
        const signInDismiss = document.getElementById('auth-modal-login-dismiss')
        const register = document.getElementById('registerModal')
        const registerDismiss = document.getElementById('auth-modal-register-dismiss')
        const forgot = document.getElementById('forgotModal')
        const forgotDismiss = document.getElementById('auth-modal-forgot-dismiss')
        const signInModal = new Modal(signIn, {
            backdrop: 'static',
            keyboard: false
        })
        const registerModal = new Modal(register, {
            backdrop: 'static',
            keyboard: false
        })
        const forgotModal = new Modal(forgot, {
            backdrop: 'static',
            keyboard: false
        })

        signInDismiss.hidden = true
        registerDismiss.hidden = true
        forgotDismiss.hidden = true

        const auth = getAuth()
        const db = getDatabase()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(db, 'projects/maseshi/users/' + user.uid)

                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val()
                    setUserData({ user, data })
                })

                signInModal.hide()
                registerModal.hide()
                forgotModal.hide()
            } else {
                setUserData()
                signInModal.show()
            }
        })

        const url = new URL(window.location)
        const param = url.searchParams.get('tab')
        const panel = document.getElementsByClassName('tab-pane')

        for (let i = 0; i < panel.length; i++) {
            const id = panel[i].id.replace('v-pills-', '')

            if (param === id) {
                const button = document.getElementById(panel[i].id + '-tab')
                const content = document.getElementById(panel[i].id)

                button.classList.add('active')
                button.setAttribute('aria-selected', 'true')
                return content.classList.add('show', 'active')
            } else if (i === (panel.length - 1)) {
                const button = document.getElementById(panel[0].id + '-tab')
                const content = document.getElementById(panel[0].id)

                button.classList.add('active')
                button.setAttribute('aria-selected', 'true')
                return content.classList.add('show', 'active')
            }
        }
    }, [])

    const meta = {
        title: translator().translate.pages.Account.Account.website_title,
        description: translator().translate.pages.Account.Account.website_description,
        canonical: '/account',
        meta: {
            name: {
                keywords: 'maseshi, chaiwatsuwannarat, fluke, chaiwat',
                subject: translator().translate.pages.Account.Account.subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/maseshi_banner.jpg',
                'og:site_name': 'Maseshi'
            }
        }
    }

    return (
        <DocumentMeta {...meta}>
            <section className="account container-fluid" id="account">
                <div className="row">
                    <div className="col-md-3">
                        <Profile userData={userData} />
                        <Navbar />
                    </div>
                    <div className="col-md-9">
                        <Content userData={userData} />
                    </div>
                </div>
                <CookieAccept />
            </section>
        </DocumentMeta>
    )
}
