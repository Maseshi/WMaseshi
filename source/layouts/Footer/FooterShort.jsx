import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { DropdownButton, Dropdown, Button, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import configs from '@/configs'

import ThemeContext from '@/contexts/ThemeContext'

import styles from '@/styles/Footer.module.css'

export default function ShortFooter() {
    const { i18n } = useTranslation()
    const { theme } = useContext(ThemeContext)

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code)
    }

    return (
        <>
            <Outlet />

            <footer className={styles.short}>
                <div className={styles['short-backdrop']}>
                    <Row>
                        <Col className="text-start">
                            <Button
                                className={`text-${theme === 'dark' ? 'dark-emphasis' : 'dark'}`}
                                variant="link"
                                href="/"
                            >
                                &copy;{configs.SITE.NAME}
                            </Button>
                        </Col>
                        <Col className="text-end">
                            <DropdownButton
                                variant="link"
                                title={i18n.language}
                                drop="up"
                                id="languagesChange"
                            >
                                {
                                    configs.LANGUAGES.map((lang, index) => {
                                        const code = lang.code
                                        const name = lang.name

                                        return (
                                            <Dropdown.Item
                                                as="button"
                                                eventKey={index}
                                                key={index}
                                                onClick={() => handleLanguageChange(code)}
                                            >
                                                {name}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </DropdownButton>
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    )
}
