import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Login from '../pages/SignIn';
import Register from '../pages/Register';
import RegisterMotorcycle from '../pages/RegisterMotorcycle'; // ✅ Importa o novo componente
import RegisteredMotorcycles from '../pages/RegisteredMotorcycles'; // ✅ Importa a tela das motos cadastradas

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterMotorcycle"
                component={RegisterMotorcycle}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisteredMotorcycles"  // ✅ Adiciona a tela para motos cadastradas
                component={RegisteredMotorcycles}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
