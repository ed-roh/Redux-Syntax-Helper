const initialState = {
    actions: {
    },
    
    reducers: {
    },

    components: {
    },

    currentAction: ['', `// access old states with "state." 
// access new states with "action."
const newState = [ ...state, action.newItem ];
return {
    ...state,
    "yourProp" : newState
}
`],

    currentReducer: ['', `"yourProp": "Your array/string/object/etc"`],
    
    currentComponent: '',

    actionReducerConnect: [],
    
    actionComponentConnect: [],

    outputStore: '',

    outputIndex: '',
    
    outputActions: '',

    outputReducers: [],

    outputComponents: []
}


export default (state = initialState, action) => {
    switch (action.type) {

        ////////////////////////////////////
        case 'ACTION_NAME':
            return {
                ...state,
                currentAction: [action.e, state.currentAction[1]]
            }
        case 'ACTION_LOGIC':
            return {
                ...state,
                currentAction: [state.currentAction[0], action.e]
            }
        case 'SAVE_ACTION':
            const actName = state.currentAction[0];
            const logName = state.currentAction[1];
            let newObj = { ...state.actions };
            newObj[actName] = logName;
            return {
                ...state,
                actions: newObj,
                currentAction: ['','']
            }
        case 'EDIT_ACTION':
            const newEditActionObj = { ...state.actions }
            delete newEditActionObj[action.previousActionName];
            newEditActionObj[action.editedActionName] = action.editedActionLogic;
            return {
                ...state,
                actions: newEditActionObj
            }

        case 'DELETE_ACTION':
            let newDeleteActionObj = { ... state.actions };
            delete newDeleteActionObj[action.chosenAction];
            return {
                ...state,
                actions: newDeleteActionObj
            }


        ////////////////////////////////////
        case 'REDUCER_NAME':
            return {
                ...state,
                currentReducer: [action.e, state.currentReducer[1]]
            }
        case 'REDUCER_STATE':
            return {
                ...state,
                currentReducer: [state.currentReducer[0], action.e]
            }

        case 'CONNECTING_ACTIONS':
            return {
                ...state,
                actionReducerConnect: action.e
            }
        case 'SAVE_REDUCER':
            const redName = state.currentReducer[0];
            const redStatName = state.currentReducer[1];
            const redActions = state.actionReducerConnect.map(ele => {
                return [ele, state.actions[ele]];
            })
            const newRedObj = { ...state.reducers };
            newRedObj[redName] = [redStatName, redActions];
            return {
                ...state,
                reducers: newRedObj,
                currentReducer: ['','','']
            }
        case 'EDIT_REDUCER':
            const newEditReducerObj = { ...state.reducers }
            delete newEditReducerObj[action.previousReducerName];
            newEditReducerObj[action.editedReducerName] = [action.editedReducerInitialState, action.editedReducerLogic, action.editedActionsConnect];
            return {
                ...state,
                reducers: newEditReducerObj
            }
        case 'DELETE_REDUCER':
            let newDeleteReducerObj = { ... state.reducers };
            delete newDeleteReducerObj[action.chosenReducer];
            return {
                ...state,
                reducers: newDeleteReducerObj
            }


        ////////////////////////////////////
        case 'COMPONENT_NAME':
            return {
                ...state,
                currentComponent: action.e
            }
        case 'CONNECTING_ACTIONS_TO_COMPONENTS':
            return {
                ...state,
                actionComponentConnect: action.e
            }  
        case 'SAVE_COMPONENT':
            const componentName = state.currentComponent;
            const componentActions = state.actionComponentConnect.map(ele => {
                return [ele, state.actions[ele]];
            })
            const newCompObj = { ...state.components };
            newCompObj[componentName] = {
                actions: componentActions
            };
            return {
                ...state,
                components: newCompObj,
                currentComponent: ''
            }
        case 'EDIT_COMPONENT':
            const newEditComponentObj = { ...state.components }
            delete newEditComponentObj[action.previousComponentName];
            newEditComponentObj[action.editedComponentName] = {};
            return {
                ...state,
                components: newEditComponentObj
            }
        case 'DELETE_COMPONENT':
            let newDeleteComponentObj = { ...state.components };
            delete newDeleteComponentObj[action.chosenComponent];
            return {
                ...state,
                components: newDeleteComponentObj
            }

            
        ////////////////////////////////////



        case 'OUTPUT_STORE':

            const listOfReducers = Object.keys(state.reducers).reduce((acc, curr) => {
                acc += `${curr}, `;
                return acc;
            }, '').replace(/,\s*$/, "");
            const reducerCombine = Object.keys(state.reducers).reduce((acc, curr) => {
                acc += `    ${curr}: ${curr}, \n`
                return acc;
            }, '').replace(/,\s*$/, "");


            let storeCombine = '';
            if (Object.keys(state.reducers).length > 1) {
                storeCombine = 
`const rootReducer = combineReducers({
${reducerCombine}
});
    
const store = createStore(rootReducer);`
            } else {
                storeCombine = 
`const store = createStore(${listOfReducers});`
            }

            const writtenStore = 
`import { createStore, combineReducers } from 'redux';
import { ${listOfReducers} } from './reducers';

${storeCombine}

export default store;`    

            return {
                ...state,
                outputStore: writtenStore
            }



        case 'OUTPUT_INDEX':

            const writtenIndex =
`import { Provider } from 'react-redux';
import store from './reducers/store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('index'));`

            return {
                ...state,
                outputIndex: writtenIndex
            }



        case 'OUTPUT_ACTIONS':

            const writtenActions = Object.keys(state.actions).reduce((acc, curr) => {
                acc += 
`export const ${curr} = () => ({
    type: '${curr.replace(/([A-Z])/g, '_$1').toUpperCase()}'
})
`
                return acc;
            }, '')
            
            return {
                ...state,
                outputActions: writtenActions
            }
            




        case 'OUTPUT_REDUCERS':

            const writtenReducers = Object.entries(state.reducers).reduce((acc, curr) => {
                let listOfCases = curr[1][1].reduce((acc, curr) => {
                    acc += 
`       case '${curr[0].replace(/([A-Z])/g, '_$1').toUpperCase()}':
            ${curr[1]} \n`
                    return acc;
                },'').replace(/\s+$/g, "");
                // iterate through action names and logic here
                let stringer =
`const initialState = {
    ${curr[1][0]}       
}

export default (state = initialState, action) => {
    switch (action.type) {
${listOfCases}
        default:
            return state
    }
}`
                let array = [curr[0], stringer];
                acc.push(array);
                return acc;
            }, [])

            return {
                ...state,
                outputReducers: writtenReducers
            }
        
        
            


        case 'OUTPUT_COMPONENTS':

            const writtenComponents = Object.entries(state.components).reduce((acc, curr) => {
                let listOfImportActionCreators = curr[1].actions.reduce((acc, curr) => {
                    acc += `${curr[0]}, `;
                    return acc;
                }, '').replace(/,\s*$/, "");
                let listOfBindActionCreators = curr[1].actions.reduce((acc, curr) => {
                    acc += `        ${curr[0]}, \n`;
                    return acc;
                }, '').replace(/,\s*$/, "");

                let stringer = 
`import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ${listOfImportActionCreators} } from './actions';

const ${curr[0]} = props => {
    //examples of action usage
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
${listOfBindActionCreators}
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(${curr[0]});`

                let array = [curr[0], stringer];
                acc.push(array);
                return acc;
            }, [])

            return {
                ...state,
                outputComponents: writtenComponents
            }


        ////////////////////////////////////

        case 'RESET_EVERYTHING':
            return {
                ...initialState
            }

        ////////////////////////////////////
        
        default:
            return state;
    }
}




////
// actions: {
//     actionName1: 'logic1'
// },

// reducers: {
//     reducerName1: ['reducerInitialState1', [['actionName3','logic3'], ['actionName4', 'logic4']]]
// },

// components: {
//     componentName1: {
//         actions: [['actionName5', 'logic5'], ['actionName6', 'logic6']]
//     }
// },

// outputReducers: [['r1', 'string'], ['r2', 'string']],

// outputComponents: [['c1', 'string'], ['c2', 'string']]