import { createStore, combineReducers } from 'redux'
import toggleFavorite from './reducers/favoriteReducer'
import setAvatar from './reducers/avatarReducer'
export default createStore(combineReducers({toggleFavorite,setAvatar}))

/**il faut utiliser la fonction  
 * combineReducers  de Redux pour ajouter plusieurs reducers au store */