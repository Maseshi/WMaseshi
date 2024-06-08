import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

import styles from '@/styles/ScrollBack.module.css'

export default function ScrollBack({ bottom }) {
    const { t } = useTranslation('translation', { keyPrefix: 'components.ScrollBack' })
    const [top, setTop] = useState(true)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY === 0) {
                setTop(true)
            } else {
                setTop(false)
            }
        })
    }, [])

    return (
        <Button
            className={top ? styles.hidden : styles.show}
            aria-label={t('scroll_to_top')}
            style={bottom ? { marginBottom: bottom } : null}
            onClick={() => window.scrollTo(0, 0)}
        >
            <i className="bi bi-chevron-up" />
        </Button>
    )
}
ScrollBack.propTypes = {
    bottom: PropTypes.string
}
