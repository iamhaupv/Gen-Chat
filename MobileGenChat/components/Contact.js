import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View } from 'react-native'
import { Input, InputSlot, InputField, InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarImage, Fab, FabIcon, AddIcon, AvatarFallbackText, AvatarBadge,Icon } from '@gluestack-ui/themed';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';
import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';
import { Phone, UserPlus, Video } from 'lucide-react-native';

const ChatScreen = createNativeStackNavigator();

export default function Contact({navigation}) {
  const [friends, setFriends] = useState([]);

  const getListFriends = async () => {
    const listFriend = await getListFriend("0374858237");
    const temp_friends = [];

    for (let i = 0; i < listFriend.data.length; i++) {
      const friend = await getInfor( listFriend.data[i].friend_id );
      temp_friends.push(friend.data);
    }

    setFriends(temp_friends);
  }

  useEffect(() => {
    getListFriends();
    console.log("friends");
    console.log(friends);
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
        data={friends}
        keyExtractor={item => item._id}
         renderItem={({ index, item }) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              // console.log("Home");
              navigation.navigate("Chat", {user: item})
            }}
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
                <Icon as={Phone} size='30'/>
                <Icon as={Video} size='30'/>
              </HStack>
            </Box>
          </TouchableHighlight>
        )}
      />
      
    </Box>

    </View>
  )
}
