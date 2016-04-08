import React from 'react'
import { forwardTo } from 'reelm'
import { Gapped, Checkbox, Input, Button } from 'ui'

import GoodItemListEdit from './GoodItemList/GoodItemListEdit.view'

export default function InvoiceEdit({ dispatch, viewDispatch, invoice, duplicateNumber }) {
    var onChange = (data) => dispatch({ type: 'Change', data: data });
    var onClear = (data) => dispatch({ type: 'ConfirmedClear' });
    var onChangeViewData = (data) => viewDispatch({ type: 'Change', data: data });

    return (
        <div>
            <h2>Invoice edit</h2>
            <Gapped vertical size={20}>
                <Checkbox checked={duplicateNumber} onChange={e => onChangeViewData({duplicateNumber: e.target.checked})}>Duplicate number</Checkbox>
                
                {duplicateNumber ? 
                    <div>Number : <input value={invoice.number} onChange={(e, v) => onChange({ number: e.target.value })} /></div>
                    : null}
                <div>Number : <Input value={invoice.number || ''} onChange={(e, v) => onChange({ number: v })} /></div>
                <div>Order number : <Input value={invoice.orderNumber || ''} onChange={(e, v) => onChange({ orderNumber: v })} /></div>
                
                <GoodItemListEdit goodItems={invoice.goodItems} dispatch={forwardTo(dispatch, 'GoodItems')} />

                <Button onClick={onClear}>Clear</Button>
            </Gapped>
        </div>
    );
}