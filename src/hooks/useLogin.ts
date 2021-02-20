import { useMutation } from 'react-query';
import Api from '../services/api';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms';
import { useHistory } from 'react-router-dom';
import useMessage from '../hooks/useMessage';

const useLogin = () => {

  const setAuth = useSetRecoilState(authState);

  const history = useHistory();

  const { showMessage } = useMessage();

  const { mutate: login, isError, isLoading } = useMutation(Api.login, {
    onSuccess: (response) => {
      localStorage.setItem('token', response.access_token);
      setAuth(authValue => ({
        ...authValue,
        isAuthenticating: false,
        isAuthenticated: true,
        user: response.user
      }));
      history.replace('/');
      showMessage('You have successfully logged in', 'success');
    }
  });

  return { login, isError, isLoading }
}

export default useLogin;
