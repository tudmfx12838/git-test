import * as ActionTypes from './ActionTypes';

export const Staffs = (state ={
    isLoading: true,
    errmess: null,
    staffs:[]
}, action) => {
    switch(action.type){
        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: action.payload, errmess: null, staffs: []};

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, staffs: []};

        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errmess: null, staffs: action.payload};

        case ActionTypes.ADD_STAFF:
            var staff = action.payload;
            return {...state, staffs: state.staffs.concat(staff)};

        case ActionTypes.DELETE_STAFF:
            //var staff = action.payload;
            return {...state, staffs: action.payload};


        default:
            return state;
    }
}
