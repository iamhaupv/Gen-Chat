import { Button } from '@gluestack-ui/themed';
import { View, Text, Icon } from '@gluestack-ui/themed'
import { ArrowLeft, UserMinus } from 'lucide-react-native';
import React from 'react'

import removeFriend from '../services/removeFriend';
import { Alert } from 'react-native';
import getInfor from '../services/getInfor';

export default function FriendProfile({route, navigation}) {
  const userRoot = route.params.userRoot;
  const receiver = route.params.receiver;

  const handleRemoveFriend = async () => {
    await removeFriend(userRoot.phoneNumber, receiver.phoneNumber);
    await removeFriend(receiver.phoneNumber, userRoot.phoneNumber);

    Alert.alert('Alert Title', 'Remove friend Successfully!', [
      { 
        text: 'OK', 
        onPress: async () => {
          const user = await getInfor(userRoot.phoneNumber);
          navigation.navigate("Main", {"user": user})
        }
      },
    ]);
  }

  return (
    <View alignItems='center' p={10} gap={10}>
      <ArrowLeft
        size={30}
        strokeWidth={2}
        color="blue"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Text fontWeight="bold" fontSize="$xl">{receiver.name}</Text>
      <Text fontSize="$lg">Phone Number: {receiver.phoneNumber}</Text>

      <Button backgroundColor='#eeeeee' gap={10} onPress={handleRemoveFriend}>
        <Icon as={UserMinus} size={30} color="red"></Icon>
        <Text color='red'>Remove Friend</Text>
      </Button>
    </View>
  )
}
