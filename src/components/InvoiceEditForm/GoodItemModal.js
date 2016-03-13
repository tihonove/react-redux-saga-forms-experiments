import React from 'react'

function GoodItemForm({goodItem, onChange}) {
    return (<div>
        <div>
            Name: <input value={goodItem.name} onChange={e => onChange({ name: e.target.value })} /> 
        </div>
        <div>
            Price: <input value={goodItem.price} onChange={e => onChange({ price: e.target.value })}  /> 
        </div>
        <div>
            Special price: <input value={goodItem.specialPrice} onChange={e => onChange({ specialPrice: e.target.value })}  /> 
        </div>
    </div>)
}

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