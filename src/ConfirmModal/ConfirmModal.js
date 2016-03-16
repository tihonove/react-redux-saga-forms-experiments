import React from 'react'

export default class ConfirmModal extends React.Component { 
    render() {
        var {show, text, onYes, onNo} = this.props;
        if (!show) {
            return <span />
        }
        return <div>
            <hr />
            <h3>Modal</h3>
                {text}
            <br />
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
            <hr />
        </div>
    }
}