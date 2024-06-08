import { useTranslation } from 'react-i18next'

import CookieAccept from '@/components/CookieAccept'
import ScrollBack from '@/components/ScrollBack'
import Header from '@/layouts/Header'
import Head from '@/components/Head'

import configs from '@/configs'

import ProjectsHeader from './ProjectsHeader'
import ProjectsContent from './ProjectsContent'
import ProjectsGithub from './ProjectsGithub'

export default function Projects() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.Projects' })

  return (
    <>
      <Head
        title={t('website_title', { name: configs.SITE.NAME })}
        description={t('website_description', { name: configs.SITE.NAME })}
        subject={t('website_subject', { name: configs.SITE.NAME })}
      />
      <Header>
        <ProjectsHeader />
      </Header>

      <main>
        <ProjectsContent />
        <ProjectsGithub />
      </main>

      <CookieAccept />
      <ScrollBack />
    </>
  )
}
