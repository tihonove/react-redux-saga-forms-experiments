import React from 'react'

import { Modal, Button } from 'ui'

export default function ({ dispatch, show, text }) {
    var onDiscard = () => dispatch({ type: 'Discard' });
    var onConfirm = () => dispatch({ type: 'Confirm' });

    if (!show)
        return <noscript />
    return (
        <Modal onClose={onDiscard}>
            <Modal.Header>Confirmation</Modal.Header>
            <Modal.Body>
              {text}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onConfirm}>Да</Button>
              <Button onClick={onDiscard}>Нет</Button>
            </Modal.Footer>
        </Modal>        
        );
}