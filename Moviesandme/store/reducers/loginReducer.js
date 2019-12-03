const initialState = {isLogged: false}

function doLogin(state=initialState,action){
   // console.log('islogged' + state.isLogged)
let nextState
switch (action.type) {
    case "LOGIN":
        nextState={
            ...state,
            isLogged: action.value
        }
        return nextState || state;

    default:
       return state;
}
}
export default doLogin