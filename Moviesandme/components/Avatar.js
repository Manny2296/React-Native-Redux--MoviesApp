import React from "react";
import {  StyleSheet, Image, TouchableOpacity } from "react-native";
import  ImagePicker  from "react-native-image-picker";
import { connect } from 'react-redux'

class Avatar extends React.Component{
    constructor(props){
        super(props)
      
        // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarclicked = this._avatarclicked.bind(this)  
    }

    _avatarclicked(){
ImagePicker.showImagePicker({},(reponse) => {
    if(reponse.didCancel){
        console.log("L'utilisateur a annulé ")
    }
    else if(reponse.error){
        console.log("Erreur", reponse.uri)
    }
    else{
        console.log("photo" , reponse.uri)
        let requiresource = {uri: reponse.uri}

        // On cree une action avec l'image prose et on 
        //envoi au store Redux
        const action = {type:"SET_AVATAR", value: requiresource}
     this.props.dispatch(action)
    }
})
    }
    render(){
        return(
         <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarclicked}
         >
             <Image style={styles.avatar} source={this.props.avatar}></Image>

         </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create(
    {
        touchableOpacity : {
            margin: 5,
            width: 100, // Pensez a definir une largeur ici sinon toute la largeur de l'ecran sera clickable 
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        avatar:{
            width:100,
            height:100,
            borderRadius: 50,
            borderColor: '#9B9B9B',
            borderWidth: 2
        }

    }

)
const maptostate = state => {
    return {
        avatar: state.setAvatar.avatar
    }
}

export default connect(maptostate)(Avatar) 