import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallbackText, Button, ButtonGroup, ButtonText, HStack, Text, View, } from '@gluestack-ui/themed';

import getInfor from '../services/getInfor';
import { EllipsisVertical, Navigation } from 'lucide-react-native';
import {socket} from '../utils/socket';

export default function ChatUser({data, navigation}) {
  const [userName, setUserName] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  
  const getUser = async () => {
    const user = await getInfor( data.sender );
    setUserName( user.data.name );
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleForward = () => {
    navigation.navigate("Forward Message", {data: data})

    setIsOpen(!isOpen);
  }
  const handleRemove = () => {
    socket.emit('remove-message', {
      idMessageToRemove: data.idMessage, 
      idRoom: data.idRoom, 
      sender: data.sender,
      receiver: data.receiver,
    });

    setIsOpen(!isOpen);
  }
  const handleDelete = () => {
    socket.emit('delete-message', {
      idMessageToDelete: data.idMessage, 
      idRoom: data.idRoom, 
      sender: data.sender,
      receiver: data.receiver,
    });

    setIsOpen(!isOpen);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (data.status != "deleted")
    return (
      <View style={{
        alignSelf: 'flex-end'
      }}>
        {/* <Avatar size="md" alignSelf='flex-end'>
          <AvatarFallbackText>{userName}</AvatarFallbackText>
        </Avatar> */}

        <Text style={{
          padding: 10, 
          alignSelf: "flex-end"
        }}>{userName}</Text>
  
        <HStack alignItems='center' justifyContent='flex-end'>
          <EllipsisVertical color="gray" onPress={handleOpen}/>
          
          {
            data.status == "removed" ? 
              <Text style={{
                width: "auto", 
                marginRight: 10, 
                padding: 10, 
                color: "white", 
                backgroundColor: "blue", 
                borderRadius: 10
              }}>
                This message had been removed
              </Text> :
              <Text style={{
                width: "auto", 
                marginRight: 10, 
                padding: 10, 
                color: "white", 
                backgroundColor: "blue", 
                borderRadius: 10
              }}>
                {data.content}
              </Text>
          }
  
        </HStack>
  
        <Text style={{
          padding: 10, 
          fontSize: 10, 
          alignSelf: "flex-end"
        }}>
          {data.date}
        </Text>
  
        <ButtonGroup display={isOpen ? "flex" : "none"} flexDirection='column' gap={0}>
          <Button borderRadius={0} bgColor='#eeeeee' onPress={handleForward}>
            <ButtonText color='#000000'>Forward</ButtonText>
          </Button>
          <Button borderRadius={0} bgColor='#eeeeee' onPress={handleRemove}>
            <ButtonText color='#000000'>Remove</ButtonText>
          </Button>
          <Button borderRadius={0} bgColor='#eeeeee' onPress={handleDelete}>
            <ButtonText color='#000000'>Delete</ButtonText>
          </Button>
        </ButtonGroup>
      </View>
    )
  else
    <></>
}
