import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

//note: the key for ReduxForm specifically needs to be 'form'
export default combineReducers({
    auth: authReducer,
    form: reduxForm
});