import { selector } from 'recoil';
import authState from './authState';

export interface IUserProfile {
  email: string | null,
  dob: string | null,
}

const userProfile = selector({
  key: 'userProfile',
  get: ({get}) => {
    const state = get(authState);    
    return {
      email: state.user?.email,
      dob: state.user?.dob,
    }
  },  
});

export default userProfile;
