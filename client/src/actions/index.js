import axios from 'axios';
import { FETCH_USER } from './types';

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