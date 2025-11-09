import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Welcome from '../pages/Welcome';
import RegisteredMotorcycles from '../pages/RegisteredMotorcycles';
import RegisterMotorcycle from '../pages/RegisterMotorcycle';
import Register from '../pages/Register';
import AboutApp from '../pages/AboutApp';

const Stack = createNativeStackNavigator();

function SignInRedirect() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.replace('Welcome');
  }, [navigation]);
  return null;
}

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="RegisteredMotorcycles" component={RegisteredMotorcycles} />
      <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      {/* blindagem: caso algo navegue para 'SignIn', redireciona */}
      <Stack.Screen name="SignIn" component={SignInRedirect} />
    </Stack.Navigator>
  );
}
