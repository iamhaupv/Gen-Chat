import React, { useEffect, useState } from 'react'
import { Icon, Button, View, Text, Avatar, AvatarFallbackText, Box, FlatList, VStack } from '@gluestack-ui/themed';
import { ArrowLeft, X } from 'lucide-react-native';
import { HStack } from '@gluestack-ui/themed';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';
// import {  } from '@gluestack-ui/themed';

export default function GroupInfo({route, navigation}) {
  const [friends, setFriends] = useState([]);

  const userRoot = route.params.userRoot;
  const room = route.params.room;

  // console.log("User root in grp info");
  // console.log(userRoot);
  // console.log("Room in grp info");
  // console.log(room);

  const getListFriends = async () => { 
    const temp_friends = [];
    
    const admin = await getInfor( room.admin );

    temp_friends.push(admin.data);

    for (let i = 0; i < room.user.length; i++) {
      const friend = await getInfor( room.user[i] );
      temp_friends.push(friend.data);
    }

    setFriends(temp_friends);
  }

  const handleRemoveUser = () => {

  }

  const handleRemoveGroup = () => {

  }

  useEffect(() => {
    getListFriends();
  }, []);

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
            <Box
              borderBottomWidth="$1"
              borderColor="#dddddd"
              $dark-borderColor="$coolGray800"
              $sm-pl="$4"
              $sm-pr="$4"
              p={10}
              key={index}
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
                  onPress={() => handleRemoveUser(item.phoneNumber)}
                >
                  <Icon as={X} size='30' color="red"/>
                </Button>
              </HStack>
            </Box>
          )}
        />
      </Box>

      <Box>
        <HStack gap={10} justifyContent='center'>
          <Button backgroundColor='green' onPress={() => {navigation.navigate("Add new user form", {userRoot, room})}}>
            <Text color='white' fontWeight='bold'>Add user</Text>
          </Button>
          <Button backgroundColor='red' onPress={handleRemoveGroup}>
            <Text color='white' fontWeight='bold'>Remove group</Text>
          </Button>
        </HStack>
      </Box>
    </View>
  )
}
