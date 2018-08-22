import React from 'react';
import Legend from './App_Output_Legend';

const Output = props => {
    return (
        <div>
            <h2>Output</h2>
            <Legend />

            <h4>Store:</h4>
            <p>{props.storeName}</p>

            <h4>Actions:</h4>
            {/*  <p>{Object.values(props.actions).map(ele => {
                return ele;
            })}</p> */}

            <h4>Reducers:</h4>
            <p>{Object.values(props.reducers).map(ele => {
                return ele;
            })}</p>

            <h4>Components:</h4>
            <p>{Object.keys(props.components).map(ele => {
                return ele;
            })}</p>
        </div>
    );
}
    

export default Output;