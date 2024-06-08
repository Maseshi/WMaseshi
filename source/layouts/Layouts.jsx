import { Outlet } from 'react-router-dom'

import Nav from './Nav'
import { Footer } from './Footer'

export default function Layouts() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
