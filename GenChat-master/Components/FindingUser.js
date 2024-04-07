import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import GlobalStyle from "../GlobalStyle";
// import acceptFriend from "../services/acceptFriend";
import addRequestSend from "../services/addRequestSend";
import addRequestGet from "../services/addRequestGet";
export default function FindingUser({ navigation }) {
  const route = useRoute();
  const userSend = route.params?.userSend;
  const userGet = route.params?.userGet;
  console.log("Usser send FU ");
  console.log(userSend);
  console.log("Usser get FU ");
  console.log(userGet);

  const styles = GlobalStyle();

  const sendingFriendRequest = async () => {
    const phoneNumberUserSend = userSend.phoneNumber;
    const phoneNumberUserGet = userGet.data.phoneNumber;

    console.log(phoneNumberUserSend);
    console.log(phoneNumberUserGet);
    try {
      await addRequestSend(phoneNumberUserGet, phoneNumberUserSend);
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
        <View style={[styles.container, styles.paddingSide]}>
          <View style={{
            flex: 1, 
            flexDirection: "row", 
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            <Image
              source={GlobalAsset.defaultLogoImage}
              style={{
                width: 100, 
                height: 100, 
                borderRadius: 50
              }}
            >

            </Image>

              <View style={{
                gap: 10
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {userGet.data.name}
              </Text>
              <Text style={{ fontSize: 20 }}>
                {userGet.data.phoneNumber} 
              </Text>      
            </View>
          </View>

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
