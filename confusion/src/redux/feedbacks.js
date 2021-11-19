// import { COMMENTS } from "../components/shared/comments";
import * as ActionTypes from './ActionTypes';


export const Feedbacks = (state = {
        errMess: null,
        feedbacks: []
}, action) => {
    switch(action.type){
        case ActionTypes.FEEDBACK_FAILED: 
            return {...state, errMess: action.payload, feedbacks:[]}

        case ActionTypes.ADD_FEEDBACK:
             var feedback = action.payload;
            return {...state, comments: state.feedbacks.concat(feedback)};
        
        default:
            return state;
    }
}