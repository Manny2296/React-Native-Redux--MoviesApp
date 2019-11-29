import React from "react";
import { Text,View,StyleSheet,Image } from "react-native";
import { getImageFromApi } from '../API/TMDBapi'
import moment from 'moment'

import { TouchableOpacity } from "react-native-gesture-handler";
class FilmVueItem extends React.Component{
    
   constructor(props){ 
     
       super(props)
       this.state = {
         text_to_show : this.props.film.title,
         validator : false
       }

      
 }
 
 _onLongPressButton() {
   //alert('Estoy edentro')
   if(this.state.validator){
    this.setState({
      text_to_show : this.props.film.title,
      validator : false
    })
   }
   else{
   this.setState({
     text_to_show : 'Sorti le : ' +  moment(new Date(this.props.film.release_date)).format('DD/MM/YYYY'),
     validator : true
   })
  }
  }
  /*componentDidMount(){
    this.setState({
      text_to_show : this.props.film.relase_data
    })
  }*/
  render(){
    const { film, displayDetailForFilm } = this.props
//{}

      return(
          
        <TouchableOpacity style={styles.content_container} onPress={() => displayDetailForFilm(film.id)} onLongPress={()=> this._onLongPressButton()}>
         <Image style={styles.avatar} source={{uri: getImageFromApi(film.poster_path)}}></Image>
         <Text style={styles.title_text}>{this.state.text_to_show}</Text>
       </TouchableOpacity>
      )
  }
}
const styles = StyleSheet.create({

    content_container:{
        height: 120,
        flexDirection: 'row',
        borderColor: '#9B9B9B',
        borderWidth: 1
      },
      avatar:{
          marginTop:5,
        width:100,
        height:100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    },
    title_text:{
        fontSize: 16,
        fontWeight:"bold",
        textAlign:"center",
        flexWrap: 'wrap',
         paddingLeft: 10,
         marginTop:40
    }
}
)
export default FilmVueItem

