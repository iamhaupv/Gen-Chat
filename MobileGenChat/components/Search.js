import React, { useContext, useEffect, useState } from 'react'
import { TouchableHighlight,View } from 'react-native'
import { Input, InputSlot, InputField, InputIcon, SearchIcon, Box, FlatList, HStack, VStack, Text, Heading, Avatar, AvatarImage, Fab, FabIcon, AddIcon, AvatarFallbackText, AvatarBadge,Modal,ModalBackdrop,ModalContent,ModalHeader,ModalBody,ModalFooter,ModalCloseButton,Icon,ClockIcon,ImageBackground,ButtonText,Button } from '@gluestack-ui/themed';

import getListFriend from '../services/getListFriend';
import getInfor from '../services/getInfor';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function Search({route}) {
    const [showModal, setShowModal] = useState(false)

    const user = route.params.user;
    console.log("Search user")
    console.log(user)

    const ref = React.useRef(null)
    const [friends,setFriends] = useState(null)

    useEffect(() => {
        getListFriends();
    }, [])

    const getListFriends = async () => {
        const listFriend = await getListFriend(user.phoneNumber);
        const temp_friends = [];
    
        for (let i = 0; i < listFriend.data.length; i++) {
          const friend = await getInfor( listFriend.data[i].friend_id );
          temp_friends.push(friend.data);
        }
    
        setFriends(temp_friends);
      }

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
          keyExtractor={item => item.id}
          renderItem={({ index, item }) => (
            
              <Box
                borderBottomWidth="$1"
                borderColor="#dddddd"
                $dark-borderColor="$coolGray800"
                $base-pl="$3"
                $base-pr="$3"
                $sm-pl="$4"
                $sm-pr="$4"
                py="$2"
                onPress = {() => setShowModal(true)} ref={ref}
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
                    
                  </VStack>
                  
                  
                </HStack>
              </Box>
           
          )}
        />
        </Box>
        
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg" style={{alignItems:"center"}}>Profile</Heading>
            <ModalCloseButton>
              {/* <Icon as={CloseIcon} /> */}
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
          <VStack style={{
          alignItems: "center"
        }}>
          <ImageBackground
            source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", height: 250, width: "100%", alignItems: "center" }}
          >
            <Avatar size='xl' style={{
              top: 250
            }}>
              <AvatarFallbackText>Thanh Khoa</AvatarFallbackText>
            </Avatar>

          </ImageBackground>
          <Text fontSize="$xl" fontWeight='bold' lineHeight={650} textAlign='center'>Nguyen Thanh Khoa</Text>
        </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Accept</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </View>
  )
}
