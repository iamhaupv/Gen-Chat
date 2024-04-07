import React from 'react'
import { useRoute } from "@react-navigation/native";
import { TextInput, ScrollView, Text, View, Image, Pressable } from 'react-native'
import GlobalAsset from "../GlobalAsset.js";
import GlobalStyle from '../GlobalStyle.js';

export default function ReceivedFriendRequestUser({ navigation, user }) {
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
        {/* <Text style={{}}>Accept Friend?</Text> */}
        
        <Pressable>
          <Image
            source={GlobalAsset.acceptIcon}
            style={{
              width: 30, 
              height: 30, 
            }}
          >
          </Image>
        </Pressable>
        <Pressable>
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