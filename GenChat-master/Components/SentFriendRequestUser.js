import React from 'react'
import { TextInput, ScrollView, Text, View, Image, Pressable } from 'react-native'
import GlobalAsset from "../GlobalAsset.js";
import GlobalStyle from '../GlobalStyle.js';

export default function SentFriendRequestUser({ navigation }) {
  const styles = GlobalStyle();

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
          <Text style={{fontWeight: 'bold'}}>Nguyen Thanh Khoa</Text>
          <Text>0374858237</Text>
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