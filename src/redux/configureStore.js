import { createStore } from "redux";
import { Reduccer, initialState } from "./reduceer";

export const ConfigureStore = () => {
    const store = createStore(
        Reduccer,
        initialState
    );
    return store;
}