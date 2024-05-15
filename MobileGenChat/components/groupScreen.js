import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState, useRef } from 'react'
import { Text, TextInput, Button, View } from "react-native";
import { Box, HStack } from '@gluestack-ui/themed';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';

import {socket} from '../utils/socket';

export default GroupScreen = ({ user, navigation }) => {
    // const [data, setData] = useState([]);
    const [nameGroup, setNameGroup] = useState("");
    const [friends, setFriends] = useState([]);
    const [checkboxes, setCheckboxes] = useState(friends.map(() => false));
    const [checkedFriends, setCheckedFriends] = useState([]);

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

      if (updatedCheckboxes[index] == true) {
        // setCheckedFriends(elem => [...elem, id]);
        arrUserId.push(id);
      } else {
        arrUserId.splice(id, 1)
      }
      console.log(arrUserId);
    };

    const createGroup = async () => {
      // Process Create Group
      // try {
      //   const response = await fetch("http://localhost:5821/createGroup", {
      //       method: "POST", // or 'PUT'
      //       headers: {
      //           "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //           name: nameGroup,
      //           members: arrUserId
      //       })
      //   });
      // } catch (error) {
      //   console.error("Error:", error);
      // }

      console.log("Information about group: ");
      console.log("Name: " + arrUserId);
      // console.log("Number Of Members: " + arrUserId.length);

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
        // alert("Create room successfully!");
        socket.emit("init-room", user.phoneNumber);
      } catch (error) {
        console.log("Error create room: " + error);
      }
    }

    const cancelCreateGroup = () => {
      navigation.navigate({
        name: 'home'
      })
    }
    return (
      <View>
        <Box width="100%">
          <TextInput placeholder='Input your name group'
              value={nameGroup}
              onChangeText={setNameGroup} />
              {
                friends.map((item, index) => (
                <View key={index}>
                  <HStack space='md'>
                    <CheckBox
                      value={checkboxes[index]}
                      onValueChange={() => handleCheckboxChange(index, item.phoneNumber)}
                    />
                    <Text >{item.name}</Text>
                  </HStack>
                </View>
              ))}
          <Button title='Create group' onPress={createGroup} />
        </Box>
      </View>
    )
}