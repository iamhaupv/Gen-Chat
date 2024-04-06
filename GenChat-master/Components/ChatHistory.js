import { TextInput, ScrollView, View, Pressable, Text, Modal } from "react-native";
import { collection, getDocs, doc } from "firebase/firestore";
import config from "../firebase/config.js";
import ChatUser from "./ChatUser";
import React, { useState } from "react";
import findUserByPhoneNumber from "../services/findUserByPhoneNumber.js";

import GlobalStyle from "../GlobalStyle.js";


export default function ChatHistory({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");

  const styles = GlobalStyle();

  const findUser = async () => {
    let user;

    try {
      user = await findUserByPhoneNumber(phoneNumber);
      
      console.log(user.data);
    } catch (error) {
      user = null;

      console.error("Error error:", error);
    }

    navigation.navigate("FindingUser", {user})
  };

  return (
    <ScrollView>
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
            style={{
              backgroundColor: "#eeeeee",
              padding: 10,
              flex: 4, 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
            value={phoneNumber}
            placeholder="Find new friend here"
            onChangeText={onChangePhoneNumber}
          >

          </TextInput>
          <Pressable onPress={findUser}>
            <Text>Find</Text>
          </Pressable>
        </View>

        <View>
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
          <ChatUser navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}
