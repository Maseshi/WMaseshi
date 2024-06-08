import { Nav, NavDropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

export default function HeaderMenu() {
    const location = useLocation()
    const { t } = useTranslation('translation', { keyPrefix: 'layouts.Nav.NavMenu' })

    return (
        <Nav as="ul" className="me-auto mb-2 mb-lg-0 align-items-center" variant="underline">
            <Nav.Item as="li">
                <NavDropdown
                    title={t('main')}
                    active={location.pathname === '/home'}
                    id="navbarScrollingHomeDropdown"
                >
                    <NavDropdown.Item as={HashLink} to="/#about">
                        {t('about')}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={HashLink} to="/#skills">
                        {t('ability')}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={HashLink} to="/#projects">
                        {t('projects')}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={HashLink} to="/#powered">
                        {t('powered')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={HashLink} to="/#other">
                        {t('others')}
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={Link} active={location.pathname === '/projects'} to="/projects">
                    {t('projects')}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={Link} active={location.pathname === '/contact'} to="/contact">
                    {t('contact')}
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
