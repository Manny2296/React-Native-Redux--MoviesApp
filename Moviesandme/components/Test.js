import { StyleSheet, Platform,View, Animated ,Easing,Text, PanResponder,Dimensions } from 'react-native'
import HelloWorld from './HelloWorld'
import React from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
class Test extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        topPosition: 0,
        leftPosition:0,
        _touches : 0
        /* J'ai l'habitude de définir mes Animated.Value dans le state, 
           mais ce n'est pas nécessaire. Vous allez le voir, 
           on n'utilise pas  setState  pour modifier une Animated.Value. */
      }
      var { height,width} = Dimensions.get("window")
      this.PanResponder = PanResponder.create(
        {
          onStartShouldSetPanResponder: (evt,gestureState) => true,
          onPanResponderMove:(evt,gestureState) => {
            let touches = evt.nativeEvent.touches; //je récupère les touches  , autrement dit les doigts posés sur l'écran. 
            if(touches.length == 1){
              console.log(touches[0])
              this.setState({
                topPosition: touches[0].pageY - height/2,
                leftPosition: touches[0].pageX - width/2
                
                
              })
            }
          } 
        }
      )
    
  }
render(){
  /**Vous remarquez que j'ai remplacé mon View par une Animated.View.
   *  Ce changement est primordial ! Seuls les Animated.
   * Component sont capables de gérer des Animated.Value. */
    return(
        <View style={styles.main_container}> 
        
         <View {...this.PanResponder.panHandlers} 
         style={[styles.animation_view,{top: this.state.topPosition, left: this.state.leftPosition}]}>
          <Text style={styles.title_text}>{this.state._touches}</Text>
          </View>  
         
        </View>
    )
  /**Attention, également, je mets Animated.Component ici,
   * mais seuls 4 components React Native sont éligibles aux animations Animated :
   * Animated.View, Animated.Text, Animated.Image et Animated.ScrollView. */
  }

  /*componentDidMount(){
    Animated.sequence([
    Animated.timing(
      this.state.topPosition,
      {
        toValue:200,
        duration: 2000, // Le temps est en milliseconds 
        easing : Easing.elastic(2)
      }
    ), // N'oubliez pas de lancer votre animation avec la fonction start 
    Animated.spring(
      this.state.topPosition, { toValue:100,speed:4,bounciness:30}
    )]).start()
    /*Animated.decay(
      this.state.topPosition,{velocity: 0.8,deceleration: 0.997}
    ).start()
  }*/
}
const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    subview_container: {
      
    },  animation_view: {
      backgroundColor: 'red',
      width: 100,
      height: 100
    }, title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    }
  })
export default Test

// AAAAMMDDHHMMSS