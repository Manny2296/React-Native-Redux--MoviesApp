// Navigation/Navigation.js

import React from 'react' 
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../components/Search'
import  Favorites  from "../components/Favorites";
import FilmDetail from '../components/FilmDetail'
import Test from "../components/Test";
const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Moteur de recherche des Films '
    }
  },
  FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: FilmDetail
  }
})

const FavoriteStackNavigator = createStackNavigator({
  Favorites:{
    screen:Favorites,
    navigationOptions:{
      title: "Favoris"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})
const MoviesTabNavigator = createBottomTabNavigator({
  Search:{
    screen:SearchStackNavigator,
    navigationOptions:{
      tabBarIcon: () => {
        return(
          <Image source={require("../images/ic_search.png")} style={styles.icon}/>
        
        )
      }
    }
  },
  Favorites:{
    screen:FavoriteStackNavigator,
    navigationOptions : {
      tabBarIcon:()=>{
        return(
          <Image source={require("../images/ic_favorite.png")} style={styles.icon}/>
          ) 
        
      }
    } 
  }
},
  {
  tabBarOptions : {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
})
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
export default createAppContainer(MoviesTabNavigator)