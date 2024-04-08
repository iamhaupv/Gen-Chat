import React from 'react'
import { TextInput, ScrollView, Text, View, Image, Pressable } from 'react-native'
import GlobalAsset from "../GlobalAsset.js";
import GlobalStyle from '../GlobalStyle.js';
import removeRequestSend from '../services/removeRequestSend.js';
import removeRequestGet from '../services/removeRequestGet.js';

export default function SentFriendRequestUser({ navigation, user, userRoot }) {
  console.log(userRoot);
  const styles = GlobalStyle();

  const declineRequestSent = async () => {
    await removeRequestSend(user.phoneNumber, userRoot.phoneNumber);
    await removeRequestGet(userRoot.phoneNumber, user.phoneNumber);
    alert("Remove request sent Successfully!");
    navigation.navigate("ChatHistory");
  }

  return (
    <View
      style={{
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 10, 
        gap: 10, 
        margin: 10, 
        borderRadius: 5, 
        backgroundColor: '#dddddd'
      }}
    >
      <View style={{
        flexDirection: 'row', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        gap: 10
      }}>

        <Image
          source={{
            uri: GlobalAsset.defaultLogoImage
          }}
          style={{
            width: 60, 
            borderRadius: 30, 
            aspectRatio: 1 / 1, 
          }}
        >  
        </Image>

        <View
          style={{
            flex: 1, 
            alignContent: 'space-around', 
            justifyContent: 'space-around', 
            gap: 10
          }}
        >
          <Text style={{fontWeight: 'bold'}}>{user.name}</Text>
          <Text>{user.phoneNumber}</Text>
        </View>

      </View>

      <View style={{
        flexDirection: 'row', 
        flex: 0, 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        gap: 10
      }}>
        {/* <Text style={{}}>Remove Friend Request?</Text> */}
        
        <Pressable
          onPress={declineRequestSent}
        >
          <Image
            source={GlobalAsset.cancelIcon}
            style={{
              width: 30, 
              height: 30, 
            }}
          >
          </Image>
        </Pressable>
      </View>
    </View>
  )
}