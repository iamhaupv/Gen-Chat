import React from 'react'
import { Text, View } from 'react-native'

export default function ChatUser({data}) {
  return (
    <View style={{
        alignSelf: 'flex-end'
    }}>
        <Text style={{
            width: "auto", 
            marginTop: 10, 
            marginRight: 10, 
            padding: 10, 
            color: "white", 
            backgroundColor: "blue", 
            borderRadius: 10
        }}>{data.content}</Text>
    </View>
  )
}
