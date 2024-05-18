import { Text, View } from '@gluestack-ui/themed'
import React from 'react'

export default function Notification({data}) {
  console.log("---------------------- Called notification");

  return (
    <View>
      <Text textAlign='center' color='black' p={2} fontSize={'$sm'}>{data.content}</Text>
    </View>
  )
}
