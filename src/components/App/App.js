import React from 'react';
import Form from './App_Form';
import Output from './App_Output';
import Footer from './App_Footer';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [{
                'actionName': 'action1',
                'actionLogic': 'logic1'
            }],
            reducers: {
                reducer1: 
                `const initialState = {
                    prop: value
                }
                export default (state = initialState, action) => {
                    switch (action.type) {
                        case 'ACTION_NAME':
                            return {
                                prop: action.valueChanged
                            }
                        default:
                            return state
                    }
                }`  
            },
            components: {
                component1: 'compValue1'
            },
            storeName: 'store1'
        }
    }

    render() {
        return (
            <div>
                <h1>App Page</h1>
                <Form 
                    actions={this.state.actions}
                    reducers={this.state.reducers}
                    components={this.state.components}
                    storeName={this.state.storeName}
                />
                    <p>=======================================================</p>
                <Output 
                    actions={this.state.actions}
                    reducers={this.state.reducers}
                    components={this.state.components}
                    storeName={this.state.storeName}
                />
                    <p>=======================================================</p>
                <Footer />
            </div>
        )
    }
}
