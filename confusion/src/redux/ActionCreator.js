import * as ActionTypes from './ActionTypes';
// import { DISHES } from "../components/shared/dishes";
import { baseUrl } from '../shared/baseUrl';


export const addFeedback= (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});


export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) =>{
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();

    return (fetch(baseUrl + 'feedback', {
        method: 'POST',
        body:JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error' + response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(feedback => dispatch(addFeedback(feedback)))
    .catch(error => { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message);})
    );
}


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return (fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        //response.ok tra ve true khi may chu phan hoi ok
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
            var errmess = new Error(error.message);
            throw errmess;
    })

    .then(response => response.json())
    //sau khi gui du lieu len sever, sever se send back lai du lieu, roi lay do cap nhat redux store
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message);})
    );
}

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
        .then(response => {
            //response.ok tra ve true khi may chu phan hoi ok
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));

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
        .then(response => {
            //response.ok tra ve true khi may chu phan hoi ok
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
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
        .then(response => {
            //response.ok tra ve true khi may chu phan hoi ok
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)));
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


export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error ' + response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
        )
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = (bol) => ({
    type: ActionTypes.LEADERS_LOADING,
    payload: bol
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})