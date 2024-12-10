import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserListScreen } from './src/presentation/screens/UserListScreen';
import { UserDetailScreen } from './src/presentation/screens/UserDetailScreen';
import { UserFormScreen } from './src/presentation/screens/UserFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Gestión de clientes', headerShown: true }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ title: 'Información del cliente', headerShown: true }}
        />
        <Stack.Screen
          name="EditUser"
          component={UserFormScreen}
          options={{ title: 'Editar cliente', headerShown: true }}
        />
        <Stack.Screen
          name="CreateUser"
          component={UserFormScreen}
          options={{ title: 'Crear Cliente', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
