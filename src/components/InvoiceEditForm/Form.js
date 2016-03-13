import React from 'react'

function GoodItemLine({goodItem, onChange}) {
    return (<span>
        #{goodItem.number} | 
        <input value={goodItem.name} onChange={e => onChange({ name: e.target.value })} /> | 
        <input value={goodItem.price} onChange={e => onChange({ price: e.target.value })}  /> 
    </span>);
}

export default function InvoiceEditForm({
    invoice, 
    onChange, 
    onGoodItem
    }) {
    return (<div>
            <h2>Invoice edit</h2>
            <div>
                <div>
                    Number: <input value={invoice.number} onChange={e => onChange({ number: e.target.value })} />
                </div>
                <div>
                    INN: <input value={invoice.inn} onChange={e => onChange({ inn: e.target.value })} />
                </div>
                <div>
                    {invoice.items.map((goodItem, i) => (
                        <div key={i}>
                            <GoodItemLine 
                                onChange={v => onGoodItem.change({ goodItemIndex: i, ...v })} 
                                goodItem={{number: i + 1, ...goodItem}} 
                            />
                            <button onClick={e => onGoodItem.delete({ goodItemIndex: i })}>x</button>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={e => onGoodItem.add()}>Add</button>
                </div>
            </div>
        </div>)
}