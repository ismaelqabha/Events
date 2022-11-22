

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler' ;

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from "../Events/route/nav";
//import MenuProvider from "../Events/store/MenuProvider";




const App: () => Node = () => {



  return (

    // <MenuProvider>
      <View style={{ flex: 1 }}>
        <MainNavigation />
      </View>
    // </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
});

export default App;
