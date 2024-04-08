import React, { Component }  from 'react'
import { TextInput, ScrollView, View, Image, Text, Pressable, WebView } from 'react-native'
import Chat from './Chat'
import GlobalAsset from '../GlobalAsset'

export default function ChatUserDetail({ navigation }) {
  return (
    <View>
      <View
        style={{
          flex: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#eeeeee', 
          gap: 10, 
          padding: 10, 
        }}
      >
        <Image
          source={{
            uri: GlobalAsset.defaultLogoImage
          }}
          style={{
            width: 40, 
            borderRadius: 20, 
            aspectRatio: 1 / 1, 
          }}
        >
        </Image>

        <Text style={{fontWeight: 'bold'}}>Nguyen Thanh Khoa</Text>
      </View>

      <View style={{height: 360}}>
        <ScrollView contentContainerStyle={{  }}>
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
          <Chat navigation={navigation} isSender={true} />
          <Chat navigation={navigation} isSender={false} />
        </ScrollView>
      </View>

      <View style={{
        flexDirection: 'row', 
        alignItems: 'center'
      }}>
        <TextInput
          style={{
            backgroundColor: "#ffffff", 
            padding: 10, 
            flexGrow: 1
          }}
          placeholder='Message...'
        >
        </TextInput>
        <Pressable
          style={{
            justifyContent: 'center',
            flexGrow: 0, 
            flexDirection: 'row', 
            gap: 20, 
            padding: 10, 
          }}
        >
          <Image
            source={GlobalAsset.paperClipIcon}
            style={{
              width: 25, 
              height: 25, 
            }}
          >
          </Image>
          <Image
            source={GlobalAsset.sendIcon}
            style={{
              width: 25, 
              height: 25, 
            }}
          >
          </Image>
        </Pressable>
      </View>
    </View>
  )
}