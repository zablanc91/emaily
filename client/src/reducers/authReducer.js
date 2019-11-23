import { FETCH_USER } from '../actions/types';

export default function(state = null, action){
    switch(action.type){
        //return payload if logged in or false if not
        case FETCH_USER:
            return action.payload || false;
        //first time reducer runs, no clue if logged in or not so return null
        default:
            return state;
    }
}