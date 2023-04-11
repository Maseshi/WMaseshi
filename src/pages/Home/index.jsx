import { Helmet } from 'react-helmet'

import CookieAccept from '../../components/CookieAccept'
import ScrollToTop from '../../components/ScrollToTop/index'

import { translator } from '../../utils/functions/translator'

import Welcome from './Welcome'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Powered from './Powered'
import Other from './Other'

import './style.css'

export default function Home() {
    return (
        <>
            <Helmet>
                <title>{translator().translate.pages.Home.Home.website_title}</title>
                <meta name="description" content={translator().translate.pages.Home.Home.description} />
                <meta name="keywords" content="maseshi, chaiwatsuwannarat, fluke, chaiwat" />
                <meta name="subject" content={translator().translate.pages.Home.Home.subject} />
                <meta name="language" content="TH" />
                <meta name="robots" content="index, follow" />
                <meta property="og:site_name" content="Maseshi" />
                <meta property="og:title" content={translator().translate.pages.Home.Home.website_title} />
                <meta property="og:description" content={translator().translate.pages.Home.Home.description} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/maseshi_banner.jpg'} />
                <meta property="og:url" content='https://maseshi.web.app/' />
                <meta property="og:type" content="website" />
                <link rel="canonical" href='https://maseshi.web.app/' />
            </Helmet>
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Powered />
            <Other />
            <CookieAccept />
            <ScrollToTop />
        </>
    )
}
