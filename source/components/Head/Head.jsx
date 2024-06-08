import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import lightCover from '@/assets/images/cover/light-cover.png'
import darkCover from '@/assets/images/cover/dark-cover.png'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

export default function Head({ title, description, keywords, subject, robots, cover, path, children }) {
    const location = useLocation()
    const { i18n } = useTranslation()
    const { theme } = useContext(ThemeContext)

    const origin = window.location.origin

    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description ?? ''} />
            <meta name="keywords" content={keywords ?? 'maseshi, fluke, chaiwat suwannarat, chaiwat'} />
            <meta name="subject" content={subject ?? ''} />
            <meta name="language" content={i18n.language} />
            <meta name="robots" content={robots ?? 'index, follow'} />
            <meta property="og:site_name" content={configs.SITE.NAME} />
            <meta property="og:title" content={title ?? ''} />
            <meta property="og:description" content={description ?? ''} />
            <meta property="og:image" content={cover ?? (theme === 'dark' ? darkCover : lightCover)} />
            <meta property="og:url" content={`${origin}${path ?? location.pathname}`} />
            <meta property="og:type" content="website" />

            <link rel="canonical" href={`${origin}${path ?? location.pathname}`} />

            {children}
        </Helmet>
    )
}
Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string,
    subject: PropTypes.string.isRequired,
    robots: PropTypes.string,
    cover: PropTypes.string,
    path: PropTypes.string,
    children: PropTypes.node
}
