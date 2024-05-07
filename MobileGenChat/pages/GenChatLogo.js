import { ImageBackground,Text } from '@gluestack-ui/themed'
import React from 'react'
import { View } from 'react-native'

export default function GenChatLogo({navigation}) {
  return (
    <View style={{
      height: "100%", 
      alignItems: "center", 
      justifyContent: "center", 
      gap: 10
    }}>
      <ImageBackground
        source={require("../assets/logo.png")}
        style={{
          width: 70, 
          height: 70
        }}
      >
      </ImageBackground>
      <Text fontWeight='bold' fontSize={30}>GEN CHAT</Text>
      <Text fontSize={12} fontStyle='italic' color='gray'>APP CHAT FOR GEN Z</Text>
      <Text fontSize={12} fontStyle='italic' color='gray'>Version: 1.0</Text>
    </View>
  )
}
