import React, { Component } from 'react';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi' // import { } from ... car c'est un export nommé dans 
//import films from '../helpers/filmsData'
import Login from "../components/Login/Login"
import Auth0 from "react-native-auth0";

import {View,TextInput,Button,Text,StyleSheet, FlatList,ActivityIndicator,Alert } from 'react-native'
import FilmItem from './FilmItem';
import FilmList from './FilmList' 
import { connect } from 'react-redux'
var credentials = { domain: 'dev-h-9z900l.eu.auth0.com', clientId: 'LHGlbuQbkcTHuNiCcAoJ9dqsKssPXDAj' }
const auth0 = new Auth0(credentials);
class Search extends React.Component {

 
  // Components/Search.js
  constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
        films: [],
        isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche        
       }
   this._loadFilms = this._loadFilms.bind(this)
  // this._doLogin = this._doLogin.bind(this)
}
componentDidMount() {
  this.props.navigation.setParams({
      dispatch: this.dispatch.bind(this)
  });
}
dispatch(){
  auth0.webAuth
  .clearSession({})
  .then(success =>{
     //  Alert.alert("Logged out !! ")
       let tmp = false
       const action = { type:"LOGIN",value:tmp}
       this.props.dispatch(action);
    //  this.setState({accesToken:null})
    console.log("Sesion cerrada ok")
  }
  )
  .catch(error => {console.log("Log out cancelled" + error)})

}

static navigationOptions = ({ navigation }) => {

  return { 
    headerRight: () => (
      
      <Button
        onPress={() => navigation.state.params.dispatch()}
        title="Logout"
        color="red"
      />
    ),
  }
}
_displayDetailForFilm = (idFilm) => {
  console.log("Display film with id " + idFilm)
  this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
}
_searchFilms() {
  this.page = 0
  this.totalPages = 0
  this.setState({
    films: []
  },
  // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
  () => { 
    //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
    this._loadFilms() 
})
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
_loadFilms() {
  //console.log('searched ' + this.searchedText + this.searchedText.length ) // Un log pour vérifier qu'on a bien le texte du TextInput
  if (this.searchedText.length > 0) { 
    this.setState({ isLoading: true }) // Lancement du chargement
    // Seulement si le texte recherché n'est pas vide
    getFilmsFromApiWithSearchedText(this.searchedText, this.page +1).then(data => {
      this.page = data.page
      this.totalPages = data.total_pages  
      this.setState({ 
          films: [...this.state.films, ...data.results],  // une autre sintaxys  films: this.state.films.concat(data.results)
         // films: data.results,  // une autre sintaxys  films: this.state.films.concat(data.results)
          
         isLoading: false // Arrêt du chargement
        })
    })
}
}
_searchTextInputChanged(text) {
  this.searchedText = text;
  // console.log('Recherche :' + this.searchedText);
 
}
renderbassedonLoginState(){
  if(this.props.isLogged){
    return(
      <View style={styles.main_container}>
    <TextInput style={styles.textinput} placeholder='Titre du film'
         onChangeText={(text) => {this._searchTextInputChanged(text) 
         } } 
         onSubmitEditing={() => this._loadFilms()}
         />
        <Button title='Rechercher' onPress={() => this._loadFilms()}/>
    
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.        
        />
        </View>
        )
  }else{
    return(
      <Login/>
    )

  }
}
    render(){
      console.log("RENDER/SEARCH -- islogged : " + this.props.isLogged) 
     // console.log(this.state.isLoading)
     //console.log(this.props)
      /* Nous avons modifié les données de notre component Search, le state,
       en passant par la fonction  setState .
       React a identifié que le state de votre component Search a changé.
       Il va alors demander à votre component Search de se re-rendre avec
       le nouveau state.*/ 
        // Ici on rend à l'ecran les elements graphiques de notre component custom Search
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
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    }
  })
  const mapStatetoProps = state => {
    return {
      isLogged : state.doLogin.isLogged
    }
  }
  
export default connect(mapStatetoProps)(Search)