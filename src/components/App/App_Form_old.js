
// class Form extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleAddActions = this.handleAddActions.bind(this); 
//     }

//     renderField(field) {
//         return (
//             <div>
//                 <label>{field.label}: </label>
//                 <input type="text" {...field.input} />
//             </div>
//         );
//     }
    
//     handleAddActions() {

//     }

//     onSubmit(values) {
        
//     }

//     render() {
//         const { handleSubmit } = this.props;

//         return (
//             <div>
//                 <h4><em>Fill out this form and the syntax will be written for you, using best shorthand practices</em></h4>
//                 <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    
//                     {/* ------- Store ------- */}
//                     <div>
//                         <Field 
//                             label="Store Name"
//                             name="store"
//                             component={this.renderField}
//                         />  
//                     </div>
//                     <p>----------------</p>
//                     <br />


//                     {/* ------- Actions ------- */}
//                     <div>
//                         <div>
//                             <label>List of Actions: </label>
//                             <Field name="add-action" component="select">
//                                 <option />
//                                 <option>Action1</option>
//                             </Field>
//                         </div>
//                         <div>
//                             <Field 
//                                 label="Action Name"
//                                 name="action"
//                                 component={this.renderField}
//                             />
//                         </div>
//                         <div>
//                             <label>Action Logic (Optional): </label>
//                             <Field 
//                                 name="action-logic"
//                                 component="textarea"
//                             />
//                         </div>
//                         <button>Delete Action</button>
//                         <button onClick={this.handleAddActions}>Add Action</button>
//                     </div>
//                     <p>----------------</p>
//                     <br />


//                     {/* ------- Reducers ------- */}
//                     <div>
//                         <div>
//                             <label>List of Reducers: </label>
//                             <Field name="add-reducer" component="select">
//                                 <option />
//                                 <option>Reducer1</option>
//                             </Field>
//                         </div>
//                         <div>
//                             <Field 
//                                 label="Reducer Name"
//                                 name="reducer"
//                                 component={this.renderField}
//                             />
//                         </div>
//                         <div>
//                             <label>Reducer Logic (Optional): </label>
//                             <Field 
//                                 name="reducer-logic"
//                                 component="textarea"
//                             />
//                         </div>
//                         <div>
//                             <label>Initial State (Optional): </label>
//                             <Field 
//                                 name="initial-state"
//                                 component="textarea"
//                             />
//                         </div>
//                         <button>Delete Reducer</button>
//                         <button>Add Reducer</button>
//                     </div>
//                     <p>----------------</p>
//                     <br />


//                     {/* ------- Components ------- */}
//                     <div>
//                         <div>
//                             <Field 
//                                 label="Component Name"
//                                 name="component"
//                                 component={this.renderField}
//                             />
//                         </div>
//                         <div>
//                             <label>Connect Actions: </label>
//                             <Field name="connect-actions" component="select">
//                                 <option />
//                                 <option>Action1</option>
//                             </Field>
//                             <label>Connect Reducers: </label>
//                             <Field name="connect-reducers" component="select">
//                                 <option />
//                                 <option>Reducer1</option>
//                             </Field>
//                         </div>
//                     </div>
//                     <p>----------------</p>
//                     <br />

//                     <button>Reset</button>
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }













////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//     <div>
//         <label>{label}</label>
//         <div>
//         <input {...input} type={type} placeholder={label} />
//         {touched && error && <span>{error}</span>}
//         </div>
//     </div>
// )

// const renderActions = ({ fields, meta: { error, submitFailed } }) => (
//     <ul>

//         {/* Button to add a new Action (I may want to configure it so 
//         you can have only one action at a time unless you save it) */}
//         <li>
//             <button type="button" onClick={() => fields.push({})}>
//                 Add Action
//             </button>
//             {submitFailed && error && <span>{error}</span>}
//         </li>

//         {/* Renders each of the actions */}
//         {fields.map((member, index) => (
//             <li key={index}>
//                 <button
//                     type="button"
//                     title="Remove Action"
//                     onClick={() => fields.remove(index)}
//                 />
//                 <h4>Action #{index + 1}</h4>
//                 <Field
//                     name={`${member}.actionName`}
//                     type="text"
//                     component={renderField}
//                     label="Action Name"
//                 />
//                 <Field
//                     name={`${member}.actionLogic`}
//                     type="text"
//                     component={renderField}
//                     label="Action Logic"
//                 />

//                 {/* To save the Action for later usage */}
//                 <button type="button" onClick={saveAction}>
//                     Save Action
//                 </button>
//             </li>
//         ))}

//     </ul>
// )

// const saveAction = () => {
//     console.log(membersValue)
// }


// let Form = props => {
//     const { handleSubmit, pristine, reset, submitting, actions, membersValue } = props
//     return (
//         <form onSubmit={handleSubmit}>
//             <FieldArray name="members" component={renderActions} />

//             <div>
//                 {Object.values(actions).map(ele => {
//                     return ele;
//                 })}
//             </div>
            


//             {/* Buttons for Full Form Submittal */}
//             <div>
//                 <button type="button" disabled={pristine || submitting} onClick={reset}>
//                     Reset Values
//                 </button>
//                 <button type="submit" disabled={submitting}>
//                     Submit
//                 </button>
//             </div>

//         </form>
//     )
// }