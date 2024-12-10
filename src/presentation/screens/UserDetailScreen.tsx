import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, BackHandler, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';
import { GetUserUseCase } from '../../domain/usecases/GetUserUseCase';
import { User } from '../../core/models/User';
import { RouteProp } from '@react-navigation/native';
import { DeleteUserUseCase } from '../../domain/usecases/DeleteUserUseCase';

type ParamList = {
  UserDetail: { userId: number, onRefresh: void };
};

type Props = {
  route: RouteProp<ParamList, 'UserDetail'>;
  navigation: any;
};

export const UserDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId, onRefresh } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldNotDelete, setShouldNotDelete] = useState(false)

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userRepository = new UserRepositoryImpl();
      const getUserUseCase = new GetUserUseCase(userRepository);
      const userData = await getUserUseCase.execute(userId);
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Error al obtener los datos del usuario.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      onRefresh()
      navigation.dispatch(e.data.action)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const deleteUser = async () => {
    try {
      setIsLoading(true);
      const userRepository = new UserRepositoryImpl();
      const deleteUserUseCase = new DeleteUserUseCase(userRepository);
      await deleteUserUseCase.execute(userId);
      onRefresh()
      navigation.goBack()

    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Error al obtener los datos del usuario.');
    } finally {
      setIsLoading(false);
    }
  }

  const calculateAge = (birth_date: Date): number => {
    const today = new Date();
    const age = today.getFullYear() - birth_date.getFullYear();
    const monthDiff = today.getMonth() - birth_date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth_date.getDate())) {
      return age - 1;
    }
    return age;
};

const handleDeleteUser = () => {
    const birthDate = new Date(user?.birth_date);
    
    if (isNaN(birthDate.getTime())) {
      console.error("Fecha de nacimiento inválida");
      return;
    }

    const age = calculateAge(birthDate);

    if (age >= 80) {
      deleteUser();
      setShouldNotDelete(false);
    } else { 
      setShouldNotDelete(true);
    }
};


  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando usuario...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró información del usuario.</Text>
        <Button onPress={() => navigation.goBack()}>Volver</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Usuario</Text>

      <Text style={styles.detail}>{`Nombre: ${user.first_name}`}</Text>
      <Text style={styles.detail}>{`Apellido: ${user.last_name}`}</Text>
      <Text style={styles.detail}>{`DNI: ${user.dni}`}</Text>
      <Text style={styles.detail}>{`Celular: ${user.phone}`}</Text>
      <Text style={styles.detail}>{`Correo electrónico: ${user.email}`}</Text>
      <Text style={styles.detail}>{`Ciudad: ${user.city}`}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('EditUser', { user, onRefresh: fetchUser })}
        style={styles.button}
      >
        Editar
      </Button>
      <Button
        mode="contained"
        onPress={() => handleDeleteUser()}
        style={styles.button}
      >
        Eliminar
      </Button>
      {shouldNotDelete && ( <Text style={{ color: 'red' }}>No se puede eliminar este usuario</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});
