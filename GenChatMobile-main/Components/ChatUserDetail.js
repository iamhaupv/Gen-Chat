import React from 'react'
import { TextInput, ScrollView, View, Image, Text, Pressable } from 'react-native'
import Chat from './Chat'

export default function ChatUserDetail({ navigation }) {
  return (
    <View>
      <View
        style={{
          flex: 1, 
          flexDirection: 'row', 
          alignItems: 'center', 
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

        <Text>Nguyen Thanh Khoa</Text>
      </View>

      <View style={{height: 370}}>
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
            padding: 10, 
            backgroundColor: "#ffffff", 
            flexGrow: 3
          }}
          placeholder='Message...'
        >
        </TextInput>
        <Pressable
          style={{
            flexGrow: 1, 
            justifyContent: 'center'
          }}
        >
          <Text>Send</Text>
        </Pressable>
      </View>
    </View>
  )
}
