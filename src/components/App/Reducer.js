import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editReducer } from '../../actions/List';

class Reducer extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleEditingNameChange = this.handleEditingNameChange.bind(this);
        this.handleEditingInitialStateChange = this.handleEditingInitialStateChange.bind(this);
        this.handleEditingLogicChange = this.handleEditingLogicChange.bind(this);
        this.state = {
            editing: false,
            changedName: this.props.reducerName,
            changedInitialState: this.props.reducerInitialState,
            changedLogic: this.props.reducerLogic
        }
    }

    handleEditing() {
        const previousReducerName = this.props.reducerName;
        if (this.state.editing) {
            this.props.editReducer(previousReducerName, this.state.changedName, this.state.changedInitialState, this.state.changedLogic);
        }

        this.setState((prevState) => {
            return { editing: !prevState.editing }
        })
    }

    handleEditingNameChange(e) {
        this.setState({ changedName: e.target.value })
    }

    handleEditingInitialStateChange(e) {
        this.setState({ changedInitialState: e.target.value })
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
                <div style={viewStyle}>
                    {this.state.changedName} 
                    {this.state.changedInitialState}
                    {this.state.changedLogic}
                </div>
                
                <div style={editStyle}>
                    <input type="text" value={this.state.changedName} onChange={this.handleEditingNameChange} />
                    <input type="text" value={this.state.changedInitialState} onChange={this.handleEditingInitialStateChange} />
                    <input type="text" value={this.state.changedLogic} onChange={this.handleEditingLogicChange} />
                </div>

                <button type="button" onClick={this.handleEditing}>{this.state.editing ? 'Save' : 'Edit'}</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editReducer
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Reducer);