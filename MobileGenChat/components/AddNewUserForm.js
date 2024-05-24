import React, { useEffect, useRef, useState } from 'react'
import { TouchableHighlight, Alert } from 'react-native'
import { View, Box, FlatList, HStack, VStack, Text, Avatar, AvatarFallbackText, Icon, Button } from '@gluestack-ui/themed';
import { ArrowLeft, UserPlus } from 'lucide-react-native';

import getInfor from '../services/getInfor';
import getListFriend from '../services/getListFriend';
import CheckBox from '@react-native-community/checkbox';

import {socket} from '../utils/socket';
import findUserByPhoneNumber from '../services/findUserByPhoneNumber';

export default function AddNewUserForm({route, navigation}) {
  const [friends, setFriends] = useState([]);
  const [checkboxes, setCheckboxes] = useState(friends.map(() => false));

  const arrUserId = useRef([]).current;

  const userRoot = route.params.userRoot;
  const room = route.params.room;

  const getListFriends = async () => { 
    const listFriend = await getListFriend(userRoot.phoneNumber);

    const temp_friends = [];

    for (let i = 0; i < listFriend.data.length; i++) {
      const friend = await getInfor( listFriend.data[i].friend_id );

      if ( room.user.indexOf(friend.data.phoneNumber) == -1 )
        temp_friends.push(friend.data);
    }

    setFriends(temp_friends);
  }

  const createAddedFriendSuccessfullyAlert = () =>
    Alert.alert('Alert Title', 'Add users Successfully!', [
      { 
        text: 'OK', 
        onPress: () => console.log('OK Pressed')
      },
    ]);

  const handleCheckboxChange = (index, id) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);

    if (updatedCheckboxes[index] == true)
      arrUserId.push(id);
    else
      arrUserId.splice(id, 1);
  };

  const handleAddNewUser = async () => {
    console.log("arrUserId");
    console.log(room);

    let checkedUsersObject = [];

    for (let i = 0; i < arrUserId.length; i++) {
      const userObj = await findUserByPhoneNumber(arrUserId[i]);
      checkedUsersObject.push(userObj.data);
    }

    socket.emit("add-new-user", {
      id: room.id, 
      user: room.user, 
      admin: room.admin, 
      remainingUser: arrUserId, 
      remainingUserPhoneNumber: checkedUsersObject
    });

    createAddedFriendSuccessfullyAlert();
  }

  useEffect(() => {
    getListFriends();
  }, [])

  return (
    <View height="100%" p={10}>
      <View flexDirection='row' alignItems='center' gap={10}>
        <ArrowLeft
          size={30}
          strokeWidth={2}
          color="blue"
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Text flex={1} size="xl" bold={true}>
          Group information
        </Text>
      </View>
        
      <Box py="$">
        <FlatList
          data={friends}
          keyExtractor={item => item._id}
          renderItem={({ index, item }) => (
            <TouchableHighlight key={index}>
              <Box
                borderBottomWidth="$1"
                borderColor="#dddddd"
                $dark-borderColor="$coolGray800"
                $sm-pl="$4"
                $sm-pr="$4"
                p={10}
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

      <Button backgroundColor='green' p={2} onPress={handleAddNewUser}>
        <Text color='white'>Add new users</Text>
      </Button>
    </View>
  )
}
