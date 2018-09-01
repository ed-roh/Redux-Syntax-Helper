import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Action from './Action';
import Reducer from './Reducer';
import ComponentFile from './ComponentFile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
            actionName, actionLogic, saveAction, deleteAction,
            reducerName, reducerState, connectingActions, saveReducer, deleteReducer,
            componentName, connectingActionsToComponents, saveComponent, deleteComponent,
            outputStore, outputIndex, outputActions, outputReducers, outputComponents
        } from '../../actions/List';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';

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
                <h3>Add Action Creator:</h3>
                <input value={this.props.currentAction[0]} onChange={this.props.actionName} type="text" placeholder="action name" />
                <input value={this.props.currentAction[1]} onChange={this.props.actionLogic} type="text" placeholder="action logic" />  
                <button type="button" onClick={() => this.props.saveAction()}>Save Action</button> 
                <ul>
                    {Object.entries(this.props.actions).map(ele => {
                        return  <li key={ele[0]}>
                                    <Action actionName={ele[0]} actionLogic={ele[1]} />
                                    <button type="button" onClick={() => this.props.deleteAction(ele[0])}>Delete</button>
                                </li>
                    })}
                </ul>



                {/* Reducers mini-Form */}
                <h3>Add Reducer</h3>
                <input value={this.props.currentReducer[0]} onChange={this.props.reducerName} type="text" placeholder="reducer name" />
                <input value={this.props.currentReducer[1]} onChange={this.props.reducerState} type="text" placeholder="reducer initial state" />  
                <Picky
                    value={this.props.actionReducerConnect}
                    options={bigList}
                    onChange={this.props.connectingActions}
                    open={true}
                    valueKey="id"
                    labelKey="name"
                    multiple={true}
                    includeSelectAll={true}
                    includeFilter={false}
                    dropdownHeight={600}
                />
                <button type="button" onClick={() => this.props.saveReducer()}>Save Reducer</button> 
                <ul>
                    {Object.entries(this.props.reducers).map(ele => {
                        return  <li key={ele[0]}>
                                    <Reducer reducerName={ele[0]} reducerInitialState={ele[1][0]} reducerActions={ele[1][1]} />
                                    <button type="button" onClick={() => this.props.deleteReducer(ele[0])}>Delete</button>
                                </li>
                    })}
                </ul>



                {/* Components mini-Form */}
                <h3>Add Component</h3>
                <input value={this.props.currentComponent} onChange={this.props.componentName} type="text" placeholder="reducer name" />
                <Picky
                    value={this.props.actionComponentConnect}
                    options={bigList}
                    onChange={this.props.connectingActionsToComponents}
                    open={true}
                    valueKey="id"
                    labelKey="name"
                    multiple={true}
                    includeSelectAll={true}
                    includeFilter={false}
                    dropdownHeight={600}
                />
                <button type="button" onClick={() => this.props.saveComponent()}>Save Component</button>
                <ul>
                    {Object.entries(this.props.components).map(ele => {
                        return  <li key={ele[0]}>
                                    <ComponentFile componentName={ele[0]} componentActions={ele[1].actions} />
                                    <button type="button" onClick={() => this.props.deleteComponent(ele)}>Delete</button>
                                </li>
                    })}
                </ul> 

                {/* Buttons for Full Form Submittal */}
                <div>
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
        actionName, actionLogic, saveAction, deleteAction,
        reducerName, reducerState, connectingActions, saveReducer, deleteReducer,
        componentName, connectingActionsToComponents, saveComponent, deleteComponent,
        outputStore, outputIndex, outputActions, outputReducers, outputComponents
    }, dispatch);
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

//// Connect ReduxForm ////
Form = reduxForm({
    form: 'fieldArrays'  // a unique identifier for this form
})(Form);
  

export default Form;







// <h3>Store Name</h3>
// <input value={this.props.storeName} onChange={this.props.storeNameChange} type="text" placeholder="store name" />




// const selector = formValueSelector('fieldArrays');
// Form = connect(
//     state => {
//         const membersValue = selector(state, 'members')
//         return {
//             membersValue
//         }
//     }
// )(Form);
  

// {/* <select multiple={true} value={[1,2,3,4]} onChange={this.handleActionConnect}>
//                     <option value="null">Connect Action</option>
//                     {Object.entries(this.props.actions).map(ele => {
//                         return <option key={ele[0]} value={ele[0]}>{ele[0]}</option>
//                     })}
//                 </select> */}

// actionNameAction={this.props.actionName}
// actionLogicAction={this.props.actionLogic}
// saveAction={this.props.saveAction}

////////////////////////////////////////////////////////////////////////
// renderActions({ fields, meta: { error, submitFailed } }) {
//     const { membersValue } = this.props;
//     return (
//         <ul>
    
//             {/* Button to add a new Action (I may want to configure it so 
//             you can have only one action at a time unless you save it) */}
//             <li>
//                 <button type="button" onClick={() => fields.push({})}>
//                     Add Action
//                 </button>
//                 {submitFailed && error && <span>{error}</span>}
//             </li>
    
//             {/* Renders each of the actions */}
//             {fields.map((member, index) => (
//                 <li key={index}>
//                     <button
//                         type="button"
//                         title="Remove Action"
//                         onClick={() => fields.remove(index)}
//                     />
//                     <h4>Action #{index + 1}</h4>
//                     <Field
//                         name={`${member}.actionName`}
//                         type="text"
//                         component={this.renderField}
//                         label="Action Name"
//                     />
//                     <Field
//                         name={`${member}.actionLogic`}
//                         type="text"
//                         component={this.renderField}
//                         label="Action Logic"
//                     />
    
//                     {/* To save the Action for later usage */}
//                     <button type="button"
//                         onClick={(membersValue) => this.props.changeActions(membersValue)}
//                     >
//                         Save Action
//                     </button>
//                 </li>
//             ))}
    
//         </ul>
//     );
// }


// renderField({ input, label, type, meta: { touched, error } }) {
//     return (
//         <div>
//             <label>{label}</label>
//             <div>
//             <input {...input} type={type} placeholder={label} />
//             {touched && error && <span>{error}</span>}
//             </div>
//         </div>
//     );
// }