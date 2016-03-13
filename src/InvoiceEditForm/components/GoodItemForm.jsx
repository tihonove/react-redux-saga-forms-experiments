import React from 'react'

export default function GoodItemForm({goodItem, onChange}) {
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
