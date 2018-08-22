import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import list from './list';

const rootReducer = combineReducers({
    list: list,
    form: formReducer
})

export default rootReducer;