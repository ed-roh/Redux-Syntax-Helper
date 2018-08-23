const initialState = {
    actions: {
        actionName1: 'logic1'
    },
    
    reducers: {
        reducerName1: ['', '']
    },

    components: {
        componentName1: {
            actions: {},
            reducers: {}
        }
    },

    storeName: '',

    currentAction: ['',''],

    currentReducer: ['', '', ''],
    
    currentComponent: ''
}


export default (state = initialState, action) => {
    switch (action.type) {

        ////////////////////////////////////
        case 'STORE_NAME_CHANGE':
            return {
                ...state,
                storeName: action.e
            }

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


        ////////////////////////////////////
        case 'REDUCER_NAME':
            return {
                ...state,
                currentReducer: [action.e, state.currentReducer[1], state.currentReducer[2]]
            }
        case 'REDUCER_STATE':
            return {
                ...state,
                currentReducer: [state.currentReducer[0], action.e, state.currentReducer[2]]
            }
        case 'REDUCER_LOGIC':
            return {
                ...state,
                currentReducer: [state.currentReducer[0], state.currentReducer[1], action.e]
            }
        case 'SAVE_REDUCER':
            const redName = state.currentReducer[0];
            const redStatName = state.currentReducer[1];
            const redLogName = state.currentReducer[2];
            const newRedObj = { ...state.reducers };
            newRedObj[redName] = [redStatName, redLogName];
            return {
                ...state,
                reducers: newRedObj,
                currentReducer: ['','', '']
            }

        ////////////////////////////////////
        case 'COMPONENT_NAME':
            return {
                ...state,
                currentComponent: action.e
            }
        case 'SAVE_COMPONENT':
            const componentName = state.currentComponent;
            const newCompObj = {};
            newCompObj[componentName] = {};
            return {
                ...state,
                components: newCompObj,
                currentComponent: ''
            }
        
        ////////////////////////////////////
            
        default:
            return state;
    }
}