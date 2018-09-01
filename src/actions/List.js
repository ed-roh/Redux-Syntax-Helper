//////////////////////////////

export const actionName = (e) => ({
    type: 'ACTION_NAME',
    e: e.target.value
})

export const actionLogic = (e) => ({
    type: 'ACTION_LOGIC',
    e: e.target.value
})

export const saveAction = () => ({
    type: 'SAVE_ACTION'
})

export const editAction = (previousActionName, editedActionName, editedActionLogic) => ({
    type: 'EDIT_ACTION',
    previousActionName,
    editedActionName,
    editedActionLogic
})

export const deleteAction = (chosenAction) => ({
    type: 'DELETE_ACTION',
    chosenAction
})

//////////////////////////////

export const reducerName = (e) => ({
    type: 'REDUCER_NAME',
    e: e.target.value
})

export const reducerState = (e) => ({
    type: 'REDUCER_STATE',
    e: e.target.value
})

export const connectingActions = (e) => ({
    type: 'CONNECTING_ACTIONS',
    e
})

export const saveReducer = () => ({
    type: 'SAVE_REDUCER'
})

export const editReducer = (previousReducerName, editedReducerName, editedReducerInitialState, editedActionsConnect) => ({
    type: 'EDIT_REDUCER',
    previousReducerName,
    editedReducerName,
    editedReducerInitialState,
    editedActionsConnect
})

export const deleteReducer = (chosenReducer) => ({
    type: 'DELETE_REDUCER',
    chosenReducer
})

//////////////////////////////

export const componentName = (e) => ({
    type: 'COMPONENT_NAME',
    e: e.target.value
})

export const connectingActionsToComponents = (e) => ({
    type: 'CONNECTING_ACTIONS_TO_COMPONENTS',
    e
})

export const saveComponent = () => ({
    type: 'SAVE_COMPONENT'
})

export const editComponent = (previousComponentName, editedComponentName) => ({
    type: 'EDIT_COMPONENT',
    previousComponentName,
    editedComponentName
})

export const deleteComponent = (chosenComponent) => ({
    type: 'DELETE_COMPONENT',
    chosenComponent
})

//////////////////////////////

export const outputStore = () => ({
    type: 'OUTPUT_STORE'
})

export const outputIndex = () => ({
    type: 'OUTPUT_INDEX'
})

export const outputActions = () => ({
    type: 'OUTPUT_ACTIONS'
}) 

export const outputReducers = () => ({
    type: 'OUTPUT_REDUCERS'
})

export const outputComponents = () => ({
    type: 'OUTPUT_COMPONENTS'
})