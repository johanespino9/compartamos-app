import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../core/models/User';
import { GetUsersUseCase } from '../../domain/usecases/GetUsersUseCase';
import { GetUserUseCase } from '../../domain/usecases/GetUserUseCase';
import { CreateUserUseCase } from '../../domain/usecases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../domain/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../domain/usecases/DeleteUserUseCase';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

interface UserContextProps {
  users: User[];
  selectedUser?: User;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (id: number, user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const userRepository = new UserRepositoryImpl();
  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUserUseCase = new GetUserUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  const fetchUsers = async () => {
    const userList = await getUsersUseCase.execute();
    setUsers(userList);
  };

  const fetchUser = async (id: number) => {
    const user = await getUserUseCase.execute(id);
    setSelectedUser(user);
  };

  const createUser = async (user: User) => {
    await createUserUseCase.execute(user);
    await fetchUsers();
  };

  const updateUser = async (id: number, user: User) => {
    await updateUserUseCase.execute(id, user);
    await fetchUsers(); 
  };

  const deleteUser = async (id: number) => {
    await deleteUserUseCase.execute(id);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
