import { View, Box, Text, Avatar, AvatarFallbackText, VStack, ImageBackground, Button } from '@gluestack-ui/themed';
import React from 'react'

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

          <View>
            <Text fontSize="$xl" fontWeight='bold' lineHeight={650} textAlign='center'>
              {user.name}
            </Text>

            <Button lineHeight={70} onPress={() => navigation.navigate("Main", {user: null})}>
              <Text>Log out</Text>
            </Button>
          </View>
        </VStack>
      </Box>
    </View>
  )
}
