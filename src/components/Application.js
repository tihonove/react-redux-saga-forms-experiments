import React from 'react'
import { connect } from 'react-redux'

export default connect(state => ({state: state}))(function Application({state}) {
    return <div>
        <pre>
            {JSON.stringify(state, null, '  ')}
        </pre>
    </div>
})