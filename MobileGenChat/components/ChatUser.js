import React, { useEffect, useState } from 'react'
import { Text, View } from '@gluestack-ui/themed';

import getInfor from '../services/getInfor';

export default function ChatUser({data}) {
  const [userName, setUserName] = useState(null);
  
  const getUser = async () => {
    const user = await getInfor( data.sender );
    setUserName( user.data.name );
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{
      alignSelf: 'flex-end'
    }}>
      <Text style={{
        padding: 10
      }}>{userName}</Text>

      <Text style={{
        width: "auto", 
        marginRight: 10, 
        padding: 10, 
        color: "white", 
        backgroundColor: "blue", 
        borderRadius: 10
      }}>{data.content}</Text>

      <Text style={{
        padding: 10, 
        fontSize: 10
      }}>{data.date}</Text>
    </View>
  )
}
