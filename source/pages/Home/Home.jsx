import { useTranslation } from 'react-i18next'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Header from '@/layouts/Header'
import Head from '@/components/Head'

import configs from '@/configs'

import HomeWelcome from './HomeWelcome'
import HomeSkills from './HomeSkills'
import HomeAbout from './HomeAbout'
import HomeProjects from './HomeProjects'
import HomePowered from './HomePowered'
import HomeOther from './HomeOther'

export default function Home() {
    const { t } = useTranslation('translation', { keyPrefix: 'pages.Home.Home' })

    return (
        <>
            <Head
                title={t('website_title', { name: configs.SITE.NAME })}
                description={t('website_description')}
                subject={t('website_subject', { name: configs.SITE.NAME })}
            />

            <Header>
                <HomeWelcome />
            </Header>

            <main>
                <HomeAbout />
                <HomeSkills />
                <HomeProjects />
                <HomePowered />
                <HomeOther />
            </main>

            <CookieAccept />
            <ScrollBack />
        </>
    )
}
