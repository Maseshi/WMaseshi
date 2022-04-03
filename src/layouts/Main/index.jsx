import { Routes, Route } from 'react-router-dom'

// Pages
import PageNotFound from '../../pages/404/index'
import Home from '../../pages/Home/index'
import Account from '../../pages/Account/index'
import Projects from '../../pages/Projects/index'
import ToS from '../../pages/Terms of Service/index'
import PP from '../../pages/Privacy Policy/index'

export default function Main() {
    return (
        <main>
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/terms-of-service" element={<ToS />} />
                <Route path="/privacy-policy" element={<PP />} />
            </Routes>
        </main>
    )
}
