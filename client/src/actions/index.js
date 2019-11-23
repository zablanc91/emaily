import axios from 'axios';
import { FETCH_USER } from './types';

//because of Redux-Thunk being passed off to applyMiddleware in index.js, it will see that this action creator is returning a function instead of an action; Redux-Thunk will automatically call it and pass in dispatch
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER, payload: res.data});
};