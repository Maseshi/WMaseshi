import { lazy } from 'react'
import DocumentMeta from 'react-document-meta'

import CookieAccept from '../../components/CookieAccept'
import ScrollToTop from '../../components/ScrollToTop/index'

import { translator } from '../../utils/functions/translator'

import './style.css';

const Welcome = lazy(() => import('./Welcome'))
const Skills = lazy(() => import('./Skills'))
const About = lazy(() => import('./About'))
const Projects = lazy(() => import('./Projects'))
const Other = lazy(() => import('./Other'))

export default function Home() {
    const meta = {
        title: translator().translate.pages.Home.Home.website_title,
        description: translator().translate.pages.Home.Home.description,
        canonical: '/',
        meta: {
            name: {
                keywords: 'maseshi, chaiwatsuwannarat, fluke, chaiwat',
                subject: translator().translate.pages.Home.Home.subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/maseshi_banner.jpg',
                'og:site_name': 'Maseshi'
            }
        }
    }

    return (
        <DocumentMeta {...meta}>
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Other />
            <CookieAccept />
            <ScrollToTop />
        </DocumentMeta>
    )
}
