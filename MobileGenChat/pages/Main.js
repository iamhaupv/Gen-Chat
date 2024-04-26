import {
  Box, 
  Text 
} from "@gluestack-ui/themed"
  
import { createProvider } from "@gluestack-ui/provider"
import { StyledProvider } from "@gluestack-style/react"
import { config } from "@gluestack-ui/config"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from "../components/Profile";
import Message from "../components/Message";
  
export const Provider = createProvider({
    StyledProvider,
})

const Tab = createBottomTabNavigator();
  
export default function Main({navigation}) {
  return (
    <Provider config={config}>
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Profile') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Message') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })
        }
      >
        <Tab.Screen name="Profile">
          {(props) => <Profile {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Message">
          {(props) => <Message {...props} />}
        </Tab.Screen>
        
      </Tab.Navigator>
    </Provider>
  )
}
  