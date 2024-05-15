import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View, Alert } from 'react-native'
import { Button, Input, InputSlot, InputField, InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarImage, Fab, FabIcon, AddIcon, AvatarFallbackText, AvatarBadge,Icon } from '@gluestack-ui/themed';
import { X, UserPlus, Check } from 'lucide-react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    console.log("------ new user after added friend ---------");
    // const new_user = await findUserByPhoneNumber(user.phoneNumber);
    // handleUser(new_user.data);
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

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ]

  return (
    <View style={{
      height: "100%"
    }}>
      
    <Input size='xl'>
      <InputSlot pl='$3'>
        <InputIcon as={SearchIcon}/>
      </InputSlot>
      <InputField
        placeholder="Search..."
      />
    </Input>

    <Box
      borderBottomWidth="$1"
      borderColor="#dddddd"
      $dark-borderColor="$coolGray800"
      $base-pl="$3"
      $base-pr="$3"
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
          <TouchableHighlight
            key={index}
            // onPress={() => {
            //   navigation.navigate("Chat", {user: item})
            // }}
          >
            <Box
              borderBottomWidth="$1"
              borderColor="#dddddd"
              $dark-borderColor="$coolGray800"
              $base-pl="$3"
              $base-pr="$3"
              $sm-pl="$4"
              $sm-pr="$4"
              py="$2"
              onPress
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
{/* 
                <Check size="30" />
                <X size="30" /> */}
                
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
