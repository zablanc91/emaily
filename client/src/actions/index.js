import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//because of Redux-Thunk being passed off to applyMiddleware in index.js, it will see that this action creator is returning a function instead of an action; Redux-Thunk will automatically call it and pass in dispatch
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload: res.data});
};

//axios post to send information to Express server, pass along token to /api/stripe route; reuse fetch user type since we will get the same User model as above
export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

//take survey form values and make POST request to our backend API
//check surveyRoutes for reference, values is the req and updated user model is res
//also boots user back to /surveys after submitting with history object
export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({type: FETCH_USER, payload: res.data});
};

//payload is an array of all surveys the User has made
export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: res.data});
};