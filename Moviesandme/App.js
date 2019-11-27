import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/Search.js'
import Navigation from './navigation/Navigation.js';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
export default function App() {
  return (
   /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View> */
    <Provider store={Store}>
   <Navigation/>
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
