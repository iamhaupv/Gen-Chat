import React from 'react'
import ReceivedFriendRequestUser from './ReceivedFriendRequestUser'
import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text } from 'react-native'

export default function ReceivedFriendRequest({navigation}) {
  const route = useRoute();
  const user = route.params?.user;
  const userSends = route.params?.userSends;
  
  return (
    <ScrollView>
      {userSends.map((elem, i) => <ReceivedFriendRequestUser navigation={navigation} key={i} user={elem} userRoot={user}/>)}
    </ScrollView>
  )
}