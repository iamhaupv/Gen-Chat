import React from 'react'
import { Text, View } from 'react-native'

export default function ChatData({data}) {
  return (
    <View style={{
      alignSelf: 'flex-start'
    }}>
      <Text style={{
        width: "auto", 
        marginTop: 10, 
        marginLeft: 10, 
        padding: 10, 
        color: "white", 
        backgroundColor: "#999999", 
        borderRadius: 10
      }}>{data.content}</Text>
    </View>
  )
}
