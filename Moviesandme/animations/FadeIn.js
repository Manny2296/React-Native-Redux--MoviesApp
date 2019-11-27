import React from "react";
import { Animated, Dimensions } from "react-native";
/** https://facebook.github.io/react-native/docs/layoutanimation.html */
class FadeIn extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          positionLeft : new Animated.Value(Dimensions.get('window').width)
      }
  }
  componentDidMount(){
    Animated.spring(
        this.state.positionLeft,
        {
            toValue:0
        }
        
        
    ).start()  
  }
  // les components enfants sont transmis, via les props, au component parent
  /*Tous les components enfants sont transmis, plus spécifiquement,
   dans la propriété  children  des props du component parent.
    On peut donc rendre et afficher les components enfants en ajoutant 
      this.props.children  dans le rendu du component parent*/
  render(){
      //console.log("Enfants"  + this.props.children)
      return(
          <Animated.View style={{left: this.state.positionLeft}}>
           {this.props.children} 
          </Animated.View>
      )
  }
}
export default FadeIn