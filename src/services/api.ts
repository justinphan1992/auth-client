import axiosInstance from '../axiosInstance';
import { User, UserRegister } from '../types';
interface LoginRequest {
  username: string,
  password: string,
}

interface LoginResponse {
  access_token: string,
  token_type: string,
  expires_in: string,
  user: User
}

interface UpdateProfileRequest {
  dob: string,
  email: string,
}

const Api = {
  login: (formData : LoginRequest): Promise<LoginResponse> => {
    return axiosInstance.post('/auth/login', formData)
  },
  logout: () => {
    return axiosInstance.post('/auth/logout')
  },
  register: (formData: UserRegister): Promise<User> => {    
    return axiosInstance.post('/auth/register', formData);
  },
  getUser: (): Promise<User> => {
    return axiosInstance.get('/auth/user-profile')
  },
  updateUser: (formData: UpdateProfileRequest): Promise<User> => {
    return axiosInstance.put('/auth/user-profile', formData)
  }
}

export default Api;
