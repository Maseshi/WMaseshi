import SignIn from './SignIn'
import Register from './Register'
import Forgot from './Forgot'

import './style.css'

export default function index() {
    return (
        <>
            <SignIn />
            <Register />
            <Forgot />
        </>
    )
}
