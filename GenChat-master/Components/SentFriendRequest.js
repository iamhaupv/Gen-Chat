import React from 'react'
import { ScrollView } from 'react-native'
import { useRoute } from "@react-navigation/native";
import SentFriendRequestUser from './SentFriendRequestUser'

export default function SentFriendRequest() {
  const route = useRoute();
  const user = route.params?.user;
  const userGets = route.params?.userGets;

  return (
    <ScrollView>
    {userGets.map((elem, i) => <SentFriendRequestUser navigation={navigation} key={i} user={elem} userRoot={user}/>)}
  </ScrollView>
  )
}