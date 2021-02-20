import { atom } from 'recoil';
import { Color } from '@material-ui/lab/Alert';

export interface MessageState {
  type: Color,
  message: string,
  open: boolean,
}

const messageState = atom<MessageState>({
  key: 'messageState',
  default: {
    type: 'success',
    message: '',
    open: false
  },
})

export default messageState;