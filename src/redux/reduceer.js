// import { DISHES } from "../components/shared/dishes";
// import { COMMENTS } from "../components/shared/comments";
// import { PROMOTIONS } from "../components/shared/promotions";
// import { LEADERS } from "../components/shared/leaders";

import { STAFFS, DEPARTMENTS } from '../shared/staffs';

export const initialState = {
    // dishes: DISHES,
    // comments: COMMENTS,
    // promotions: PROMOTIONS,
    // leaders: LEADERS
    staffs: STAFFS,
    departments: DEPARTMENTS
}

export const Reduccer = (state = initialState, action) => {
    return state;
}