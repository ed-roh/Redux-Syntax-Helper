import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editAction, deleteAction } from '../../actions/List';

// code block syntax highlighter plugin import
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs/xcode';

// code block editor plugin import
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/kuroir';
import 'brace/theme/xcode';

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleEditingNameChange = this.handleEditingNameChange.bind(this);
        this.handleEditingLogicChange = this.handleEditingLogicChange.bind(this);
        this.handleAccordion = this.handleAccordion.bind(this);
        this.state = {
            editing: false,
            accordion: false,
            changedName: this.props.actionName,
            changedLogic: this.props.actionLogic
        }
    }

    handleAccordion() {
        this.setState((prevState) => {
            return { accordion: !prevState.accordion }
        })
    }

    handleEditing() {
        const previousActionName = this.props.actionName;
        if (this.state.editing) {
            this.props.editAction(previousActionName, this.state.changedName, this.state.changedLogic);
        }

        this.setState((prevState) => {
            return { editing: !prevState.editing }
        })
    }

    handleEditingNameChange(e) {
        this.setState({ changedName: e.target.value })
    }
    
    handleEditingLogicChange(e) {
        this.setState({ changedLogic: e.target.value })
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
                <div className="button_icon ">{this.state.accordion ? 
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,14 10,6 18,14" />
                    </svg> :
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,6 10,14 18,6" />
                    </svg>
                }</div>
                </button>

               
                {this.state.accordion ? 
                    <div className="panel">
                        <div style={viewStyle}>
                            <div className="insideEdit">{this.state.changedName}</div>
                            <SyntaxHighlighter className="insideEdit logicEdit" language='javascript' style={xcode}>{this.state.changedLogic}</SyntaxHighlighter> 
                        </div>
                        
                        <div style={editStyle}>
                            <input type="text" value={this.state.changedName} onChange={this.handleEditingNameChange} />
                            <AceEditor
                                height="80px"
                                width="100%"
                                mode="javascript"
                                theme="xcode"
                                value={this.state.changedLogic}
                                onChange={this.handleEditingLogicChange}
                                name="aceEditTest"
                                editorProps={{$blockScrolling: true}}
                            />  
                        </div>

                        <div className="insideButtons">
                            {/* <button type="button" onClick={this.handleEditing}>{this.state.editing ? 'Save' : 'Edit'}</button> */}
                            <button className="insideDeleteButton" type="button" onClick={() => this.props.deleteAction(this.props.actionName)}>Delete</button>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editAction,
        deleteAction
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Action);


// <input type="text" value={this.state.changedLogic} onChange={this.handleEditingLogicChange} />
