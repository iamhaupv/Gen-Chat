import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState, useRef } from 'react'
import { TouchableHighlight, TextInput, Alert } from "react-native";
import { AvatarFallbackText, FlatList, VStack, Button, View, Text, Box, Avatar, Icon, HStack, ButtonText } from '@gluestack-ui/themed';
import { ArrowLeft, UserPlus } from 'lucide-react-native';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';

import {socket} from '../utils/socket';

export default ForwardMessage = ({ route, navigation }) => {
    const [nameGroup, setNameGroup] = useState("");
    const [friends, setFriends] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [checkboxes, setCheckboxes] = useState(friends.map(() => false));

    const arrUserId = useRef([]).current;
    const data = route.params.data;

    const getListFriends = async () => {
      const listFriend = await getListFriend(data.sender);
      const temp_rooms = [];
      
      for (let i = 0; i < listFriend.data.length; i++) {
        const friend = await getInfor( listFriend.data[i].friend_id );

        if (listFriend.data[i].friend_id != data.receiver) {
          temp_rooms.push({
            name: friend.data.name, 
            phoneNumber: friend.data.phoneNumber, 
            room_id: listFriend.data[i].room_id
          })
        }
      }

      setRooms(temp_rooms);
    }

    useEffect(() => {
      getListFriends();
    }, []);

    const handleCheckboxChange = (index, item) => {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxes(updatedCheckboxes);

      if (updatedCheckboxes[index] == true)
        arrUserId.push(item);
      else
        arrUserId.splice(item, 1);
    };

    const createGroup = async () => {
      try {
        socket.emit('forward-message', {
          idMessageToForward: data.idMessage, 
          sender: data.sender, 
          sender_name: data.sender_name, 
          receivers: arrUserId,
          content: data.content, 
          type: data.type, 
          chat_type: data.type, 
        });

        Alert.alert('Alert Title', 'Forwward message Successfully!', [
          { 
            text: 'OK', 
            onPress: () => console.log('OK Pressed')
          },
        ]);
      } catch (error) {
        console.log("Error forward message: " + error);
      }
    }

    return (
      <View p={10}>
        <Box width="100%">
          <HStack space='md'>
            <ArrowLeft
              size={30}
              strokeWidth={2}
              color="blue"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text fontWeight="bold" fontSize="$xl">Forward message</Text>
          </HStack>

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
                <Icon as={UserPlus} size='30' color="white"/>
              </Avatar>
            
              <Text fontWeight='bold'>Select friends to forward message</Text>
            </HStack>
          </Box>

          <Box>
            <FlatList
              data={rooms}
              keyExtractor={item => item.room_id}
              renderItem={({ index, item }) => (
                <TouchableHighlight key={index} >
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

                      <CheckBox
                        value={checkboxes[index]}
                        onValueChange={() => handleCheckboxChange(index, item)}
                      />
                    </HStack>
                  </Box>
                </TouchableHighlight>
              )}
            />      
          </Box>

          <Button onPress={createGroup}>
            <ButtonText>Create group</ButtonText>
          </Button>
        </Box>
      </View>
    )
}