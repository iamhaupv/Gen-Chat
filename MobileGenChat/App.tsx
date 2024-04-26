import { createProvider } from "@gluestack-ui/provider"
import { StyledProvider } from "@gluestack-style/react"
import { config } from "@gluestack-ui/config"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import Home from "./pages/Home";
import Main from "./pages/Main";

export const Provider = createProvider({
  StyledProvider,
})

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Provider config={config}>
        <Stack.Navigator>

          <Stack.Screen name="Home">
            {(props) => <Home {...props} />}
          </Stack.Screen>
          
          <Stack.Screen name="Main">
            {(props) => <Main {...props} />}
          </Stack.Screen>
          
        </Stack.Navigator>
      </Provider>
      
    </NavigationContainer>
  )
}
