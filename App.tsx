import React from 'react';
import {
  View
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Feed from './src/tabs/Feed'
import PostDetails from './src/stack/PostDetails'
import Login from './src/stack/Login'
import Profile from './src/tabs/Profile'
import Notifications from './src/tabs/Notifications'
import NewPost from './src/tabs/NewPost'
import EditProfile from './src/drawer/EditProfile'
import Settings from './src/drawer/Settings'

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Icon, Tab, Button, ThemeProvider } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
/*

options={{headerLeft: null, headerRight: () => (
          <Button title='Logout' onPress={() => this.setState({loggedIn: false})}

*/


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


import PhoneNumber from "./screens/PhoneNumber";
import Otp from "./screens/Otp";
import Gated from "./screens/Gated";


class App extends React.Component {

  state = {
    loggedIn: false
  }

  login = () => {
    this.setState({loggedIn: true})
    
  }

  FeedScreen = ({navigation}) => {
    return (

      <Stack.Navigator>

        <Stack.Screen name='Feed' component={Feed} screenOptions={{
          headerShown: false
        }}/>
        
        <Stack.Screen name='Post Details' component={PostDetails} screenOptions={{
          headerShown: false
        }}/>
           <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Gated" component={Gated} />
      </Stack.Navigator>
    )
  }

  ProfileScreen = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Profile' component={Profile} screenOptions={{
          headerShown: false
        }}/>
        <Drawer.Screen name='Edit Profile' component={EditProfile} />
        <Drawer.Screen name='Settings' component={Settings} />
      </Drawer.Navigator>
    )
  }


MyScreen = () => {

return (     

                <Tabs.Navigator screenOptions= {{"activeTintColor": '#e91e63',"tabBarStyle": [
    {
      "display": "flex"
    },
    null
  ],  }}>
<Tabs.Screen name='Search...' options={{
        headerShown: true,      tabBarIcon: ({ color, size }) => (
          <Icon name="bicycle" type="ionicon" size={size} color={color} />
        )
        }}  component={Feed}/>
                <Tabs.Screen name='Profile' children={this.ProfileScreen} options={{
           tabBarIcon: ({ color, size }) => (
          <Icon name="people" type="ionicon" size={size} color={color} />
        ),
        }} />
                <Tabs.Screen name='Notifications' component={Notifications} options={{
           tabBarIcon: ({ color, size }) => (
          <Icon name="basket" type="ionicon" size={size} color={color} />
        ),
        }}/>
                <Tabs.Screen name='New Post' component={NewPost} options={{
           tabBarIcon: ({ color, size }) => (
          <Icon name="book" type="ionicon" size={size} color={color} />
        ),
        }}/>
              </Tabs.Navigator>
         )

}



  render() {
    return (


      <ThemeProvider>

      <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName="MyScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen name="PhoneNumber" component={PhoneNumber}/>
      <Stack.Screen name='MyScreen' children={this.MyScreen} screenOptions={{
          headerShown: false
        }}/>
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Gated" component={Gated} />
      
      </Stack.Navigator>
      </NavigationContainer>
     
      </ThemeProvider>
    )
  }
}

export default App;
