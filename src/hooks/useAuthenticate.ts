import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { authState } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Api from '../services/api';

const useAuthenticate = () => {  
  
  const { isAuthenticating, isAuthenticated } = useRecoilValue(authState);  
  
  const setAuth = useSetRecoilState(authState);

  const { refetch } = useQuery('get-user', Api.getUser, {
    enabled: false,
    retry: false,
    onSuccess: (response) => {
      setAuth(authValue => ({
        ...authValue,
        isAuthenticated: true,
        isAuthenticating: false,
        user: response,
      }))
    },
    onError: () => {
      setAuth(authValue => ({
        ...authValue,        
        isAuthenticating: false,        
      }))
    }
  })

  useEffect(() => {
    if (isAuthenticating) {
      refetch();
    }
  }, [isAuthenticating, refetch])

  return { isAuthenticating, isAuthenticated }
}

export default useAuthenticate;
