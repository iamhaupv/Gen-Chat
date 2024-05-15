import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Input, InputSlot, InputField, InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarFallbackText, Modal,ModalBackdrop,ModalContent,ModalHeader,ModalBody,ModalFooter,ModalCloseButton,ButtonText,Button, View, Center } from '@gluestack-ui/themed';

import getRequestSend from '../services/getRequestSend';
import addRequestSend from '../services/addRequestSend';
import addRequestGet from '../services/addRequestGet';
import getListFriend from '../services/getListFriend';

import findUserByPhoneNumber from '../services/findUserByPhoneNumber';

export default function Search({route}) {
  const [showModal, setShowModal] = useState(false)
  const [searchedPhoneNumber, setSearchedPhoneNumber] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsRequestGet, setFriendsRequestGet] = useState([]);
  const [friendsRequestSend, setFriendsRequestSend] = useState([]);

  const user = route.params.user;

  const searchUser = async () => {
    const user = await findUserByPhoneNumber(searchedPhoneNumber);
    setSearchedUser(user.data);
  }

  const addFriendRequest = async () => {
    await addRequestSend(user.phoneNumber, searchedUser.phoneNumber);
    await addRequestGet(user.phoneNumber, searchedUser.phoneNumber);

    createAddedFriendRequestAlert();
  }

  const getFriendList = async () => {
    const friendList = await getListFriend(user.phoneNumber);

    const friendFound = []

    for (let i = 0; i < friendList.length; i++) {
      const friend = await findUserByPhoneNumber(friendList[i].friend_id);
      friendFound.push(friend.data);
    }

    setFriends(friendFound);
  }

  const getFriendsRequestSend = async () => {
    const friends_request_send = await getRequestSend(user.phoneNumber);
    
    let friends_request_send_list = [];
    for (let i = 0; i < friends_request_send.data.length; i++) {
      const friend = await findUserByPhoneNumber(friends_request_send.data[i]);
      friends_request_send_list.push(friend.data);
    }
    
    setFriendsRequestSend(friends_request_send_list);
  }

  const isSearchedUserFriendWithUser = () => {
    if (searchedUser) {
      if (searchedUser.phoneNumber == user.phoneNumber) return true;

      for (let i = 0; i < friends.length; i++) {
        if (friends[i].phoneNumber == searchedUser.phoneNumber) {
          return true;
        }
      }

      for (let i = 0; i < friendsRequestSend.length; i++) {
        if (friendsRequestSend[i].phoneNumber == searchedUser.phoneNumber) {
          return true;
        }
      }
    }

    return false;
  }

  const createAddedFriendRequestAlert = () =>
    Alert.alert('Alert Title', 'Add Friend Successfully!', [
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

  useEffect(() => {}, [searchedUser])
  useEffect(() => {}, [showModal])

  useEffect(() => {
    getFriendList();
    getFriendsRequestSend();
  }, []);
  // useEffect(() => {}, [friendsRequestGet]);
  // useEffect(() => {}, [friendsRequestSend]);

  return (
    <View style={{
      height: "100%"
    }}>
      <Input size='xl'>
        <InputSlot pl='$3' onPress={searchUser}>
          <InputIcon as={SearchIcon}/>
        </InputSlot>
        <InputField
          value={searchedPhoneNumber}
          placeholder="Search..."
          onChangeText={setSearchedPhoneNumber}
        />
      </Input>
        
      <Box py="$">
        {
          searchedUser != null ?
            <Box
            borderBottomWidth="$1"
            borderColor="#dddddd"
            $dark-borderColor="$coolGray800"
            $base-pl="$3"
            $base-pr="$3"
            $sm-pl="$4"
            $sm-pr="$4"
            py="$2"
          >
            <HStack space="md">
              <Avatar size="md">
                <AvatarFallbackText>{searchedUser.name}</AvatarFallbackText>
              </Avatar>
              <VStack style={{
                flex: 1
              }}>
                <Text
                  color="$coolGray800"
                  fontWeight="$bold"
                  $dark-color="$warmGray100"            
                >
                  {searchedUser.name || null}
                </Text>
              </VStack>

              {
                isSearchedUserFriendWithUser() ? 
                  <></> :
                  <Button onPress={addFriendRequest}>
                    <Text color='white'>Add friend</Text>
                  </Button>
              }
            </HStack>
          </Box>
          : <Text p={10}>No user found</Text>
        }
        
      </Box>
    </View>
  )
}
