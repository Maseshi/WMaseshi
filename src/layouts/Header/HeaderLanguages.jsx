import { useState } from 'react'

import { setCookie } from '../../utils/functions/setCookie'
import { translator } from '../../utils/functions/translator'

import config from '../../configs/data'

export default function HeaderLanguages() {
    const [languageSelection, setLanguageSelection] = useState(translator().code)

    const handleLanguageChange = (event) => {
        setLanguageSelection(event.target.value)
        setCookie('languageSelect', event.target.value, 60)
        window.location.reload()
    }

    return (
        <div className="navbar-languages me-3">
            <div className="input-group">
                <div className="input-group-text">
                    <i className="bi bi-translate"></i>
                </div>
                <select className="form-select" value={languageSelection} aria-label="Languages options" onChange={(event) => handleLanguageChange(event)}>
                    {
                        config.LANGUAGES.map((lang, index) => {
                            const code = lang.code
                            const name = lang.name

                            return (
                                <option key={index} value={code}>{name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
