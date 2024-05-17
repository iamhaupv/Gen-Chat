import React, { useEffect, useState } from 'react'
import { TouchableHighlight, Alert } from 'react-native'
import { View, Button, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarImage, Fab, FabIcon, AddIcon, AvatarFallbackText, AvatarBadge,Icon } from '@gluestack-ui/themed';
import { X, UserPlus, Check } from 'lucide-react-native';

import getRequestGet from '../services/getRequestGet';
import acceptFriend from '../services/acceptFriend';
import removeRequestGet from '../services/removeRequestGet';
import removeRequestSend from '../services/removeRequestSend';
import getInfor from '../services/getInfor';

export default function Contact({user, navigation}) {
  const [friendsRequestGet, setFriendsRequestGet] = useState([]);

  const getListFriendsRequestGet = async () => {
    const listFriendsRequestGet = await getRequestGet(user.phoneNumber);
    const tempListFriendsRequestGet = [];

    for (let i = 0; i < listFriendsRequestGet.data.length; i++) {
      const friend = await getInfor( listFriendsRequestGet.data[i] );

      tempListFriendsRequestGet.push(friend.data);
    }

    setFriendsRequestGet(tempListFriendsRequestGet);
  }

  const handleAccept = async (phoneNumber) => {
    await acceptFriend(user.phoneNumber, phoneNumber);
    await removeRequestGet(user.phoneNumber, phoneNumber);
    await removeRequestSend(phoneNumber, user.phoneNumber);

    getListFriendsRequestGet();
    createAddedFriendSuccessfullyAlert();
  }

  const handleReject = async (phoneNumber) => {
    await removeRequestGet(user.phoneNumber, phoneNumber);
    await removeRequestSend(phoneNumber, user.phoneNumber);
    getListFriendsRequestGet();
    createRejectedFriendSuccessfullyAlert();
  }

  const createAddedFriendSuccessfullyAlert = () =>
    Alert.alert('Alert Title', 'Add Friend Successfully!', [
      { 
        text: 'OK', 
        onPress: () => console.log('OK Pressed')
      },
    ]);
  const createRejectedFriendSuccessfullyAlert = () =>
    Alert.alert('Alert Title', 'Reject Friend Successfully!', [
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
      { 
        text: 'OK', 
        onPress: () => console.log('OK Pressed')
      },
    ]);

  useEffect(() => {
    getListFriendsRequestGet();
  }, [])

  return (
    <View height="100%" p={10}>
      <Text fontWeight="bold" fontSize="$xl">Friend Request</Text>
      <Box
        borderBottomWidth="$1"
        borderColor="#dddddd"
        $dark-borderColor="$coolGray800"
        $sm-pl="$4"
        $sm-pr="$4"
        py="$2"
        onPress
      >
        <HStack space="lg" alignItems='center'>
          <Avatar bgColor="$blue500">
          {/* User is imported from 'lucide-react-native' */}
            <Icon as={UserPlus} size='30' color="white"/>
          </Avatar>
        
          <Text fontWeight='bold'>Friend Request</Text>
        </HStack>
      </Box>
        
      <Box py="$">
        <FlatList
          data={friendsRequestGet}
          keyExtractor={item => item._id}
          renderItem={({ index, item }) => (
            <TouchableHighlight key={index}>
              <Box
                borderBottomWidth="$1"
                borderColor="#dddddd"
                $dark-borderColor="$coolGray800"
                $sm-pl="$4"
                $sm-pr="$4"
              >
                <HStack space="lg" alignItems='center'>
                  <Avatar size="md">
                    <AvatarFallbackText>{item.name}</AvatarFallbackText>
                  </Avatar>
                  <VStack style={{
                    flex: 1
                  }}>
                    <Text
                      color="$coolGray800"
                      fontWeight="$bold"
                      $dark-color="$warmGray100"
                    >
                      {item.name || null}
                    </Text>
                  </VStack>
                  
                  <Button
                    backgroundColor='$white'
                    onPress={() => handleAccept(item.phoneNumber)}
                  >
                    <Icon as={Check} size='30' color="green"/>
                  </Button>
                  <Button
                    backgroundColor='$white'
                    onPress={() => handleReject(item.phoneNumber)}
                  >
                    <Icon as={X} size='30' color="red"/>
                  </Button>
                </HStack>
              </Box>
            </TouchableHighlight>
          )}
        />
      </Box>
    </View>
  )
}
