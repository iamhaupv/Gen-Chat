import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import React from "react";
import GlobalStyle from "../GlobalStyle";
import addFriendUser from "../services/addFriendUser";
import addRequestSend from "../services/addRequestSend";
import addRequestGet from "../services/addRequestGet";
export default function FindingUser({ navigation }) {
  const route = useRoute();
  const userSend = route.params?.userSend;
  const userGet = route.params?.userGet;
  console.log(userSend);
  console.log(userGet);

  const styles = GlobalStyle();

  const sendingFriendRequest = async () => {
    const phoneNumberUserSend = userSend.phoneNumber;
    const phoneNumberUserGet = userGet.data.phoneNumber;
    try {
      await addRequestSend(phoneNumberUserSend, phoneNumberUserGet);
      await addRequestGet(phoneNumberUserGet, phoneNumberUserSend);
      alert("Send Friend Request Successfully!")
      navigation.navigate("ChatHistory")
    } catch (error) {
      alert("Send Friend Request Failed!")
      console.error("Registration error:", error);
    }
  }

  return (
    <View>
      {userGet == null ? (
        <View style={[styles.container]}>
          <Text>No user Exist</Text>
        </View>
      ) : (
        <View style={[styles.container]}>
          <Text style={{ fontSize: 20 }}>Name: {userGet.data.name}</Text>
          <Text style={{ fontSize: 20 }}>
            Phone Number: {userGet.data.phoneNumber}
          </Text>

          <Pressable style={styles.btnSubmitWrapper} 
            onPress={sendingFriendRequest}
          >
            <Text style={styles.btnSubmit}>Send Friend Request</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
