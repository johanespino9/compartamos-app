import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useUserContext } from '../state/UserContext';

export const SampleScreen: React.FC = ({ route, navigation }) => {
  const { userId } = route.params;

  return (
    <View>
      <Text>Detalle del Usuario</Text>
      <Button onPress={() => navigation.navigate('EditUser', { userId })}>Edit</Button>
    </View>
  );
};
