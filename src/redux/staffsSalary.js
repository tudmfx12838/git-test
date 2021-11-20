import * as ActionTypes from './ActionTypes';

// export const StaffsSalary = (state, action) => {
//     switch(action.type){
//         default:
//             return state;
//     }
// }

export const StaffsSalary = (state ={
    isLoading: true,
    errmess: null,
    staffsSalary:[]
}, action) => {
    switch(action.type){
        case ActionTypes.STAFFSSALARY_LOADING:
            return {...state, isLoading: action.payload, errmess: null, staffsSalary: []};
        case ActionTypes.STAFFSSALARY_FAILED:
            return {...state, isLoading: false, errmess: action.payload, staffsSalary: []};
        case ActionTypes.ADD_STAFFSSALARY:
            return {...state, isLoading: false, errmess: null, staffsSalary: action.payload};
        default:
            return state;
    }
}
