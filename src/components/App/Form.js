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
            outputStore, outputIndex, outputActions, outputReducers, outputComponents,
            resetEverything
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
        this.handleReset = this.handleReset.bind(this);
    }

    onSubmit(values) {
        this.props.outputStore();
        this.props.outputIndex();
        this.props.outputActions();
        this.props.outputReducers();
        this.props.outputComponents();
    }

    handleReset() {
        this.props.resetEverything();
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const bigList = Object.keys(this.props.actions).map(ele => {
            return ele;
        })

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <div className="mainTitles">
                    <h2>Form</h2>
                    <hr className="titleLine" />
                </div>
                
                {/* Actions mini-Form */}
                <h3 className="actionTitle">Add Action Creators:</h3>
                <div className="form_actions form_section">
                    <h4>Action Name:</h4>
                    <input className="inputter" value={this.props.currentAction[0]} onChange={this.props.actionName} type="text" placeholder="action name" />  
                    <h4>Action Logic:</h4>
                    <AceEditor
                        showGutter={false}
                        highlightActiveLine={false}
                        className="ace"
                        height="150px"
                        width="100%"
                        mode="javascript"
                        theme="xcode"
                        value={this.props.currentAction[1]}
                        onChange={this.props.actionLogic}
                        name="aceEditTest"
                        editorProps={{$blockScrolling: true}}
                    />              
                    <button className="saveButton" type="button" onClick={() => this.props.saveAction()}>Save Action</button> 
                    <hr />
                    <ul className="list">
                        {Object.entries(this.props.actions).map(ele => {
                            return  <li key={ele[0]}>
                                        <Action actionName={ele[0]} actionLogic={ele[1]} />
                                    </li>
                        })}
                    </ul>
                </div>



                {/* Reducers mini-Form */}
                <h3 className="reducerTitle">Add Reducers:</h3>
                <div className="form_reducers form_section">
                    <h4>Reducer Name:</h4>
                    <input className="inputter" value={this.props.currentReducer[0]} onChange={this.props.reducerName} type="text" placeholder="reducer name" />
                    <h4>Reducer Initial State:</h4>
                    <AceEditor
                        highlightActiveLine={false}
                        showGutter={false}
                        className="ace"
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
                        className="multiSelector"
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
                    <button className="saveButton" type="button" onClick={() => this.props.saveReducer()}>Save Reducer</button> 
                    <hr />
                    <ul className="list">
                        {Object.entries(this.props.reducers).map(ele => {
                            return  <li key={ele[0]}>
                                        <Reducer reducerName={ele[0]} reducerInitialState={ele[1][0]} reducerActions={ele[1][1]} />
                                    </li>
                        })}
                    </ul>
                </div>


                {/* Components mini-Form */}
                <h3 className="componentTitle">Add Components:</h3>
                <div className="form_components form_section">
                    <h4>Component Name:</h4>
                    <input className="inputter" value={this.props.currentComponent} onChange={this.props.componentName} type="text" placeholder="component name" />
                    <Picky
                        className="multiSelector2"
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
                    <button className="saveButton" type="button" onClick={() => this.props.saveComponent()}>Save Component</button>
                    <hr />
                    <ul className="list">
                        {Object.entries(this.props.components).map(ele => {
                            return  <li key={ele[0]}>
                                        <ComponentFile componentName={ele[0]} componentActions={ele[1].actions} />
                                    </li>
                        })}
                    </ul> 
                </div>



                {/* Buttons for Full Form Submittal */}
                <div className="form_buttons">
                    <button className="reset" type="button" onClick={this.handleReset}>
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
        outputStore, outputIndex, outputActions, outputReducers, outputComponents,
        resetEverything
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
