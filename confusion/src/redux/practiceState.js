import * as ActionTypes from './ActionTypes';

export const PracticeState = (state = {
    practiceState: null
}, action) => {
switch(action.type){
    case ActionTypes.ADD_PRACTICE_DATA: 
        state.practiceState.id = 1;
    return {...state, practiceState: action.payload}

    default:
        return state;
}
}