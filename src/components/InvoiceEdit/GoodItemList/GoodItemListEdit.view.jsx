import React from 'react'
import { forwardTo } from 'reelm'

import { Button } from 'ui'

import GoodItemLineEdit from './GoodItemLineEdit.view'

export default function({dispatch, goodItems}) {
    var onAdd = () => dispatch({type: 'Add'});
    
    return (
        <div>
            {goodItems.map((goodItem, index) => <div key={index}>
                <GoodItemLineEdit goodItem={goodItem} dispatch={forwardTo(dispatch, index)} />
            </div>)}
            <div>
                <Button onClick={onAdd}>Add</Button>
            </div>
        </div>
    );
}