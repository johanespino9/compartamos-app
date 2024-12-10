import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { User } from '../../core/models/User';
import { UserForm } from '../components/molecules/UserForm';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';
import { DeleteUserUseCase } from '../../domain/usecases/DeleteUserUseCase';
import { CreateUserUseCase } from '../../domain/usecases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../domain/usecases/UpdateUserUseCase';

type ParamList = {
  UserForm: { user?: User, onRefresh: void };
};

type Props = {
  route: RouteProp<ParamList, 'UserForm'>;
  navigation: any;
};

export const UserFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user: userData, onRefresh } = route.params || {};
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ userData:", userData)
    if (userData) {

      setUser(userData);
    }
  }, [userData]);

  const createUser = async (formData: User) => {
    try {
      setIsLoading(true);
      const userRepository = new UserRepositoryImpl();
      const createUserUseCase = new CreateUserUseCase(userRepository);
      await createUserUseCase.execute(formData);
      onRefresh()
      navigation.goBack()

    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Error al obtener los datos del usuario.');
    } finally {
      setIsLoading(false);
    }
  }

  const updateUser = async (formData: User) => {
    try {
      setIsLoading(true);
      const userRepository = new UserRepositoryImpl();
      const updateUserUseCase = new UpdateUserUseCase(userRepository);
      await updateUserUseCase.execute(formData);
      onRefresh()
      navigation.goBack()

    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Error al obtener los datos del usuario.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (formData: User) => {
    if (user.ID) {
      console.log('Updating user:', formData);
      const updatedUser = updateUser(formData)
    } else {
      console.log('Creating user:', formData);
      const createdUser = createUser(formData)
    }
  };

  return (
    <ScrollView>
      <View style={{ margin: 16 }}>

        <UserForm initialData={userData} onSubmit={handleSubmit}></UserForm>
      </View>
    </ScrollView>
  );
};
