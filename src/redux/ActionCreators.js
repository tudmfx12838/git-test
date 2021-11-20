import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchStaffs = () => (dispatch) => {

    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(respone => {
            if(respone.ok){
                return respone;
            }else{
                var error = new Error('Error' + respone.status + ' : ' + respone.statusText);
                error.respone = respone;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        
        .then(respone => respone.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
    
}

export const staffsLoading = (bol) => ({
    type: ActionTypes.STAFFS_LOADING,
    payload: bol
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});


export const fetchDepartments = () => (dispatch) => {

    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(respone => {
            if(respone.ok){
                return respone;
            }else{
                var error = new Error('Error' + respone.status + ' : ' + respone.statusText);
                error.respone = respone;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        
        .then(respone => respone.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
    
}

export const departmentsLoading = (bol) => ({
    type: ActionTypes.DEPARTMENTS_LOADING,
    payload: bol
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});










