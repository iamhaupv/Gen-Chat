import { InputField } from '@gluestack-ui/themed';
import { InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Text, Avatar, AvatarImage, Input, AvatarFallbackText, AvatarBadge } from '@gluestack-ui/themed';
import { ArrowLeft, Info, Phone, SearchIcon, Send } from 'lucide-react-native';
import React from 'react'
import { ScrollView } from 'react-native';
import {View} from 'react-native';
import ChatUser from './ChatUser';
import ChatData from './ChatData';

export default function Chat({route, navigation}) {
    const user = route.params.user;

    console.log("user");
    console.log(user);

    return (
        <View style={{
            height: "100%"
        }}>
            <View style={{
                padding: 10, 
                flexDirection: "row", 
                alignItems: "center", 
                gap: 10
            }}>
                <ArrowLeft size={30} strokeWidth={2} color="blue" onPress={() => {navigation.goBack()}} style={{padding: 10}}/>

                <Avatar size="md">
                  <AvatarFallbackText>{user.name}</AvatarFallbackText>
                </Avatar>
                
                <Text flex={1} size="xl" bold={true}>{user.name}</Text>

                <Phone size={30} strokeWidth={2} color="blue" onPress={() => {navigation.goBack()}} style={{padding: 10}}/>

                <Info size={30} strokeWidth={2} color="blue" onPress={() => {navigation.goBack()}} style={{padding: 10}}/>
            </View>

            <ScrollView style={{
                flex: 1, 
                flexDirection: "column"
            }}>
                <ChatUser data={{content: "Xin chao, khoa da den"}}/>
                <ChatData data={{content: "Toi muon mua khoa voi gia 2 cent"}}/>
                <ChatUser data={{content: "Toi muon mua khoa voi gia 2 cent"}}/>
                <ChatData data={{content: "Toi muon mua khoa voi gia 2 cent"}}/>
            </ScrollView>

            <View style={{
                flexDirection: "row", 
                alignItems: "center", 
                padding: 10, 
                gap: 10
            }}>
                <Input size='xl' flex={1}>
                    <InputSlot pl='$3'>
                    </InputSlot>
                    <InputField 
                        placeholder="Nhap tin nhan..."
                    />
                </Input>

                <Send size={30} strokeWidth={2} color="blue" onPress={() => {navigation.goBack()}} style={{padding: 10}}/>
                
            </View>
        </View>
    )
}