import { createStore} from "redux";
import reducer from "./reducers/reducer"
//const mainReducer = combineReducers(reducer);

const initialState = {
    email: '',
    password: ''
}

const store = createStore(reducer, initialState);

export default store;