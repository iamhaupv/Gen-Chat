import { Box, Text, Avatar, AvatarFallbackText, VStack, ImageBackground } from '@gluestack-ui/themed';
import React from 'react'
import { View } from 'react-native'

export default function Profile({user, navigation}) {
  return (
    <View>
      <Box width="100%">
        <VStack style={{
          alignItems: "center"
        }}>
          <ImageBackground
            source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", height: 250, width: "100%", alignItems: "center" }}
          >
            <Avatar size='xl' style={{
              top: 250
            }}>
              <AvatarFallbackText>{user.name}</AvatarFallbackText>
            </Avatar>

          </ImageBackground>
          <Text fontSize="$xl" fontWeight='bold' lineHeight={650} textAlign='center'>
            {user.name}
          </Text>
        </VStack>
      </Box>
    </View>
  )
}
