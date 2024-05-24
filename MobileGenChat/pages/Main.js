import { 
  CircleUserRound,
  MessageCircleMore, 
  Phone, 
  SquareUserRound,
  UsersRound
} from 'lucide-react-native'; 

import { createProvider } from "@gluestack-ui/provider"
import { StyledProvider } from "@gluestack-style/react"
import { config } from "@gluestack-ui/config"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  
import React, { useEffect } from 'react'
import Profile from "../components/Profile";
import Contact from "../components/Contact";
import Chats from "../components/Chats";
import Call from "../components/Call";
import { Image } from "react-native";
import GenChatLogo from "./GenChatLogo";
import GroupScreen from "../components/groupScreen";
  
export const Provider = createProvider({
  StyledProvider,
})

const Tab = createBottomTabNavigator();
  
export default function Main({route, navigation}) {
  let user = route.params.user;

  useEffect(() => {}, [route]);
  useEffect(() => {}, [navigation]);

  return (
    <Provider config={config}>
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let elem;

              if (route.name === 'Chats') {
                iconName = focused
                ? elem = <MessageCircleMore strokeWidth={1.75} color="blue" />
                : elem = <MessageCircleMore strokeWidth={1} color="blue" />
              } else if (route.name === 'Create Group') {
                iconName = focused 
                ? elem = <UsersRound strokeWidth={1.75} color="blue" />
                : elem = <UsersRound strokeWidth={1} color="blue" />
              } else if (route.name === 'GenChatLogo') {
                iconName = focused 
                ? elem = <Image source={require('../assets/logo.png')} style={{borderRadius: 80}}></Image>
                : elem = <Image source={require('../assets/logo.png')} style={{borderRadius: 80}}></Image>
              } else if (route.name === 'Friend Request') {
                iconName = focused 
                ? elem = <SquareUserRound strokeWidth={1.75} color="blue" />
                : elem = <SquareUserRound strokeWidth={1} color="blue" />
              } else if (route.name === 'Profile') {
                iconName = focused 
                  ? elem = <CircleUserRound strokeWidth={1.75} color="blue" />
                  : elem = <CircleUserRound strokeWidth={1} color="blue" />
              }

              return elem;
              
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })
        }
      >
        <Tab.Screen name="Chats">
          {(props) => <Chats user={user} {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Create Group">
          {(props) => <GroupScreen user={user.data} {...props} />}
        </Tab.Screen>

        {/* <Tab.Screen name="Call">
          {(props) => <Call {...props} />}
        </Tab.Screen> */}

        <Tab.Screen name="GenChatLogo"  options={{ title: '' }}>
          {(props) => <GenChatLogo {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Friend Request">
          {(props) => <Contact user={user.data} {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Profile">
          {(props) => <Profile user={user.data} {...props} />}
        </Tab.Screen>
        
      </Tab.Navigator>
    </Provider>
  )
}
  