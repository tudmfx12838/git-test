import * as ActionTypes from './ActionTypes';


export const Dishes = (state = {
        isLoading: true, //trang thai tai xuong cua dishes
        errMess: null,//bao loi
        dishes: [] //array chua dishes
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_DISHES: 
            //ActionCreator.js
            //export const addDishes = (dishes) => ({
            //      type: ActionTypes.ADD_DISHES,
            //      payload: dishes})
            return {...state, isLoading: false, errMess: null, dishes: action.payload}

        case ActionTypes.DISHES_LOADING: 
            //ActionCreator.js
            // export const dishesLoading = () => ({
            //     type: ActionTypes.DISHES_LOADING})
            return {...state, isLoading: action.payload, errMess: null, dishes:[]}

        case ActionTypes.DISHES_FAILED: 
            // export const dishesFailed = (errmess) => ({
            //     type: ActionTypes.DISHES_FAILED,
            //     payload: errmess})
            return {...state, isLoading: false, errMess: action.payload, dishes:[]}

        default:
            return state;
    } 
}