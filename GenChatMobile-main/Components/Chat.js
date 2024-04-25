import React from 'react'
import { View, Text } from 'react-native'

export default function Chat(props) {
  const isSender = props.isSender; 
    
  return (
    <View
      style={{
        backgroundColor: '#dddddd', 
        padding: 10, 
        margin: 10, 
        alignSelf: (isSender == true ? 'flex-start' : 'flex-end' ), 
        borderRadius: 10
      }}
    >
      <Text>Hello</Text>
    </View>
  )
}
