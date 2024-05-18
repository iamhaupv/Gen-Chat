import {
  View, 
  InputField, 
  InputSlot, 
  Text,
  Avatar,
  Input,
  AvatarFallbackText,
} from '@gluestack-ui/themed';
import {ArrowLeft, Info, Phone, Send} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {ScrollView} from 'react-native';
import ChatUser from './ChatUser';
import ChatData from './ChatData';
import {socket} from '../utils/socket';
import Notification from './Notification';

export default function Chat({route, navigation}) {  
  // This variable use for socket
  const [messages, setMessages] = useState([]);

  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(!showActionsheet)

  // This variable use for input
  const [message, setMessage] = useState('');

  const userRoot = route.params.userRoot;
  const receiver = route.params.receiver;

  const idRoom = userRoot.listFriend.find(elem => elem.friend_id == receiver.phoneNumber).room_id;

  useEffect(() => {
    if (idRoom) {
      socket.emit('join', idRoom);
      socket.emit("init-chat-message", idRoom);
    }
  }, [idRoom]);

  const sendMessage = msg => {
    let content = message;
    let userID = userRoot.phoneNumber;
    let receiverID = receiver.phoneNumber;
    let type = 'text';
    
    socket.emit('chat-message', {
      type: "text", 
      idMessage: "mess" + new Date().valueOf(), 
      date: new Date().toLocaleString(), 
      idRoom, 
      sender: userID,
      sender_name: userRoot.name,
      receiver: receiverID,
      content: content,
      chat_type: type,
      status: "ready"
    });
  };

  useEffect(() => {
    socket.emit("init-room", userRoot.phoneNumber);

    socket.on('chat-message-2', msg => {
      setMessages(msg);
    });

    socket.on("rooms", msg => {
      setMessages(msg);
    })

    return () => {
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
  }, []);

  return (
    <View p={10} height="100%">
      <View flexDirection='row' alignItems='center' gap={10}>
        <ArrowLeft
          size={30}
          strokeWidth={2}
          color="blue"
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Avatar size="md">
          <AvatarFallbackText>{receiver.name}</AvatarFallbackText>
        </Avatar>

        <Text flex={1} size="xl" bold={true}>
          {receiver.name}
        </Text>

        <Phone
          size={30}
          strokeWidth={2}
          color="blue"
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 10}}
        />

        <Info
          size={30}
          strokeWidth={2}
          color="blue"
          onPress={() => {
            navigation.navigate("FriendProfile", {userRoot: userRoot, receiver: receiver})
          }}
          style={{padding: 10}}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {
          messages.map((msg, index) => {
            console.log("------- msg type");
            console.log(msg.type);
            if (msg.type != "notification") 
              if (msg.sender == userRoot.phoneNumber)
                return <ChatUser key={index} data={msg} navigation={navigation} />
              else
                return <ChatData key={index} data={msg} navigation={navigation} />
            else
              return <Notification key={index} data={msg} navigation={navigation} />
          })
        }
      </ScrollView>

      <View flexDirection='row' alignItems='center' gap={10}>
        <Input size="xl" flex={1}>
          <InputSlot pl="$3"></InputSlot>
          <InputField 
          value={message} 
          onChangeText={setMessage} 
          placeholder="Nhap tin nhan..." />
        </Input>

        <Send
          size={30}
          strokeWidth={2}
          color="blue"
          onPress={() => {sendMessage(message); setMessage('');}}
          style={{padding: 10}}
        />
      </View>
    </View>
  );
}
