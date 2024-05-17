import React, { useEffect, useState } from 'react'
import { TouchableHighlight,  } from 'react-native'
import { InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Avatar, Fab, FabIcon, AddIcon, AvatarFallbackText, View } from '@gluestack-ui/themed';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';
import {socket} from '../utils/socket';

const ChatScreen = createNativeStackNavigator();

export default function Chats({route, user, navigation}) {
  const [friends, setFriends] = useState([]);
  const [rooms, setRooms] = useState([]);

  const userRoot = user.data;

  const getListFriends = async () => {
    
    const listFriend = await getListFriend(userRoot.phoneNumber);

    const temp_friends = [];
    
    for (let i = 0; i < listFriend.data.length; i++) {
      socket.emit('join', listFriend.data[i].room_id);
      socket.emit("init-chat-message", listFriend.data[i].room_id);

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
    });

    return () => {
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }, []);

  return (
    <View style={{
      height: "100%"
    }}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Search", {user: user.data})
        }}
      >
      {/* <Input size='xl'>
        <InputSlot pl='$3'>
          <InputIcon as={SearchIcon}/>
        </InputSlot>
        <InputField
          placeholder="Search..."
        />
      </Input> */}
      <View p={10}>
        <HStack space='md'>
          <InputIcon as={SearchIcon}/>
          <Text>Search...</Text>
        </HStack>
      </View>
    </TouchableHighlight>

    <Box py="$">
      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ index, item }) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              navigation.navigate("GroupChat", {userRoot: userRoot, room: item})
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
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
        renderItem={({ index, item }) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
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
