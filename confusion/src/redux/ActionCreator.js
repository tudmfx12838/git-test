import * as ActionTypes from './ActionTypes';
import { DISHES } from "../components/shared/dishes";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
//fuction = () => ({})
//Type ({}) will return an object

export const fetchDishes = () => (dispatch) => {
    //Thunk se lam 2 viec
    //1. set isLoading is true
    dispatch(dishesLoading(true));

    //2. sau do 2s se day dishes vao state cua store
    setTimeout(()=>{
        dispatch(addDishes(DISHES));
    }, 2000);
}


export const dishesLoading = (bol) => ({
    type: ActionTypes.DISHES_LOADING,
    payload: bol
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});