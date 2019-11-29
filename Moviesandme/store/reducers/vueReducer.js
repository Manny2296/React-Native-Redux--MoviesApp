const initialState = { FilmsVus: [] }

function toogleVue(state=initialState, action){ 
   let nextState
   switch (action.type) {
       case "TOOGLE_VUE":
           const VueFilmIndex = state.FilmsVus.findIndex(item =>item.id === action.value.id)
           if(VueFilmIndex !== -1) { 
            //{ }  
            nextState = {
                ...state,
                FilmsVus: state.FilmsVus.filter((item,index) => index !== VueFilmIndex)
             }
           }
           else 
           nextState = { 
               ...state,
               FilmsVus: [...state.FilmsVus,action.value]
           }
           return nextState || state;
   
       default:
           return state;
   }
 }
 export default toogleVue
//{ }