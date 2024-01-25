import React from 'react';
import { useColorScheme } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import HomeScreen from '../../screens/app/home';
import SearchScreen from '../../screens/app/search';
import WatchListScreen from '../../screens/app/watchlist';
import AccountScreen from '../../screens/app/account';
import VideoDownloader from '../../screens/app/rnfs';
import Login from '../../screens/app/auth';
import Signup from '../../screens/app/auth/signup';
import VideoDetail from '../../screens/app/videoDetails';




const MainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// const StackNavigation = () => (
//   <Stack.Navigator
//     initialRouteName="Home"
    // screenOptions={{
    //   ...TransitionPresets.SlideFromRightIOS,
    //   headerStyle: {
    //     backgroundColor: '#fff',
    //   },
    //   headerTitleAlign: 'center',
    //   headerTitleStyle: {
    //     textAlign: 'center',
    //     color: '#000',
    //   },
    // }}>
//     <Stack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{ title: 'HomeScreen' }}
//     />
//     <Stack.Screen
//       name="Search"
//       component={SearchScreen}
//       options={{ title: 'Video Dwonloader' }}
//     />
//     <Stack.Screen
//       name="WatchList"
//       component={WatchListScreen}
//       options={{
//         title: 'Video Player',
//         // headerShown:false
//       }}
//     />
//     <Stack.Screen
//       name="Account"
//       component={AccountScreen}
//       options={{ title: 'Video Dwonloader' }}
//     />
//      <Stack.Screen
//       name="VideoDownloader"
//       component={VideoDownloader}
//       options={{ title: 'Video Dwonloader' }}
//     />
//   </Stack.Navigator>
// );

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      activeColor="#fff"
      activeIndicatorStyle={{backgroundColor:'#000'}}
      activeBackgroundColor= '#c4461efec'
      inactiveColor="gray"
      barStyle={{ backgroundColor:'#000'}}
      // labeled={false}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen}
        
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen 
      name="search" 
      component={SearchScreen} 
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="movie-search" color={color} size={25} />
        ),
      }}
      />
       <Tab.Screen 
      name="watchList" 
      component={WatchListScreen}
        options={{
          tabBarLabel: 'Watch List',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart-heart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen 
        name="account" 
        component={AccountScreen} 
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ticket-account" color={color} size={25} />
          ),
        }}
        />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const scheme = useColorScheme();
  return (
    // <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MainStack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            // headerStyle: {
            //   backgroundColor: '#fff',
            // },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              textAlign: 'center',
              // color: '#000',
            },
          }}
        >
          <MainStack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ title: 'login Screen' }}
          />
           <MainStack.Screen
            name="VideoDetail"
            component={VideoDetail}
            options={{ title: 'Video Details' ,
            headerShown:false
          }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    // </SafeAreaProvider>
  );
};






export default AppNavigator;
