import React from "react";

import { connect } from 'react-redux'
import { StyleSheet, Text,View } from 'react-native'
import FilmsVuesList from "./FilmsVuesList";

class FilmsVues extends React.Component{
constructor(props){
    super(props)
}
render(){
    return(
        <View style={styles.main_contianer}>
            <FilmsVuesList films={ this.props.FilmsVus}
             navigation={ this.props.navigation} 
             vueList={ true} 
            >

            </FilmsVuesList>
        </View>
    )
}
}
const styles = StyleSheet.create({
    main_contianer: {
    flex:1
    },
    avatar_container:{
    alignItems:'center'
    }

})
const mapStatetoProps = state => {
    return{
        FilmsVus : state.toogleVue.FilmsVus
    }
  }
export default connect(mapStatetoProps)(FilmsVues)