import PropTypes from 'prop-types'
import { Placeholder, Image } from 'react-bootstrap'

import styles from '@/styles/Project.module.css'

export default function ProjectBackground({ data, document }) {
  return (
    <>
      {
        data.isLoading ? (
          <Placeholder as="div" className="mb-5" animation="glow" width="100%" height="100%">
            <Placeholder className="rounded-3" style={{ width: '100%', height: '200px' }} />
          </Placeholder>
        ) : data.isError ? (
          ''
        ) : document.background && document.background.src ? (
          <Image
            className="mb-5"
            src={document.background.src ?? null}
            alt={document.title}
            width="100%"
            height="200px"
            loading="lazy"
          />
        ) : document.icon && document.icon.src ? (
          <Image
            className={`${styles.icon} mb-5`}
            src={document.icon.src ?? null}
            alt={document.title}
            width="100%"
            height="200px"
            loading="lazy"
          />
        ) : (
          <div className={`${styles.bi} mb-5`}>
            <i className="bi bi-archive" />
          </div>
        )
      }
    </>
  )
}
ProjectBackground.propTypes = {
  data: PropTypes.object,
  document: PropTypes.object
}
