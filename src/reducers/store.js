import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import List from './list';

const rootReducer = combineReducers({
    list: List,
    form: formReducer
})

export default rootReducer;