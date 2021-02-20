import { useSetRecoilState, useRecoilValue } from 'recoil';
import { messageState } from '../atoms';
import { Color } from '@material-ui/lab/Alert';

const useMessage = () => {

  const state = useRecoilValue(messageState);

  const setMessage = useSetRecoilState(messageState);

  const showMessage = (message: string, type: Color) => {
    setMessage(values => ({
      ...values,
      open: true,
      type,
      message,      
    }))
  }

  const closeMessage = () => {
    setMessage(values => ({
      ...values,
      open: false,        
    }))
  }

  return {...state, showMessage, closeMessage }
}

export default useMessage;