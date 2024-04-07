import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from "@react-navigation/native";
import ChatUserDetail from './ChatUserDetail';
import ChatHistory from './ChatHistory';
import FindingUser from './FindingUser';
import SentFriendRequest from './SentFriendRequest';
import ReceivedFriendRequest from './ReceivedFriendRequest';

export default function ChatContainer() {
  const route = useRoute();
  const user = route.params?.user;

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen key="ChatHistory" name="ChatHistory" component={ChatHistory} initialParams={{ user: user.data }}/>
      <Stack.Screen key="ChatUserDetail" name="ChatUserDetail" component={ChatUserDetail} />
      <Stack.Screen key="FindingUser" name="FindingUser" component={FindingUser} />
      <Stack.Screen key="SentFriendRequest" name="SentFriendRequest" component={SentFriendRequest} />
      <Stack.Screen key="ReceivedFriendRequest" name="ReceivedFriendRequest" component={ReceivedFriendRequest} />
    </Stack.Navigator>
  );
}