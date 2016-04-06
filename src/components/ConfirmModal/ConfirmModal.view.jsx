import React from 'react'

import { Gapped, Modal, Button } from 'ui'

export default function ({ dispatch, show, text }) {
    var onDiscard = () => dispatch({ type: 'Discard' });
    var onConfirm = () => dispatch({ type: 'Confirm' });

    if (!show)
        return <noscript />
    return (
        <Modal onClose={onDiscard}>
            <Modal.Header>Confirmation</Modal.Header>
            <Modal.Body>
                <div style={{minWidth: 200}}>{text}</div>
            </Modal.Body>
            <Modal.Footer>
                <Gapped size={20}>
                    <Button use="primary" onClick={onConfirm}>Да</Button>
                    <Button onClick={onDiscard}>Нет</Button>
                </Gapped>              
            </Modal.Footer>
        </Modal>        
        );
}