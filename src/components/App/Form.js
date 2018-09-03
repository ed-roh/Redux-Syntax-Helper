import React from 'react';
import { reduxForm } from 'redux-form';
import Action from './Action';
import Reducer from './Reducer';
import ComponentFile from './ComponentFile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
            actionName, actionLogic, saveAction,
            reducerName, reducerState, connectingActions, saveReducer,
            componentName, connectingActionsToComponents, saveComponent, 
            outputStore, outputIndex, outputActions, outputReducers, outputComponents
} from '../../actions/List';

// multi-selector plugin import
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';

// code block editor plugin import
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/kuroir';
import 'brace/theme/xcode';


class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(values) {
        this.props.outputStore();
        this.props.outputIndex();
        this.props.outputActions();
        this.props.outputReducers();
        this.props.outputComponents();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const bigList = Object.keys(this.props.actions).map(ele => {
            return ele;
        })

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                
                {/* Actions mini-Form */}
                <div className="form_actions form_section">
                    <h3>Add Action Creator:</h3>
                    <input value={this.props.currentAction[0]} onChange={this.props.actionName} type="text" placeholder="action name" />  
                    <h4>Action Logic:</h4>
                    <AceEditor
                        height="100px"
                        width="100%"
                        mode="javascript"
                        theme="xcode"
                        value={this.props.currentAction[1]}
                        onChange={this.props.actionLogic}
                        name="aceEditTest"
                        editorProps={{$blockScrolling: true}}
                    />              
                    <button type="button" onClick={() => this.props.saveAction()}>Save Action</button> 
                    <ul>
                        {Object.entries(this.props.actions).map(ele => {
                            return  <li key={ele[0]}>
                                        <Action actionName={ele[0]} actionLogic={ele[1]} />
                                    </li>
                        })}
                    </ul>
                </div>



                {/* Reducers mini-Form */}
                <div className="form_reducers form_section">
                    <h3>Add Reducer</h3>
                    <input value={this.props.currentReducer[0]} onChange={this.props.reducerName} type="text" placeholder="reducer name" />
                    <h4>Reducer Initial State:</h4>
                    <AceEditor
                        height="100px"
                        width="100%"
                        mode="javascript"
                        theme="xcode"
                        value={this.props.currentReducer[1]}
                        onChange={this.props.reducerState}
                        name="aceEditTest"
                        editorProps={{$blockScrolling: true}}
                    />    
                    <Picky
                        value={this.props.actionReducerConnect}
                        options={bigList}
                        onChange={this.props.connectingActions}
                        placeholder="Connect Actions"
                        open={false}
                        valueKey="id"
                        labelKey="name"
                        multiple={true}
                        includeFilter={false}
                        dropdownHeight={600}
                    />
                    <button type="button" onClick={() => this.props.saveReducer()}>Save Reducer</button> 
                    <ul>
                        {Object.entries(this.props.reducers).map(ele => {
                            return  <li key={ele[0]}>
                                        <Reducer reducerName={ele[0]} reducerInitialState={ele[1][0]} reducerActions={ele[1][1]} />
                                    </li>
                        })}
                    </ul>
                </div>


                {/* Components mini-Form */}
                <div className="form_components form_section">
                    <h3>Add Component</h3>
                    <input value={this.props.currentComponent} onChange={this.props.componentName} type="text" placeholder="component name" />
                    <Picky
                        value={this.props.actionComponentConnect}
                        options={bigList}
                        onChange={this.props.connectingActionsToComponents}
                        placeholder="Connect Actions"
                        open={false}
                        valueKey="id"
                        labelKey="name"
                        multiple={true}
                        includeFilter={false}
                        dropdownHeight={600}
                    />
                    <button type="button" onClick={() => this.props.saveComponent()}>Save Component</button>
                    <ul>
                        {Object.entries(this.props.components).map(ele => {
                            return  <li key={ele[0]}>
                                        <ComponentFile componentName={ele[0]} componentActions={ele[1].actions} />
                                    </li>
                        })}
                    </ul> 
                </div>



                {/* Buttons for Full Form Submittal */}
                <div className="form_buttons form_section">
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Reset Values
                    </button>
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                </div>
    
            </form>
        );
    }
    
}

//// Connecting State & Props ////
const mapStateToProps = (state, props) => {
    return {
        actions: state.list.actions,
        reducers: state.list.reducers,
        components: state.list.components,
        currentAction: state.list.currentAction,
        currentReducer: state.list.currentReducer,
        currentComponent: state.list.currentComponent,
        actionReducerConnect: state.list.actionReducerConnect,
        actionComponentConnect: state.list.actionComponentConnect,
        outputStore: state.list.outputStore,
        outputIndex: state.list.outputIndex,
        outputActions: state.list.outputActions,
        outputReducers: state.list.outputReducers,
        outputComponents: state.list.outputComponents
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        actionName, actionLogic, saveAction, 
        reducerName, reducerState, connectingActions, saveReducer,
        componentName, connectingActionsToComponents, saveComponent,
        outputStore, outputIndex, outputActions, outputReducers, outputComponents
    }, dispatch);
}

// Connecting the Form with react-redux and with reduxForm
Form = connect(mapStateToProps, mapDispatchToProps)(Form);
Form = reduxForm({
    form: 'fieldArrays'  
})(Form);
  
export default Form;



// <input value={this.props.currentAction[1]} onChange={this.props.actionLogic} type="text" placeholder="action logic" />
// <input value={this.props.currentReducer[1]} onChange={this.props.reducerState} type="text" placeholder="reducer initial state" />  
