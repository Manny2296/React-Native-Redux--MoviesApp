import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

//{ }
class FilmList extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        films: []
      }
     }
     _displayDetailForFilm = (idFilm) => {
      //  console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
      }
     render(){ 
         return(
            <FlatList
            data={this.props.films}
            extraData={this.props.isFavoriteFilm}
            // On utilise la prop extraData pour indiquer à notre FlatList 
            //que d’autres données doivent être prises en compte si on lui 
            //demande de se re-rendre
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem
             film={item}
              // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
             isFavoriteFilm={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
           displayDetailForFilm={this._displayDetailForFilm}/>}
            onEndReachedThreshold={0.5}
            onEndReached={()=>{
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
            if(this.props.page < this.props.totalPages){
              console.log("estoy aqui")
              this.props.loadFilms();
            }
    
            }}
            
            />
         )
     }
     
     

 }
 
const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })
  
  const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  export default connect(mapStateToProps)(FilmList)
