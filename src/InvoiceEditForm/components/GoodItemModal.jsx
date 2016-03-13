import React from 'react'

import GoodItemForm from './GoodItemForm'

export default function GoodItemModal({show, onCancel, onComplete, ...innerProps}) {
    if (!show)
        return (<span />);
    return (<div>
        <h3>Modal</h3>
            <GoodItemForm {...innerProps} />
        <div>
            <button onClick={onComplete}>OK</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    </div>);
}