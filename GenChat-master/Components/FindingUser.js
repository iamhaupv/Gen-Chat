import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import GlobalStyle from "../GlobalStyle";

export default function FindingUser({ navigation }) {
  const route = useRoute();
  const user = route.params?.user;

  const styles = GlobalStyle();

  const addFriend = () => {
    
  }

  return (
    <View>
      {user == null ? 
        
        <View style={[
          styles.container
        ]}>
          <Text>No user Exist</Text> 
        </View>
        
        :
        
        <View style={[
          styles.container
        ]}>
          <Text style={{fontSize: 20}}>Name: {user.data.name}</Text>
          <Text style={{fontSize: 20}}>Phone Number: {user.data.phoneNumber}</Text>

          <Pressable
          style={styles.btnSubmitWrapper}
            onPress={addFriend}
          >
            <Text style={styles.btnSubmit}>Add Friend</Text>
          </Pressable>
        </View>
      }
    </View>
  )
}
