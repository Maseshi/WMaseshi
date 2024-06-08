import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '@/configs'

export default function LanguageOptions({ className, id }) {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'components.LanguageOptions' })

    const handleLanguageChange = (event) => i18n.changeLanguage(event.target.value)

    return (
        <Form.Select
            className={className}
            aria-label={t('language_options')}
            aria-describedby={id}
            value={i18n.language}
            onChange={(event) => handleLanguageChange(event)}
        >
            {
                config.LANGUAGES.map((lang, index) => {
                    const code = lang.code
                    const name = lang.name

                    return (
                        <option key={index} value={code}>
                            {name}
                        </option>
                    )
                })
            }
        </Form.Select>
    )
}
LanguageOptions.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string
}
