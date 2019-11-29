import React from "react";
import { Text } from "react-native";
import FilmsVues from "./FilmsVues";
import { connect } from 'react-redux'
import { FlatList } from "react-native-gesture-handler";
import FilmItem from "./FilmItem";
import FilmVueItem from "./FilmVueItem";

class FilmsVuesList extends React.Component
{
//{ }
constructor(props){
    super(props)
    this.state = { 
        films : []
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
         extraData={this.props.isVue}
         keyExtractor={(item)=> item.id.toString() }
         renderItem={ ({item}) => <FilmVueItem
         film={item}
         isVue={ (this.props.FilmsVus.findIndex(film=> film.id === item.id) !== -1 )? true:false}
         displayDetailForFilm={ this._displayDetailForFilm}
         onEndReachedThreshold={0.5}
            onEndReached={()=>{
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
            if(this.props.page < this.props.totalPages){
              console.log("estoy aqui")
              this.props.loadFilms();
            }
        }
    }
            
         />

         }
         >

         </FlatList>
     )
 }
}
const mapStateToProps = state => {
    return {
        FilmsVus: state.toogleVue.FilmsVus
 }
}

export default  connect(mapStateToProps)(FilmsVuesList)