

import React,{useEffect} from 'react';

import {
 
  LogBox,
  StyleSheet,
  View,
  YellowBox,
} from 'react-native';
import 'react-native-gesture-handler' ;


import MainNavigation from "../Events/route/nav";
import SearchProvider from '../Events/store/SearchProvider';

const App: () => Node = () => {

  LogBox.ignoreLogs(['source.uri should not be an empty string'])

  useEffect(() => {
   var url = "https://nameless-meadow-25389.herokuapp.com/server"
   fetch(url)
   .then(res => res.json())
   .then(resJson => console.log("res",resJson))
  }, []);

  return (

    <SearchProvider>
      <View style={{ flex: 1 }}>
        <MainNavigation />
      </View>
    </SearchProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
});

export default App;
