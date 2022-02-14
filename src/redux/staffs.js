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
            //fetch tra ve toan bo db, vi the can cat di phan khong can thiet
            //hoac update toan bo redux store
            // return {staffs: action.payload};
            staff.splice(0,state.staffs.length);
            return {...state, staffs: state.staffs.concat(staff)};


        case ActionTypes.DELETE_STAFF:
            return {staffs: action.payload};

        case ActionTypes.UPDATE_STAFF:
            console.log(JSON.stringify(action.payload));
            // , staffs: action.payload
            return {staffs: action.payload};

        default:
            return state;
    }
}
