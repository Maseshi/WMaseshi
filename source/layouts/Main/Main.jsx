import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'

export default function Main({ container, children }) {
    return (
        <>
            {
                container ? (
                    <Container as="main">
                        {children}
                    </Container>
                ) : (
                    <main>
                        {children}
                    </main>
                )
            }
        </>
    )
}
Main.propTypes = {
    container: PropTypes.bool,
    children: PropTypes.node
}
