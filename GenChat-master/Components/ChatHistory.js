import { TextInput, ScrollView, View, Pressable, Text, Modal } from "react-native";
import { collection, getDocs, doc } from "firebase/firestore";
import config from "../firebase/config.js";
import ChatUser from "./ChatUser";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import findUserByPhoneNumber from "../services/findUserByPhoneNumber.js";

import GlobalStyle from "../GlobalStyle.js";


export default function ChatHistory({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");

  const styles = GlobalStyle();

  const route = useRoute();
  const userSend = route.params?.user;
  console.log("User send");
  console.log(userSend);

  const findUser = async () => {
    let userGet;

    try {
      userGet = await findUserByPhoneNumber(phoneNumber);      
    } catch (error) {
      userGet = null;
      console.error("Error error:", error);
    }

    navigation.navigate("FindingUser", {userSend: userSend, userGet: userGet})
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
          <Pressable onPress={findUser} style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Text>Find</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("ListRequest")} style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Text>List Request</Text>
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
