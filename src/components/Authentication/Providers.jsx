import {
    getAuth,
    signInWithPopup,
    OAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from "firebase/auth"

// Assets
import microsoftLogo from '../../assets/icons/microsoft.svg'
import googleLogo from '../../assets/icons/google.webp'
import facebookLogo from '../../assets/icons/facebook.webp'
import githubLogo from '../../assets/icons/github.webp'

export default function Providers() {
    const handleSignIn = (method) => {
        const auth = getAuth()
        let provider

        if (method === 'microsoft') provider = new OAuthProvider('microsoft.com')
        if (method === 'google') {
            provider = new GoogleAuthProvider()
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        }
        if (method === 'facebook') provider = new FacebookAuthProvider()
        if (method === 'github') new GithubAuthProvider()

        signInWithPopup(auth, provider).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            console.log(errorCode, errorMessage)
        })
    }

    return (
        <>
            <button type="button" className="btn btn-link" onClick={() => handleSignIn('microsoft')}>
                <img src={microsoftLogo} alt="microsoft" width="30px" height="30px" />
            </button>
            <button type="button" className="btn btn-link" onClick={() => handleSignIn('google')}>
                <img src={googleLogo} alt="google" width="30px" height="30px" />
            </button>
            <button type="button" className="btn btn-link" onClick={() => handleSignIn('facebook')}>
                <img src={facebookLogo} alt="facebook" width="30px" height="30px" />
            </button>
            <button type="button" className="btn btn-link" onClick={() => handleSignIn('github')}>
                <img src={githubLogo} alt="github" width="30px" height="30px" />
            </button>
        </>
    )
}
