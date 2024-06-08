import { useContext } from 'react'
import { Button, Image } from 'react-bootstrap'
import {
    getAuth,
    signInWithPopup,
    OAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from 'firebase/auth'

import microsoft from '@/assets/icons/microsoft.svg'
import google from '@/assets/icons/google.webp'
import facebook from '@/assets/icons/facebook.webp'
import github from '@/assets/icons/github.webp'

import ThemeContext from '@/contexts/ThemeContext'

export default function AuthProviders() {
    const { theme } = useContext(ThemeContext)

    const handleSignIn = (method) => {
        let provider
        const auth = getAuth()

        if (method === 'microsoft') provider = new OAuthProvider('microsoft.com')
        if (method === 'google') {
            provider = new GoogleAuthProvider()
            provider.addScope('profile')
            provider.addScope('email')
        }
        if (method === 'facebook') provider = new FacebookAuthProvider()
        if (method === 'github') provider = new GithubAuthProvider()

        signInWithPopup(auth, provider).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            console.log(errorCode, errorMessage)
        })
    }

    return (
        <>
            <Button variant="link" onClick={() => handleSignIn('microsoft')}>
                <Image src={microsoft} alt="microsoft" width="30px" height="30px" />
            </Button>
            <Button variant="link" onClick={() => handleSignIn('google')}>
                <Image src={google} alt="google" width="30px" height="30px" />
            </Button>
            <Button variant="link" onClick={() => handleSignIn('facebook')}>
                <Image src={facebook} alt="facebook" width="30px" height="30px" />
            </Button>
            <Button variant="link" onClick={() => handleSignIn('github')} style={theme === 'dark' ? { filter: 'invert(100%)' } : null}>
                <Image src={github} alt="github" width="30px" height="30px" />
            </Button>
        </>
    )
}
