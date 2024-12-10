import React from 'react';
import { Button } from 'react-native-paper';

interface SubmitButtonProps {
  onPress: () => void;
  title: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, title }) => {
  return <Button mode="contained" onPress={onPress}>{title}</Button>
};
