import PropTypes from 'prop-types'

export default function Header({ children }) {
    return (
        <header>
            {children}
        </header>
    )
}
Header.propTypes = {
    children: PropTypes.node
}
