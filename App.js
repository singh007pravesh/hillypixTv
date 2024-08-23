import React, {useEffect} from 'react';
import {SafeAreaView, View, StatusBar, Text} from 'react-native';
import AppNavigator from './src/config/navigation';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" hidden/> */}
      {/* <SafeAreaProvider> */}
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <AppNavigator />
      </View>

      {/* </SafeAreaProvider> */}
    </View>
  );
};

export default App;
