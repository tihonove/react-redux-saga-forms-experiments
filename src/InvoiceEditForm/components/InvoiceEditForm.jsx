import React from 'react'

import GoodItemLine from './GoodItemLine'

export default function InvoiceEditForm({invoice, onChange, onGoodItem}) {
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
                        <button onClick={e => onGoodItem.edit({ goodItemIndex: i })}>edit</button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={e => onGoodItem.add()}>Add</button>
            </div>
        </div>
    </div>)
}