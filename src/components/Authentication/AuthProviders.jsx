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

export default function AuthProviders() {
    return (
        <>
            <button
                type="button"
                className="btn btn-link"
                onClick={
                    () => {
                        const auth = getAuth()
                        const provider = new OAuthProvider('microsoft.com')

                        signInWithPopup(auth, provider)
                            .catch((error) => {
                                const errorCode = error.code
                                const errorMessage = error.message

                                console.log(errorCode, errorMessage)
                            })
                    }
                }
            >
                <img src={microsoftLogo} alt="microsoft" width="30px" height="30px" />
            </button>
            <button
                type="button"
                className="btn btn-link"
                onClick={
                    () => {
                        const auth = getAuth()
                        const provider = new GoogleAuthProvider()

                        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
                        signInWithPopup(auth, provider)
                            .catch((error) => {
                                const errorCode = error.code
                                const errorMessage = error.message

                                console.log(errorCode, errorMessage)
                            })
                    }
                }
            >
                <img src={googleLogo} alt="google" width="30px" height="30px" />
            </button>
            <button
                type="button"
                className="btn btn-link"
                onClick={
                    () => {
                        const auth = getAuth()
                        const provider = new FacebookAuthProvider()

                        signInWithPopup(auth, provider)
                            .catch((error) => {
                                const errorCode = error.code
                                const errorMessage = error.message

                                console.log(errorCode, errorMessage)
                            })
                    }
                }
            >
                <img src={facebookLogo} alt="facebook" width="30px" height="30px" />
            </button>
            <button
                type="button"
                className="btn btn-link"
                onClick={
                    () => {
                        const auth = getAuth()
                        const provider = new GithubAuthProvider()

                        signInWithPopup(auth, provider)
                            .catch((error) => {
                                const errorCode = error.code
                                const errorMessage = error.message

                                console.log(errorCode, errorMessage)
                            })
                    }
                }
            >
                <img src={githubLogo} alt="github" width="30px" height="30px" />
            </button>
        </>
    )
}
