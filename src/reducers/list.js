const initialState = {
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

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ACTIONS':
            return {
                actions: [...action.membersValue],
                ...prevState
            }
        default:
            return state
    }
}