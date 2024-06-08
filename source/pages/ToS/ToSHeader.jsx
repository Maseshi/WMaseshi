import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'

import configs from '@/configs'

import styles from '@/styles/ToS.module.css'

export default function ToSHeader() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.ToS' })

    return (
        <section className={styles.header}>
            <Container>
                <h1>
                    {t('terms_of_service')}
                </h1>
                <p>
                    {t('terms_of_service_description')}
                </p>
                <hr />
                <small>
                    {
                        t('terms_of_service_last_edit', {
                            last_change: new Date(configs.SITE.TERMS_OF_SERVICE.LAST_CHANGE).toLocaleString(i18n.language, { dateStyle: 'long' }),
                            effective: new Date(configs.SITE.TERMS_OF_SERVICE.EFFECTIVE).toLocaleString(i18n.language, { dateStyle: 'long' })
                        })
                    }
                </small>
            </Container>
        </section>
    )
}
