import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/Search.js'
import Navigation from './navigation/Navigation.js';
import { Provider } from 'react-redux'
//import { store,persistor } from './store/configureStore'

import Store from './store/configureStore'
import { persistStore } from "redux-persist";
import {  PersistGate } from "redux-persist/integration/react";

export default function App() {
  let persistor = persistStore(Store)
  return (
    /**Il existe un site qui recense toutes les librairies React Native
     *  avec un indicateur de qualité, leur compatibilité
     *  (iOS, Android, Expo pour les CRNA, Web), etc.
     *  Il s'agit du site Native Directory.
     *  url : https://www.native.directory/ */
   /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View> */
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
   <Navigation/>
   </PersistGate>
    </Provider> 

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
