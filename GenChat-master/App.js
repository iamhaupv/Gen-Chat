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
      <Stack.Navigator>
        {
          routes.map(({ component: Component, path, name: name, ...rest }) => {
            
            return <Stack.Screen key={path} name={name} component={Component} {...rest} />
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}