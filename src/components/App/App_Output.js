import React from 'react';
import Legend from './App_Output_Legend';
import { connect } from 'react-redux';

const Output = props => {
    return (
        <div>
            <h2>Output</h2>
            <Legend />

            <h4>Store:</h4>
            <p>{props.storeName}</p>

            <h4>currentReducer:</h4>
            <p>{props.currentReducer[0]}</p>
            <p>{props.currentReducer[1]}</p>
            <p>{props.currentReducer[2]}</p>

            <h4>Actions:</h4>
            <p>{Object.entries(props.actions)}</p>

            <h4>Reducers:</h4>
            <p>{Object.entries(props.reducers)}</p>
            
            <h4>Components:</h4>
            <p>{props.currentComponent}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        actions: state.list.actions,
        reducers: state.list.reducers,
        components: state.list.components,
        storeName: state.list.storeName,
        currentAction: state.list.currentAction,
        currentReducer: state.list.currentReducer,
        currentComponent: state.list.currentComponent
    }
}

export default connect(mapStateToProps)(Output);
