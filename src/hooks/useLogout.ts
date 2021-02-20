import { useMutation } from 'react-query';
import Api from '../services/api';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms';
import useMessage from '../hooks/useMessage';

const useLogout = () => {

  const setAuth = useSetRecoilState(authState);

  const { showMessage } = useMessage();

  const { mutate: logout, error, isLoading } = useMutation(Api.logout, {
    onMutate: () => {      
      setAuth(authValue => ({
        ...authValue,
        isAuthenticated: false,
        user: null,
      }));
      showMessage('You have successfully logged out', 'success');
    },
    onSettled: () => {      
      localStorage.removeItem('token');
    }
  });

  return { logout, error, isLoading }
}

export default useLogout;
