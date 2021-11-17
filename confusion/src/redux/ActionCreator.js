import * as ActionTypes from './ActionTypes';
import { DISHES } from "../components/shared/dishes";
import { baseUrl } from '../shared/baseUrl';


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
    //giao tiep du lieu DISHES thong qua doi tuong DISHES
    // setTimeout(()=>{
    //     dispatch(addDishes(DISHES));
    // }, 2000);

    //Giao tiep giu lieu voi sever su thong qua Fetch
    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
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

export const fetchComments = () => (dispatch) => {

    //Giao tiep giu lieu voi sever su thong qua Fetch
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    //Thunk se lam 2 viec
    //1. set isLoading is true
    dispatch(promosLoading(true));

    //Giao tiep giu lieu voi sever su thong qua Fetch
    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
}

export const promosLoading = (bol) => ({
    type: ActionTypes.PROMOS_LOADING,
    payload: bol
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});
