import Auth0 from "react-native-auth0";
import { Alert,Button, StyleSheet,Text,View } from "react-native";
import React, { Component } from 'react';
import { connect } from 'react-redux'

var credentials = { domain: 'dev-h-9z900l.eu.auth0.com', clientId: 'LHGlbuQbkcTHuNiCcAoJ9dqsKssPXDAj' }
const auth0 = new Auth0(credentials);
class Login extends Component {
    constructor(props){
        super(props)
        this.state = { accesToken:null}
         
    }
    _doLogin(){
        let tmp = true
        const action = { type:"LOGIN",value:tmp}
        this.props.dispatch(action);
    }
    _onLogin = ()=>{
        auth0.webAuth
        .authorize({
            scope:'openid profile email'
        }).then(credentials => {
            Alert.alert('Acces tokemn' + credentials.accessToken)
            this.setState({accesToken : credentials.accessToken})
            this._doLogin();
            //console.log('valor' + this.props.isLogged)
            //this.props.navigation.navigate("Search");
        })
        .catch(error => console.log(error))
    }
    componentDidMount(){
        if(!this.props.isLogged){
            this.setState({accesToken:null})
            console.log("nulleado")
          }
    }
   
  
    _onLogout = () =>{
        auth0.webAuth
        .clearSession({})
        .then(success =>{
           //  Alert.alert("Logged out !! ")
             let tmp = false
             const action = { type:"LOGIN",value:tmp}
             this.props.dispatch(action);
            this.setState({accesToken:null})
        }
        )
        .catch(error => {console.log("Log out cancelled" + error)})
      } 
  render() {
     
      console.log('RENDER/LOGIN' + this.props.isLogged )
     
      
      let loggedIn = this.state.accesToken === null ? false : true;
    return (
       <View style={styles.container}>
       <Text style={styles.header}>
         Auth0- Login
       </Text>
       <Text>
           You are { loggedIn ? '' : 'Not'} Logged in. 
       </Text>
       <Button onPress= {loggedIn ? this._onLogout : this._onLogin} title={loggedIn ? 'Log Out' : 'Log In'}></Button>
       </View>
    );
  }
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems: "center",
            backgroundColor : "#F5FC55"
        },
        header : {
            fontSize:20,
            textAlign:"center",
            margin:10
        }
    }
)

const mapStatetoProps = state => {
    return {
      isLogged : state.doLogin.isLogged
    }
  }
  
export default connect(mapStatetoProps)(Login);
