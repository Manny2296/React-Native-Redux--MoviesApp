import React from "react";
import { Text,View,StyleSheet, ActivityIndicator } from "react-native";
import { getFilmsFromApiNews } from "../API/TMDBapi";
import FilmList from './FilmList' 
import Avatar from "../components/Avatar";
import { connect } from 'react-redux'
import Login from "../components/Login/Login"

class News extends React.Component{
    constructor(props){
        super(props)
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
        this.state = {
            films: [],
            isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche        
           }
          this._LoadNewFilms = this._LoadNewFilms.bind(this)

    }
    _LoadNewFilms(){
        this.setState({ isLoading: true }) // Lancement du chargement
        getFilmsFromApiNews(this.page +1).then(data =>{
            //console.log(data);
            this.page = data.page
            this.totalPages = data.totalPages
            this.setState({
                films: [...this.state.films, ...data.results], 
                isLoading : false
            })
        })
    }
    componentDidMount(){
        this._LoadNewFilms()
    }
    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
      }
      renderbassedonLoginState(){
        if(this.props.isLogged){
          return(
          <View>
          <View style={styles.avatar_container}>
      <Avatar/>
        </View> 
         
         <FilmList
         films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
         navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
         loadFilms={this._LoadNewFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
         page={this.page}
         totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
         favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.        
       />
          {this._displayLoading()}
         </View>
       )  
    }
        else{
         return(
          <Login/>
         )
        }
      }
  render(){
      return(
        <View style={styles.main_container}>
        {this.renderbassedonLoginState()}
        </View>
      )
  }

}
const styles = StyleSheet.create({


    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      main_container: {
        flex: 1,
        //marginTop: 30 plus besoin de s'en occuper
      },
      avatar_container:{
        alignItems:'center'
        }
    }
)
const mapStatetoProps = state => {
  return {
    isLogged : state.doLogin.isLogged
  }
}

export default  connect(mapStatetoProps)(News)