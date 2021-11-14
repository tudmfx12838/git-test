import { createStore, combineReducers } from "redux";
// import { Reduccer, initialState } from "./reduceer";

import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotins";
import { Leaders } from "./leaders";

export const ConfigureStore = () => {
    const store = createStore(
        // Reduccer,
        // initialState
        combineReducers({
            dishes: Dishes,
            comment: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );
    return store;
}