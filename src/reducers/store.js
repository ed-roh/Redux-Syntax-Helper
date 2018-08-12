import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import reducer1 from './reducer1';

const rootReducer = combineReducers({
    reducer1: reducer1,
    form: formReducer
})

export default rootReducer;