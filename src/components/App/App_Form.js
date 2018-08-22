import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.renderActions = this.renderActions.bind(this);
        this.renderField = this.renderField.bind(this);
        this.saveAction = this.saveAction.bind(this);
    }

    renderField({ input, label, type, meta: { touched, error } }) {
        return (
            <div>
                <label>{label}</label>
                <div>
                <input {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
                </div>
            </div>
        );
    }

    renderActions({ fields, meta: { error, submitFailed } }) {
        return (
            <ul>
        
                {/* Button to add a new Action (I may want to configure it so 
                you can have only one action at a time unless you save it) */}
                <li>
                    <button type="button" onClick={() => fields.push({})}>
                        Add Action
                    </button>
                    {submitFailed && error && <span>{error}</span>}
                </li>
        
                {/* Renders each of the actions */}
                {fields.map((member, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            title="Remove Action"
                            onClick={() => fields.remove(index)}
                        />
                        <h4>Action #{index + 1}</h4>
                        <Field
                            name={`${member}.actionName`}
                            type="text"
                            component={this.renderField}
                            label="Action Name"
                        />
                        <Field
                            name={`${member}.actionLogic`}
                            type="text"
                            component={this.renderField}
                            label="Action Logic"
                        />
        
                        {/* To save the Action for later usage */}
                        <button type="button" onClick={this.saveAction}>
                            Save Action
                        </button>
                    </li>
                ))}
        
            </ul>
        );
    }

    saveAction() {
        const { membersValue } = this.props;
        console.log(membersValue);
        this.setState(prevState => {
            return {
                actions: [...membersValue],
                ...prevState
            }
        })   
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, actions, membersValue } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <FieldArray name="members" component={this.renderActions} />
    
                <div>
                    {actions.map(ele => {
                        return Object.keys(ele);
                    })}
                </div>

    
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
)(Form)
  
export default Form;

