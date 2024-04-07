import React from 'react'
import ReceivedFriendRequestUser from './ReceivedFriendRequestUser'
import { ScrollView } from 'react-native'

export default function ReceivedFriendRequest() {
  return (
    <ScrollView>
      <ReceivedFriendRequestUser />
      <ReceivedFriendRequestUser />
      <ReceivedFriendRequestUser />
      <ReceivedFriendRequestUser />
    </ScrollView>
  )
}