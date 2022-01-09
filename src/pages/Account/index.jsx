import React, { Component } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from "firebase/database";

import Profile from './Profile'
import Navbar from './Navbar'
import Content from './Contents/index'

import './style.css'

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: '',
            userData: ''
        }
    }

    componentDidMount() {
        const auth = getAuth()
        const db = getDatabase();

        const url = new URL(window.location)
        const param = url.searchParams.get('tab')
        const panel = document.getElementsByClassName('tab-pane')

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const dbRef = ref(db, 'data/users/' + user.uid)

                this.setState({
                    currentUser: user
                })
                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val()
                    this.setState({
                        userData: data
                    })
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

                this.setState({
                    currentUser: '',
                    userData: ''
                })
                signInModal.toggle()
                signInDismiss.hidden = true
                registerDismiss.hidden = true
                forgotDismiss.hidden = true
            }
        })

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
    }

    render() {
        document.title = 'บัญชี | Maseshi'
        
        return (
            <section className="account">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Profile currentUser={this.state.currentUser} userData={this.state.userData} />
                            <Navbar currentUser={this.state.currentUser} userData={this.state.userData} />
                        </div>
                        <div className="col-md-9">
                            <Content />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
