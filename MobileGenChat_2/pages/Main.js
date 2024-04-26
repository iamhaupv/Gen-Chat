import {
  Box, 
  Text 
} from "@gluestack-ui/themed"
  
import { createProvider } from "@gluestack-ui/provider"
import { StyledProvider } from "@gluestack-style/react"
import { config } from "@gluestack-ui/config"
  
import React from 'react'
import { Pressable, View } from 'react-native'
  
export const Provider = createProvider({
    StyledProvider,
})
  
export default function Main({navigation}) {
  return (
    <Provider config={config}>
      <View>
        <Text>lmao</Text>
  
        <Box bg="$primary500" p="$1">
          <Text color="white">This is the Box</Text>
        </Box>

        <Pressable
          title="Go to Details"
          onPress={() => navigation.navigate('Home')}
        >
          <Text>Ve home</Text>
        </Pressable>
      </View>
    </Provider>
  )
}
  