import { useMutation } from 'react-query';
import Api from '../services/api';


const useRegister = () => {

  const { mutate: onRegister, isError, isLoading } = useMutation(Api.register);

  return { onRegister, isError, isLoading };
}

export default useRegister;