import React from 'react'

export default function GoodItemLine({goodItem, onChange}) {
    return (<span>
        #{goodItem.number} | 
        <input value={goodItem.name} onChange={e => onChange({ name: e.target.value })} /> | 
        <input value={goodItem.price} onChange={e => onChange({ price: e.target.value })}  /> 
    </span>);
}