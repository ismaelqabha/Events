

import React from 'react';

import {
 
  StyleSheet,
  View,
} from 'react-native';
import 'react-native-gesture-handler' ;


import MainNavigation from "../Events/route/nav";
import SearchProvider from '../Events/store/SearchProvider';

const App: () => Node = () => {
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
