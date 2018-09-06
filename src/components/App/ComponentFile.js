import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editComponent, deleteComponent } from '../../actions/List';

class ComponentFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleEditingNameChange = this.handleEditingNameChange.bind(this);
        this.handleAccordion = this.handleAccordion.bind(this);
        this.state = {
            editing: false,
            accordion: false,
            changedName: this.props.componentName,
            changedActions: this.props.componentActions
        }
    }

    handleAccordion() {
        this.setState((prevState) => {
            return { accordion: !prevState.accordion }
        })
    }

    handleEditing(e) {
        const previousComponentName = this.props.componentName;
        if (this.state.editing) {
            this.props.editComponent(previousComponentName, this.state.changedName);
        }

        this.setState((prevState) => {
            return { editing: !prevState.editing }
        })
    }

    handleEditingNameChange(e) {
        this.setState({ changedName: e.target.value })
    }

    render() {
        const viewStyle = {};
        const editStyle = {};
        
        if (this.state.editing) {
            viewStyle.display = 'none';
        } else {
            editStyle.display = 'none';
        }

        return (
            <div>
                <button type="button" onClick={this.handleAccordion} className="accordion button_layout">
                <div className="button_name">
                    {this.state.changedName}
                </div>
                <div className="button_icon">{this.state.accordion ? 
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,14 10,6 18,14" />
                    </svg> :
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,6 10,14 18,6" />
                    </svg>
                }</div>
                </button>
                
                {this.state.accordion ? 
                    <div>
                        <div className="panel">
                            <div style={viewStyle}>
                                <div className="insideEdit">{this.state.changedName}</div>
                                <div className="insideEdit">
                                    Actions: 
                                    <ul>
                                        {this.state.changedActions.map(ele => {
                                            return <li className="actionLister" key={ele[0]}>{ele[0]}</li>}
                                        )}
                                    </ul>
                                </div>
                            </div>
                            
                            {/* <div style={editStyle}>
                                <input type="text" value={this.state.changedName} onChange={this.handleEditingNameChange} />
                            </div> */}

                            {/* <button type="button" onClick={this.handleEditing}>{this.state.editing ? 'Save' : 'Edit'}</button> */}
                            <button className="insideDeleteButton" type="button" onClick={() => this.props.deleteComponent(this.props.componentName)}>Delete</button>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editComponent,
        deleteComponent
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ComponentFile);