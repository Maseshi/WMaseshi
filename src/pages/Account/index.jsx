import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from "firebase/database"

// Components
import CookieAccept from '../../components/CookieAccept'

// Functions
import { isMobile } from '../../utils/functions/isMobile'

import Profile from './Profile'
import Navbar from './Navbar'
import Content from './Contents/index'

import './style.css'

export default function Account() {
    const [userData, setUserData] = useState()

    useEffect(() => {
        const auth = getAuth()
        const db = getDatabase()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(db, 'data/users/' + user.uid)

                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val()
                    setUserData({user, data})
                })
            } else {
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
                new Modal(register, {
                    backdrop: 'static',
                    keyboard: false
                })
                new Modal(forgot, {
                    backdrop: 'static',
                    keyboard: false
                })

                setUserData()
                signInModal.toggle()
                signInDismiss.hidden = true
                registerDismiss.hidden = true
                forgotDismiss.hidden = true
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

    document.title = 'บัญชี | Maseshi'

    return (
        <section className="account" id="account" >
            <div className="row">
                <div className={isMobile() ? "col-md-3" : "col-md-3 pe-0"}>
                    <div className="container">
                        <Profile userData={userData} />
                        <Navbar />
                    </div>
                </div>
                <div className={isMobile() ? "col-md-9" : "col-md-9 ps-0"}>
                    <div className={isMobile() ? "container" : "container ps-0"}>
                        <Content userData={userData} />
                    </div>
                </div>
            </div>
            <CookieAccept />
        </section>
    )
}
