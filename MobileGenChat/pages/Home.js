import {
  Box, 
  Text 
} from "@gluestack-ui/themed"
  
import { createProvider } from "@gluestack-ui/provider"
import { StyledProvider } from "@gluestack-style/react"
import { config } from "@gluestack-ui/config"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
import React from 'react'
import { Pressable, View } from 'react-native'
import SignIn from "../components/SignIn";
  
export const Provider = createProvider({
  StyledProvider,
})

const Screen = createNativeStackNavigator();
  
export default function Home({navigation}) {
  return (
    <Provider config={config}>
      {/* <View>
        <Text>lmao</Text>
  
        <Box bg="$primary500" p="$1">
          <Text color="white">This is the Box</Text>
        </Box>

        <Pressable
          title="Go to Details"
          onPress={() => navigation.navigate('Main')}
        >
          <Text>Ve main</Text>
        </Pressable>
      </View> */}

      <Screen.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let elem;

              if (route.name === 'Chat') {
                iconName = focused
                ? elem = <MessageCircleMore strokeWidth={1.75} color="blue" />
                : elem = <MessageCircleMore strokeWidth={1} color="blue" />
              } else if (route.name === 'Call') {
                iconName = focused 
                ? elem = <Phone strokeWidth={1.75} color="blue" />
                : elem = <Phone strokeWidth={1} color="blue" />
              } else if (route.name === 'GenChatLogo') {
                iconName = focused 
                ? elem = <Image source={require('../assets/logo.png')} style={{borderRadius: 80}}></Image>
                : elem = <Image source={require('../assets/logo.png')} style={{borderRadius: 80}}></Image>
              } else if (route.name === 'Contact') {
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
        <Screen.Screen name="Sign In">
          {(props) => <SignIn {...props} />}
        </Screen.Screen>

        <Screen.Screen name="Main">
          {(props) => <Main {...props} />}
        </Screen.Screen>
        
      </Screen.Navigator>
    </Provider>
  )
}
  