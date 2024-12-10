import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { UserList } from '../components/organisms/UserList';
import { User } from '../../core/models/User';
import { GetUsersUseCase } from '../../domain/usecases/GetUsersUseCase';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

export const UserListScreen: React.FC = ({ route, navigation }) => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const userRepository = new UserRepositoryImpl();
      const getUsersUseCase = new GetUsersUseCase(userRepository);
      const userList = await getUsersUseCase.execute();
      // console.log('🚀 ~ fetchUsers ~ userList:', userList);

      setUsers(userList);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (userId: number) => {
    navigation.navigate('UserDetail', { userId, onRefresh: fetchUsers })
  };

  const handleAddUser = () => {
    navigation.navigate('CreateUser', { onRefresh: fetchUsers })
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <UserList users={users} onSelectUser={handleUserSelect} />
      </ScrollView>

      <FAB
        style={styles.fab}
        label="Agregar cliente"
        onPress={handleAddUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
