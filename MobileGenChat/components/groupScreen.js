import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState, useRef } from 'react'
import { TouchableHighlight, TextInput, Alert } from "react-native";
import { AvatarFallbackText, FlatList, VStack, Button, View, Text, Box, Avatar, Icon, HStack, ButtonText } from '@gluestack-ui/themed';
import { UserPlus } from 'lucide-react-native';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';

import {socket} from '../utils/socket';

export default GroupScreen = ({ user, navigation }) => {
    const [nameGroup, setNameGroup] = useState("");
    const [friends, setFriends] = useState([]);
    const [checkboxes, setCheckboxes] = useState(friends.map(() => false));

    const arrUserId = useRef([]).current;

    const getListFriends = async () => {
      const listFriend = await getListFriend(user.phoneNumber);
      const temp_friends = [];
      
      for (let i = 0; i < listFriend.data.length; i++) {
        const friend = await getInfor( listFriend.data[i].friend_id );
        temp_friends.push(friend.data);
      }
  
      setFriends(temp_friends);
    }

    useEffect(() => {
      getListFriends();
    }, []);

    const handleCheckboxChange = (index, id) => {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxes(updatedCheckboxes);

      if (updatedCheckboxes[index] == true)
        arrUserId.push(id);
      else
        arrUserId.splice(id, 1)
    };

    const createGroup = async () => {
      try {
        let idRoom = "room" + new Date().valueOf();
        socket.emit("join-room", {
          id: idRoom, 
          phoneNumber: idRoom, 
          name: nameGroup, 
          admin: user.phoneNumber, 
          user: arrUserId, 
          messages: []
        });
        socket.emit("init-room", user.phoneNumber);

        Alert.alert('Alert Title', 'Create room Successfully!', [
          { 
            text: 'OK', 
            onPress: () => console.log('OK Pressed')
          },
        ]);
      } catch (error) {
        console.log("Error create room: " + error);
      }
    }

    return (
      <View p={10}>
        <Box width="100%">
          <Text fontWeight="bold" fontSize="$xl">Create group</Text>
          
          <View>
            <TextInput 
              placeholder='Input group name...'
              value={nameGroup}
              onChangeText={setNameGroup}
            />
          </View>

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
            
              <Text fontWeight='bold'>Select friends to add to new group</Text>
            </HStack>
          </Box>

          <Box>
            <FlatList
              data={friends}
              keyExtractor={item => item._id}
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
                        onValueChange={() => handleCheckboxChange(index, item.phoneNumber)}
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