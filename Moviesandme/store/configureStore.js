import { createStore, combineReducers } from 'redux'
import toggleFavorite from './reducers/favoriteReducer'
import setAvatar from './reducers/avatarReducer'
import toogleVue from './reducers/vueReducer'
import { persistCombineReducers, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { persistStore } from "redux-persist";
const rootPersistconf = {
    key:'root',
    storage,
}
const persistedReducer = persistReducer(rootPersistconf, toggleFavorite)
const persistReduceravatar = persistReducer(rootPersistconf,setAvatar)
const persistFinalReducer = persistCombineReducers(rootPersistconf, {toggleFavorite,setAvatar,toogleVue})
export default createStore(persistFinalReducer)
// export default () => {
//     let store = createStore(persistFinalReducer)
//     let persistor = persistStore(store)
//     return {store,persistor}
// }

/**il faut utiliser la fonction  
 * combineReducers  de Redux pour ajouter plusieurs reducers au store */