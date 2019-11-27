// Components/FilmDetail.js

import React from 'react'
import { Platform,StyleSheet, View, Text,ActivityIndicator,Image,Button, TouchableOpacity, Share } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBapi'
import { ScrollView } from 'react-native-gesture-handler'
import { getImageFromApi } from '../API/TMDBapi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import Enlarge from "../animations/Enlarge";
class FilmDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
  const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation 
      if(params.film != undefined && Platform.OS === "ios"){
        return{
           // //{} On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
           headerRight: <TouchableOpacity
           style= {styles.share_touchable_headerrightbutton}
           onPress={()=> params._shareFilm()}>
          <Image style={styles.share_image}  source={require('../images/ic_share.png')}/>
           </TouchableOpacity>
              }
    }
  }
    constructor(props) {
        super(props)
        this.state = {
          film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
          isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
        this._shareFilm = this._shareFilm.bind(this)
      }
    _shareFilm(){
      const {film} = this.state
  
        Share.share({title: film.title, message: "Te amo Mariana y soy muy  feliz contigo ",url:"http://eco2.com.co"})
      
      

      }
    _displayFloatingActionButton(){
   const {film } = this.state
   if(film != undefined && Platform.OS == "android" ){
     return(
       <TouchableOpacity
       style={styles.share_touchable_floating}
       onPress={() => this._shareFilm()}>
         <Image style={styles.share_image}
          source={require("../images/ic_share.png")}
         />
       </TouchableOpacity>
     )
   }
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
 // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  
      componentDidMount(){
       const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item=> item.id === this.props.navigation.state.params.idFilm)
       console.log("Le filmfavorite index retorno : " + favoriteFilmIndex)
       if(favoriteFilmIndex !== -1){ //Film déjá dans nos favorites, on a deja son detail pas besoin d'apeller l'API ici
         this.setState({
           film: this.props.favoritesFilm[favoriteFilmIndex],
           isLoading : false
         }, () => {this._updateNavigationParams()})
         return
       }
       //le film n'est pas dans Favoris, on apelle l'api pour recuperer son detail
      console.log("Le film no esta en la lista de favoritos")
       this.setState({isLoading : true})
       getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
       .then(data => {
         this.setState({
           film:data,
           isLoading: false
         })
       })

      }
      componentDidUpdate(){
        console.log("ComponentDidUpdate :")
        console.log(this.props.favoritesFilm);
      }
      _displayFavoriteImage(){
        var sourceImage = require("../images/ic_favorite_border.png");
        var shouldEnlarge = false
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
          // Film dans nos favoris
          sourceImage = require("../images/ic_favorite.png")
          shouldEnlarge = true
        }
        return(
          <Enlarge shouldEnlarge={shouldEnlarge}>
          <Image style={styles.favorite_image} source={sourceImage}></Image>
          </Enlarge>
        )
      }
      _displayFilm(){
          if(this.state.film != undefined){
              return(
               
                  <ScrollView style={styles.scrollview_container}>
                         <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
                        />
                      <Text style={styles.titleText}>{this.state.film.title}</Text>
                      <TouchableOpacity
                          style={styles.favorite_container}
                          onPress={() => this._toogleFavorite()}>
                          {this._displayFavoriteImage()}
                      </TouchableOpacity>
                      <Text style={styles.description_text}>{this.state.film.overview}</Text>
           
                      <Text style={styles.default_text}>Sorti le : {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
                      <Text style={styles.default_text}>Note : {this.state.film.vote_average} / 10 </Text>
                      <Text style={styles.default_text}>Nombre de votes : {this.state.film.vote_count}</Text>
                      <Text style={styles.default_text}>Budget : {numeral(this.state.film.budget).format('0,0[.]00 $')} </Text>
                      <Text style={styles.default_text}>Genre(s) : {this.state.film.genres.map(function(genre){
                                                                    return genre.name;
                                                                    }).join(" / ")} </Text>
                      <Text style={styles.default_text}>Genre(s) : {this.state.film.production_companies.map(function(company){
                                                                    return company.name;
                                                                    }).join(" / ")} </Text>
                  </ScrollView>
              
              )
          }
      }
      _toogleFavorite(){
          const action = { type: "TOOGLE_FAVORITE",value: this.state.film}
          this.props.dispatch(action);
      }
  render() {
    //  console.log("component FilmDetail rendu")
    //  console.log(this.props)
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_touchable_floating: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 20,
    bottom: 20,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  main_container: {
    flex: 1,
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
},
favorite_image: {
  flex: 1,
  width: null,
  height: null
},
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop : 8,
    textAlign : "center"
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container:{
      flex:1
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    textAlign: "justify", 
    padding : 10

  },
  image:{
    height: 180,
    margin: 5,
    
  },  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontWeight : "bold"
  }
})

const mapStateToProps = (state) => {
  return {favoritesFilm : state.toggleFavorite.favoritesFilm } 
}

export default connect(mapStateToProps)(FilmDetail)