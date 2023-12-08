import React, { useEffect } from 'react';

import { KeyboardAvoidingView, LogBox, StyleSheet, View, YellowBox } from 'react-native';
import 'react-native-gesture-handler';

import MainNavigation from '../Events/route/nav';
import SearchProvider from '../Events/store/SearchProvider';
import ServiceProviderProvider from './store/ServiceProviderProvider';

const App = () => {
  LogBox.ignoreLogs([
    'source.uri should not be an empty string',
    'Warning: Each child in a list should have a unique "key" prop.',
  ]);

  useEffect(() => {
    var url = 'https://nameless-meadow-25389.herokuapp.com/server';
    fetch(url)
      .then(res => res.json())
      .then(resJson => console.log('res', resJson));
  }, []);

  return (
    <SearchProvider>
      <ServiceProviderProvider>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <MainNavigation />
        </KeyboardAvoidingView>
      </ServiceProviderProvider>
    </SearchProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default App;
