import { InputGroup } from 'react-bootstrap'

import LanguageOptions from '@/components/LanguageOptions'

export default function HeaderLanguages() {
    return (
        <div className="me-2">
            <InputGroup>
                <InputGroup.Text
                    className="rounded-start-3"
                    id="inputGroupHeaderChangeLanguages"
                >
                    <i className="bi bi-translate" />
                </InputGroup.Text>
                <LanguageOptions
                    className="rounded-end-3"
                    id="inputGroupHeaderChangeLanguages"
                />
            </InputGroup>
        </div>
    )
}
