import { COMMENTS } from "../components/shared/comments";
import * as ActionTypes from './ActionTypes';


export const Comments = (state = COMMENTS, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.data = new Date.toISOString();// standard of date's string
            return state.concat(comment);
        default:
            return state;
    }
}