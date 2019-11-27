const initialstate = {avatar : require('../../images/ic_tag_faces.png')}

function setAvatar(state = initialstate, action){
let nexState 
switch (action.type) {
    case 'SET_AVATAR':
        nexState={
            ...state,
            avatar: action.value
        }
        return nexState || state

    default:
       return state
}
}
export default setAvatar