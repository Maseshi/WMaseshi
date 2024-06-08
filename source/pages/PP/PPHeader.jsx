import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'

import configs from '@/configs'

import styles from '@/styles/PP.module.css'

export default function PPHeader() {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'pages.PP' })

    return (
        <section className={styles.header}>
            <Container>
                <h1>
                    {t('privacy_policy')}
                </h1>
                <p>
                    {t('privacy_policy_description')}
                </p>
                <hr />
                <small>
                    {
                        t('privacy_policy_last_edit', {
                            last_change: new Date(configs.SITE.PRIVACY_POLICY.LAST_CHANGE).toLocaleString(i18n.language, { dateStyle: 'long' }),
                            effective: new Date(configs.SITE.PRIVACY_POLICY.EFFECTIVE).toLocaleString(i18n.language, { dateStyle: 'long' })
                        })
                    }
                </small>
            </Container>
        </section>
    )
}
