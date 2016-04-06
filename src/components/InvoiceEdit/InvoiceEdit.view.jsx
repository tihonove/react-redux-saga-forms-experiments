import React from 'react'
import { forwardTo } from 'reelm'
import { Input, Button } from 'ui'

import GoodItemListEdit from './GoodItemList/GoodItemListEdit.view'

export default function InvoiceEdit({ dispatch, invoice }) {
    var onChange = (data) => dispatch({ type: 'Change', data: data })
    var onClear = (data) => dispatch({ type: 'ConfirmedClear' })
    return (
        <div>
            <h2>Invoice edit</h2>
            <div>Number : <input value={invoice.number} onChange={(e, v) => onChange({ number: e.target.value })} /></div>
            <div>Number : <Input value={invoice.number || ''} onChange={(e, v) => onChange({ number: v })} /></div>
            <div>Order number : <Input value={invoice.orderNumber || ''} onChange={(e, v) => onChange({ orderNumber: v })} /></div>
            
            <GoodItemListEdit goodItems={invoice.goodItems} dispatch={forwardTo(dispatch, 'GoodItems')} />

            <Button onClick={onClear}>Clear</Button>
        </div>
    );
}