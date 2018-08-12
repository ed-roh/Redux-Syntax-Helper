import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class Form extends React.Component {
    renderField(field) {
        return (
            <div>
                <label>{field.label}: </label>
                <input type="text" {...field.input} />
            </div>
        );
    }
    
    onSubmit(values) {
        
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h4><em>Fill out this form and the syntax will be written for you, using best shorthand practices</em></h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    
                    <div>
                        <Field 
                            label="Store Name"
                            name="store"
                            component={this.renderField}
                        />
                        
                    </div>
                    <p>----------------</p>
                    <br />

                    <div>
                        <div>
                            <label>List of Reducers: </label>
                            <Field name="add-reducer" component="select">
                                <option />
                                <option>Reducer1</option>
                            </Field>
                        </div>
                        <div>
                            <Field 
                                label="Action Name"
                                name="action"
                                component={this.renderField}
                            />
                        </div>
                        <div>
                            <label>Action Logic (Optional): </label>
                            <Field 
                                name="action-logic"
                                component="textarea"
                            />
                        </div>
                    </div>
                    <p>----------------</p>
                    <br />

                    <div>
                        <Field 
                            label="Reducer Name"
                            name="reducer"
                            component={this.renderField}
                        />
                    </div>
                    <p>----------------</p>
                    <br />

                    <div>
                        <Field 
                            label="Component Name"
                            name="component"
                            component={this.renderField}
                        />
                    </div>
                    <p>----------------</p>
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'Form'
})(connect()(Form));