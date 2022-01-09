import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getPerformance } from "firebase/performance";
import {
  initializeAppCheck,
  ReCaptchaV3Provider
} from 'firebase/app-check'
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Components
import Navbar from './components/Navbar/index'
import Footer from './components/Footer/index'

// Pages
import PageNotFound from './containers/Client/404/index'

import Home from './pages/Home/index'
import Account from './pages/Account/index'
import ToS from './pages/Terms of Service/index'
import PP from './pages/Privacy Policy/index'

export default function App() {
  const app = initializeApp({
    "apiKey": process.env.REACT_APP_API_KEY,
    "authDomain": process.env.REACT_APP_AUTH_DOMAIN,
    "databaseURL": process.env.REACT_APP_DATABASE_URL,
    "projectId": process.env.REACT_APP_PROJECT_ID,
    "storageBucket": process.env.REACT_APP_STORAGE_BUCKET,
    "messagingSenderId": process.env.REACT_APP_MESSAGING_SENDER_ID,
    "appId": process.env.REACT_APP_APP_ID,
    "measurementId": process.env.REACT_APP_MEASUREMENT_ID
  })

  if (process.env.NODE_ENV === 'production') {
    getAnalytics(app)
    getPerformance(app)
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lfe_f4aAAAAABG_DmZUtkHDmNfM7mf8Nhp9PYAz'),
      isTokenAutoRefreshEnabled: true
    })
  }

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/terms-of-service" element={<ToS />} />
          <Route path="/privacy-policy" element={<PP />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  )
}