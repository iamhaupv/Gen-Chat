import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHistory from './ChatHistory';
import ChatUserDetail from './ChatUserDetail';
import FindingUser from './FindingUser';

export default function ChatContainer() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen key="ChatHistory" name="ChatHistory" component={ChatHistory} />
      <Stack.Screen key="ChatUserDetail" name="ChatUserDetail" component={ChatUserDetail} />
      <Stack.Screen key="FindingUser" name="FindingUser" component={FindingUser} />
    </Stack.Navigator>
  );
}