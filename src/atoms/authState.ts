import { atom } from 'recoil';
import { User } from '../types'

export interface AuthState {
  isAuthenticating: boolean,
  isAuthenticated: boolean,
  user: null | User,
}

const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticating: true,
    isAuthenticated: false,
    user: null
  }, 
})

export default authState;

