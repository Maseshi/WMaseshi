import Welcome from './Welcome'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Other from './Other'

import CookieAccept from '../../components/CookieAccept'
import ScrollToTop from '../../components/ScrollToTop/index'

import './style.css';

export default function Home() {
    document.title = 'Maseshi'
    
    return (
        <>
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Other />
            <CookieAccept />
            <ScrollToTop />
        </>
    )
}
