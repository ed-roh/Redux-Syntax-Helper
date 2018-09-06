import React from 'react';
import Legend from './Legend';
import { connect } from 'react-redux';
import OutputReducer from './Output_Reducer';
import OutputComponent from './Output_Component';

// code block syntax highlighter plugin import
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs/xcode';


const Output = props => {
    return (
        <div className="output">
            <div className="mainTitles">
                <h2>Output</h2>
                <hr className="titleLine" />
            </div>

            <div className="output_store output_section">
                <h4>Store:</h4>
                <SyntaxHighlighter className="codeBlock" language='javascript' style={xcode}>{props.outputStore}</SyntaxHighlighter> 
            </div>

            <div className="output_index output_section">
                <h4>Index:</h4>
                <SyntaxHighlighter className="codeBlock" language='javascript' style={xcode}>{props.outputIndex}</SyntaxHighlighter> 
            </div>

            <div className="output_actions output_section">
                <h4>Actions:</h4>
                <SyntaxHighlighter className="codeBlock" language='javascript' style={xcode}>{props.outputActions}</SyntaxHighlighter> 
            </div>

            <div className="output_reducers output_section">
                <h4>Reducers:</h4>
                {props.outputReducers.map(ele => {
                    return  <div key={ele[0]}>
                                <OutputReducer reducerName={ele[0]} reducerLogic={ele[1]} />
                            </div>
                })}
            </div>
            
            <div className="output_components output_section">
                <h4>Components:</h4>
                {props.outputComponents.map(ele => {
                    return  <div key={ele[0]}>
                                <OutputComponent componentName={ele[0]} componentLogic={ele[1]} />
                            </div>
                })}
            </div>

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
