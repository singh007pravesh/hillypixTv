import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import AppNavigator from './src/config/navigation'


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#20294f' }}>
      <StatusBar backgroundColor="#20294f" barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </SafeAreaView>

  )
};

export default App;