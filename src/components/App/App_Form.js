import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
            storeNameChange, 
            actionName, actionLogic, saveAction,
            reducerName, reducerState, reducerLogic, saveReducer,
            componentName, saveComponent
} from '../../actions/List';

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <h3>Store Name</h3>
                <input value={this.props.storeName} onChange={this.props.storeNameChange} type="text" placeholder="store name" />

                {/* Actions mini-Form */}
                <h3>Add Action</h3>
                <input value={this.props.currentAction[0]} onChange={this.props.actionName} type="text" placeholder="action name" />
                <input value={this.props.currentAction[1]} onChange={this.props.actionLogic} type="text" placeholder="action logic" />  
                <button type="button" onClick={() => this.props.saveAction()}>Save Action</button> 

                {/* Reducers mini-Form */}
                <h3>Add Reducer</h3>
                <input value={this.props.currentReducer[0]} onChange={this.props.reducerName} type="text" placeholder="reducer name" />
                <input value={this.props.currentReducer[1]} onChange={this.props.reducerState} type="text" placeholder="reducer initial state" />  
                <input value={this.props.currentReducer[2]} onChange={this.props.reducerLogic} type="text" placeholder="reducer logic" />  
                <button type="button" onClick={() => this.props.saveReducer()}>Save Reducer</button> 

                {/* Components mini-Form */}
                <h3>Add Component</h3>
                <input value={this.props.currentComponent} onChange={this.props.componentName} type="text" placeholder="reducer name" />
                <button type="button" onClick={() => this.props.saveComponent()}>Save Component</button> 

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
        storeName: state.list.storeName,
        currentAction: state.list.currentAction,
        currentReducer: state.list.currentReducer,
        currentComponent: state.list.currentComponent
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        storeNameChange,
        actionName, actionLogic, saveAction,
        reducerName, reducerState, reducerLogic, saveReducer,
        componentName, saveComponent
    }, dispatch);
}

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

//// Connect ReduxForm and formValueSelector ////
Form = reduxForm({
    form: 'fieldArrays'  // a unique identifier for this form
})(Form);
  
const selector = formValueSelector('fieldArrays');
Form = connect(
    state => {
        const membersValue = selector(state, 'members')
        return {
            membersValue
        }
    }
)(Form);
  
export default Form;



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