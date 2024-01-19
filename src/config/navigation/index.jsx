import {View, Text, Platform} from 'react-native';
import React from 'react';
import {createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/app/home';
import VideoDownloader from '../../screens/app/rnfs';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerStyle: { 
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign:'center',
            color:'#000',
          },
        }}>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{title: 'HomeScreen',}}
        />
        <Stack.Screen
          name="videoDownloader"
          component={VideoDownloader}
          options={{title: 'Video Dwonloader'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
