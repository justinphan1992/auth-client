import { useMutation } from 'react-query';
import useMessage from './useMessage';
import { authState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import Api from '../services/api';


const useUpdateProfile = () => {

  const { showMessage } = useMessage();

  const setAuth = useSetRecoilState(authState);

  const { mutate: onUpdate, isLoading } = useMutation(Api.updateUser, {
    onSuccess: (response) => {
      setAuth((authValue) => ({
        ...authValue,
        ...response,
      }))
      showMessage('Your profile has been updated successfully', 'success');
    },
    onError: (error) => {
      showMessage('Something went wrong', 'error');
    }
  });

  return { onUpdate, isLoading };
}

export default useUpdateProfile;