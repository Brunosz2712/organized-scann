import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../Context/AuthContext';

// Telas
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import RegisteredMotorcycles from '../pages/RegisteredMotorcycles';
import RegisterMotorcycle from '../pages/RegisterMotorcycle';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user } = useAuth?.() || { user: null };

  return (
    <Stack.Navigator
      // Se tiver user, abre na lista; senão, no Welcome
      initialRouteName={user ? 'RegisteredMotorcycles' : 'Welcome'}
      screenOptions={{ headerShown: false }}
    >
      {/* Público */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />

      {/* Privado (mas registrado SEMPRE) */}
      <Stack.Screen name="RegisteredMotorcycles" component={RegisteredMotorcycles} />
      <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
    </Stack.Navigator>
  );
}
