import React from 'react'

import { Input, Button } from 'ui'

export default function({dispatch, goodItem}) {
    var onChange = (data) => dispatch({ type: 'Change', data: data });
    var onDelete = () => dispatch({ type: 'DeleteConfirmed' });

    return (
        <div>
            <Input value={goodItem.name} onChange={(e, v) => onChange({ name: v })} />
            <Input value={goodItem.price} onChange={(e, v) => onChange({ price: v })} />
            <Button onClick={onDelete}>Delete</Button>
        </div>
    );
}