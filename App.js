import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/pages/Welcome';
import SignIn from './src/pages/SignIn';
import RegisterMotorcycle from './src/pages/RegisterMotorcycle';
import RegisteredMotorcycles from './src/pages/RegisteredMotorcycles';
import Register from './src/pages/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
        <Stack.Screen name="RegisteredMotorcycles" component={RegisteredMotorcycles} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
