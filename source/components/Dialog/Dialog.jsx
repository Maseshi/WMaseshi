import PropTypes from 'prop-types'
import { Modal, CloseButton } from 'react-bootstrap'

import styles from '@/styles/Dialog.module.css'

export default function Dialog(props) {
    return (
        <Modal
            {...props}
            className={styles.modal}
            contentClassName="rounded-4 p-2"
            backdropClassName={styles.backdrop}
            aria-labelledby={props.title}
        >
            <Modal.Header className={styles.header}>
                <Modal.Title id={props.id}>
                    {props.title}
                </Modal.Title>
                <CloseButton className={styles.close} onClick={props.onHide} />
            </Modal.Header>
            <hr className={styles.hr} />
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}
Dialog.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    onHide: PropTypes.func,
    children: PropTypes.node
}
