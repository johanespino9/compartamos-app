import { User } from '../../core/models/User';
import { apiManager } from './ApiManager';

export const UserDataSource = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiManager.get('/users');  
      console.log("🚀 ~ getUsers ~ response:", response)
      return response.data;
    } catch (error) {
      console.log("🚀 ~ getUsers ~ error:", error)
      throw error
    }
  },

  async getUser(id: number): Promise<User> {
    const response = await apiManager.get(`/users/${id}`);
    return response.data;
  },

  async createUser(user: User): Promise<void> {
    await apiManager.post('/users', user);
  },

  async updateUser(id: number, user: User): Promise<void> {
    await apiManager.put(`/users/${id}`, user);
  },

  async deleteUser(id: number): Promise<void> {
    await apiManager.delete(`/users/${id}`);
  }
};
