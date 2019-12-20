import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//note: the key for ReduxForm specifically needs to be 'form'
export default combineReducers({
    auth: authReducer,
    surveys: surveysReducer,
    form: reduxForm
});