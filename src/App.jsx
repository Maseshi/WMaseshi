import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

// Packages
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Configs
import config from './configs/data'

// Layouts
import Header from './layouts/Header/index'
import Main from './layouts/Main/index'
import Footer from './layouts/Footer/index'

// Styles
import './styles.css'

export default function App() {
  const app = initializeApp({
    apiKey: config.SERVER.API_KEY,
    authDomain: config.SERVER.AUTH_DOMAIN,
    databaseURL: config.SERVER.DATABASE_URL,
    projectId: config.SERVER.PROJECT_ID,
    storageBucket: config.SERVER.STORAGE_BUCKET,
    messagingSenderId: config.SERVER.MESSAGING_SENDER_ID,
    appId: config.SERVER.APP_ID,
    measurementId: config.SERVER.MEASUREMENT_ID
  })

  if (process.env.NODE_ENV === 'production') {
    getAnalytics(app)
    getPerformance(app)
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(config.RECAPTCHA_V3_PROVIDER),
      isTokenAutoRefreshEnabled: true
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}