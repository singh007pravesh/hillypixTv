import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import AppNavigator from './src/config/navigation'


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </SafeAreaView>

  )
};

export default App;