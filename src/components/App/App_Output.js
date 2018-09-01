import React from 'react';
import Legend from './App_Output_Legend';
import { connect } from 'react-redux';

const Output = props => {
    return (
        <div>
            <h2>Output</h2>
            <Legend />

            <p>///////////////////////////////////////////////////////////</p>
            <h4>Store:</h4>
            <p>{props.outputStore}</p>

            <p>///////////////////////////////////////////////////////////</p>
            <h4>Index:</h4>
            <p>{props.outputIndex}</p>

            <p>///////////////////////////////////////////////////////////</p>
            <h4>Actions:</h4>
            <p>{props.outputActions}</p>

            <p>///////////////////////////////////////////////////////////</p>
            <h4>Reducers:</h4>
            {props.outputReducers.map(ele => {
                return  <div key={ele[0]}>
                            <h5>{ele[0]}</h5>
                            <p>{ele[1]}</p>
                        </div>
            })}
            
            <p>///////////////////////////////////////////////////////////</p>
            <h4>Components:</h4>
            {props.outputComponents.map(ele => {
                return  <div key={ele[0]}>
                            <h5>{ele[0]}</h5>
                            <p>{ele[1]}</p>
                        </div>
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        actions: state.list.actions,
        reducers: state.list.reducers,
        components: state.list.components,
        currentAction: state.list.currentAction,
        currentReducer: state.list.currentReducer,
        currentComponent: state.list.currentComponent,
        outputStore: state.list.outputStore,
        outputIndex: state.list.outputIndex,
        outputActions: state.list.outputActions,
        outputReducers: state.list.outputReducers,
        outputComponents: state.list.outputComponents
    }
}

export default connect(mapStateToProps)(Output);
