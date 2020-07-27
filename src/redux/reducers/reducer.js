import * as actions from "../action"


function reducer(state, action){
    switch (action.type) {
        case actions.LOGIN:{
            return {...state, email:action.email , password:action.password}
        }
        case actions.LOGOUT:{
            return {...state, authHeader:{ email:'',password:''}};
        }
        default:
            return state;
    }
}

export default reducer;