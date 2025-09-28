import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Providers (se não estiver usando, pode remover estas duas linhas)
import { ThemeProvider } from './src/Theme/ThemeProvider';
import { AuthProvider } from './src/Context/AuthContext';

// Usa o seu stack centralizado em src/routes/index.js
import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
