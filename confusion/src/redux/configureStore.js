import { createStore, combineReducers, applyMiddleware } from "redux";
// import { Reduccer, initialState } from "./reduceer";

import { createForms } from "react-redux-form";

import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotins";
import { Leaders } from "./leaders";

//import applyMiddleware, thunk, logger
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from "./form";

export const ConfigureStore = () => {
    const store = createStore(
        // Reduccer,
        // initialState
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}