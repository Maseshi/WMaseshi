import PropTypes from 'prop-types'

import styles from '@/styles/Waves.module.css'

export default function Waves({ position, className, r = 240, g = 240, b = 240 }) {
    // Condition of R color
    if (typeof r === 'string') {
        r = 240
        console.log('Color R must be a number only.')
    }
    if ((typeof r === 'number' && r > 255) || (typeof r === 'number' && r < 0)) {
        r = (r > 255 ? 255 : r) || (r < 0 ? 0 : r)

        console.log('Color R should not be greater than 255 and less than 0.')
    }

    // Condition of G color
    if (typeof g === 'string') {
        g = 240
        console.log('Color G must be a number only.')
    }
    if ((typeof g === 'number' && g > 255) || (typeof g === 'number' && g < 0)) {
        g = (g > 255 ? 255 : g) || (g < 0 ? 0 : g)

        console.log('Color G should not be greater than 255 and less than 0.')
    }

    // Condition of B color
    if (typeof b === 'string') {
        b = 250
        console.log('Color B must be a number only.')
    }
    if ((typeof b === 'number' && b > 255) || (typeof b === 'number' && b < 0)) {
        b = (b > 255 ? 255 : b) || (b < 0 ? 0 : b)

        console.log('Color B should not be greater than 255 and less than 0.')
    }

    return (
        <div
            className={
                position ? (
                    position === 'top' ? (
                        styles.top + ' ' + (className || '')
                    ) : (
                        styles.bottom + ' ' + (className || '')
                    )
                ) : (
                    !position && className ? (
                        className
                    ) : (
                        styles.top
                    )
                )
            }
        >
            <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="waves-gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className={styles.parallax}>
                    <use xlinkHref="#waves-gentle-wave" x="48" y="0" fill={"rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 0.7)"} />
                    <use xlinkHref="#waves-gentle-wave" x="48" y="3" fill={"rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 0.5)"} />
                    <use xlinkHref="#waves-gentle-wave" x="48" y="5" fill={"rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 0.3)"} />
                    <use xlinkHref="#waves-gentle-wave" x="48" y="7" fill={"rgba(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ", 1)"} />
                </g>
            </svg>
        </div>
    )
}
Waves.propTypes = {
    position: PropTypes.string,
    className: PropTypes.string,
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
}
