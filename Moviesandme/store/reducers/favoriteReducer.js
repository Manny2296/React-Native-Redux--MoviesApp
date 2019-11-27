
const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOOGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      /*En retour, on va utiliser la syntaxe  nextState || state  qui renvoie l'objet
      nextState  si celui-ci n'est pas undefined, sinon on renvoie l'objet  state .
      C'est la sécurité dont je vous ai parlé dans le précédent chapitre. 
      On assure le coup si cela se passe mal avec l'ajout et la suppression de films des favoris. 
      Vous comprenez l'importance ici de garder votre state immuable */
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite