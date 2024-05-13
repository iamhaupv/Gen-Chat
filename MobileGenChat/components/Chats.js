import React, { useContext, useEffect, useState } from 'react'
import { TouchableHighlight, View } from 'react-native'
import { Input, InputSlot, InputField, InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarImage, Fab, FabIcon, AddIcon, AvatarFallbackText, AvatarBadge } from '@gluestack-ui/themed';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';
import {socket} from '../utils/socket';

const ChatScreen = createNativeStackNavigator();

export default function Chats({navigation}) {
  const [friends, setFriends] = useState([]);
  const [rooms, setRooms] = useState([]);
  const userRoot = {
    "_id": "661f7edf293d7e25220dc316",
    "name": "Nguyen Thanh Khoa",
    "email": "khoa@gmail.com",
    "password": "$2b$10$on5PzJt.8sfYe780SIiAU.iBcqY.SaG6Os459rJXrjYZZBwuBHJGa",
    "phoneNumber": "0374858237",
    "address": "",
    "photoURL": "",
    "listFriend": [
      {"friend_id": "0932659945", "room_id": "1"},
    ],
    "listRequestSend": [],
    "listRequestGet": [],
    "rooms": [],
    "messageReceiver": [],
    "messageSender": [],
    "__v": 0
  }

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
  }, [])

  useEffect(() => {
    socket.emit("init-room", userRoot.phoneNumber);

    socket.on("rooms2", data => {
      setRooms(data);
      console.log("Rooms");
      console.log(rooms);
    });

    return () => {
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }, []);

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
      
    <Box py="$">
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
         renderItem={({ index, item }) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              // console.log("Home");
              navigation.navigate("Chat", {userRoot: userRoot, receiver: item})
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
              <HStack space="md">
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
                  <Text
                    color="$coolGray600"
                    $dark-color="$warmGray200"
                  >
                    {item.recentText || null}
                  </Text>
                </VStack>
                <Text
                  fontSize="$xs"
                  color="$coolGray800"
                  alignSelf="flex-start"
                  $dark-color="$warmGray100"
                >
                  {item.timeStamp || null}
                </Text>
              </HStack>
            </Box>
          </TouchableHighlight>
        )}
      />
    </Box>

    <Fab size="lg" right="$4" bottom="$4" isHovered={false} isDisabled={false} isPressed={false} >
      <FabIcon as={AddIcon} />
    </Fab>
      
    </View>
  )
}
