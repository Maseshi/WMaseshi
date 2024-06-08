import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Button } from 'react-bootstrap'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Projects.module.css'

export default function ProjectsGithub() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.Projects.ProjectsGithub' })
  const { theme } = useContext(ThemeContext)

  return (
    <Container as="section" className={styles.github}>
      <i className={`bi bi-github ${theme === 'dark' ? '' : 'bg-white'}`} />
      <div className={styles['glitch-wrapper']}>
        <div className={`${styles.glitch} ${theme === 'dark' ? '' : 'bg-white'}`} data-glitch="Github">
          Github
        </div>
      </div>
      <p className={theme === 'dark' ? '' : 'bg-white'} style={{ whiteSpace: 'pre-line' }}>
        {t('explore_more_projects')}
      </p>
      <Button variant="dark" href="https://github.com/Maseshi" target="_blank">
        {t('explore')}
        {' '}
        <i className="bi bi-box-arrow-up-right" />
      </Button>
    </Container>
  )
}
