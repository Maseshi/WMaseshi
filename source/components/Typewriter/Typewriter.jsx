import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

export default function Typewriter({ text, delay, infinite }) {
    const [currentText, setCurrentText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        let timeout

        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex])
                setCurrentIndex(prevIndex => prevIndex + 1)
            }, delay)
        } else if (infinite) {
            setCurrentIndex(0)
            setCurrentText('')
        }

        return () => clearTimeout(timeout)
    }, [currentIndex, delay, infinite, text])

    return (
        <>
            {currentText}
        </>
    )
}
Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    infinite: PropTypes.bool
}
