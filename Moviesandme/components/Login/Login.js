import Auth0 from "react-native-auth0";
import { Alert,Button, StyleSheet,Text,View } from "react-native";
import React, { Component } from 'react';
var credentials = { domain: 'dev-h-9z900l.eu.auth0.com', clientId: 'LHGlbuQbkcTHuNiCcAoJ9dqsKssPXDAj' }
const auth0 = new Auth0(credentials);
class Login extends Component {
    constructor(props){
        super(props)
        this.state = { accesToken:null}
    }
    _onLogin = ()=>{
        auth0.webAuth
        .authorize({
            scope:'openid profile email'
        }).then(credentials => {
            Alert.alert('Acces tokemn' + credentials.accessToken)
            this.setState({accesToken : credentials.accessToken})
            this.props.navigation.navigate("Search");
        })
        .catch(error => console.log(error))
    }
    _onLogout = () =>{
        auth0.webAuth
        .clearSession({})
        .then(success =>{
             Alert.alert("Logged out !! ")
            this.setState({accesToken:null})
        }
        )
        .catch(error => {console.log("Log out cancelled")})
    } 
  render() {
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
export default Login;
