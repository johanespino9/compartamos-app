import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { User } from '../../../core/models/User';

interface UserListProps {
  users: User[];
  onSelectUser: (id: number) => void;
}

export const UserList = ({ users, onSelectUser } : UserListProps ) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => `${item.ID}`}
      renderItem={({ item }) => (
        <List.Item
          title={`${item.first_name} ${item.last_name}`}
          description={item.email}
          onPress={() => onSelectUser(item.ID)}
        />
      )}
    />
  );
};
