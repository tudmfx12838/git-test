import * as ActionTypes from './ActionTypes';

// export const Departments = (state, action) => {
//     switch(action.type){
//         default:
//             return state;
//     }
// }

export const Departments = (state ={
    isLoading: true,
    errmess: null,
    departments:[]
}, action) => {
    switch(action.type){
        case ActionTypes.DEPARTMENTS_LOADING:
            return {...state, isLoading: action.payload, errmess: null, departments: []};
        case ActionTypes.DEPARTMENTS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, departments: []};
        case ActionTypes.ADD_DEPARTMENTS:
            return {...state, isLoading: false, errmess: null, departments: action.payload};
        default:
            return state;
    }
}
