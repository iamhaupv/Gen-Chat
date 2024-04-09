import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Main from './Pages/Main';

import routes from './Pages/routes';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen key="Home" name="Home" component={Home}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}