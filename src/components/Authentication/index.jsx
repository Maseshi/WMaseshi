import SignIn from './SignIn'
import Register from './Register'
import Forgot from './Forgot'

import './style.css'

export default function Authentication() {
    return (
        <>
            <SignIn />
            <Register />
            <Forgot />
        </>
    )
}
