import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editReducer, deleteReducer } from '../../actions/List';

import Picky from 'react-picky';
import 'react-picky/dist/picky.css';

// code block syntax highlighter plugin import
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs/xcode';

// code block editor plugin import
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/kuroir';
import 'brace/theme/xcode';

class Reducer extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleEditingNameChange = this.handleEditingNameChange.bind(this);
        this.handleEditingInitialStateChange = this.handleEditingInitialStateChange.bind(this);
        this.handleEditingActions = this.handleEditingActions.bind(this);
        this.handleAccordion = this.handleAccordion.bind(this);
        this.state = {
            editing: false,
            accordion: false,
            changedName: this.props.reducerName,
            changedInitialState: this.props.reducerInitialState,
            changedActions: this.props.reducerActions,
            actionsValue: []
        }
    }

    handleEditing() {
        const previousReducerName = this.props.reducerName;
        console.log(this.props.reducers[previousReducerName][2]);
        if (this.state.editing) {
            {/* (previousReducerName, p2, p3, p4, p5) => new Promise((resolve, reject) => {
                this.props.editReducer(previousReducerName, p2, p3, p4, p5);
                resolve();
            })   */}
            this.props.editReducer(previousReducerName, this.state.changedName, this.state.changedInitialState, this.state.actionsValue)
        }

        this.setState(prevState => {
            return { 
                editing: !prevState.editing,
                changedActions: this.props.reducers[this.props.reducerName][2]
            }
        })
    }

    handleAccordion() {
        this.setState((prevState) => {
            return { accordion: !prevState.accordion }
        })
    }

    handleEditingNameChange(e) {
        this.setState({ changedName: e.target.value })
    }

    handleEditingInitialStateChange(e) {
        this.setState({ changedInitialState: e.target.value })
    }
    

    handleEditingActions(v) {
        this.setState({ actionsValue: v })
    }

    render() {
        const viewStyle = {};
        const editStyle = {};
        const bigList = Object.keys(this.props.actions).map(ele => {
            return ele;
        })
        
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
                    <div className="panel">
                        <div style={viewStyle}>
                            <div className="insideEdit">{this.state.changedName}</div>
                            <SyntaxHighlighter className="insideEdit insideLogic" language='javascript' style={xcode}>{this.state.changedInitialState}</SyntaxHighlighter> 
                            <div className="insideEdit">
                                actions: 
                                <ul>
                                    {this.state.changedActions.map(ele => {
                                        return <li className="actionLister" key={ele[0]}>{ele[0]}</li>}
                                    )}
                                </ul>
                            </div>
                        </div>
                        
                        {/* <div style={editStyle}>
                            <input type="text" value={this.state.changedName} onChange={this.handleEditingNameChange} />
                            <AceEditor
                                height="80px"
                                width="100%"
                                mode="javascript"
                                theme="xcode"
                                value={this.state.changedInitialState}
                                onChange={this.handleEditingInitialStateChange}
                                name="aceEditTest"
                                editorProps={{$blockScrolling: true}}
                            />  
                            <Picky
                                value={this.state.actionsValue}
                                options={bigList}
                                onChange={this.handleEditingActions}
                                open={true}
                                valueKey="id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={false}
                                dropdownHeight={600}
                            />
                        </div> */}
                        {/* <button type="button" onClick={this.handleEditing}>{this.state.editing ? 'Save' : 'Edit'}</button> */}
                        <button className="insideDeleteButton" type="button" onClick={() => this.props.deleteReducer(this.props.reducerName)}>Delete</button>
                    </div>
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        actions: state.list.actions,
        reducers: state.list.reducers
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editReducer,
        deleteReducer
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reducer);


// <input type="text" value={this.state.changedInitialState} onChange={this.handleEditingInitialStateChange} />
