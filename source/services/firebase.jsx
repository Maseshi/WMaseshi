import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

import configs from '@/configs'

const appConfig = {
    apiKey: configs.SERVER.API_KEY,
    authDomain: configs.SERVER.AUTH_DOMAIN,
    databaseURL: configs.SERVER.DATABASE_URL,
    projectId: configs.SERVER.PROJECT_ID,
    storageBucket: configs.SERVER.STORAGE_BUCKET,
    messagingSenderId: configs.SERVER.MESSAGING_SENDER_ID,
    appId: configs.SERVER.APP_ID,
    measurementId: configs.SERVER.MEASUREMENT_ID
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(appConfig) : getApps()[0]
const auth = getAuth(app)
const database = getDatabase(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)
const performance = getPerformance(app)
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(configs.RECAPTCHA_V3_PROVIDER),
    isTokenAutoRefreshEnabled: true
})

export { auth, database, firestore, storage, analytics, performance, appCheck }
export default app
