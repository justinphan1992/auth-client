import React from 'react';
import Routes from './Routes';
import Loading from './components/Loading';
import Message from './components/Message';
import useAuthenticate from './hooks/useAuthenticate';
import useMessage from './hooks/useMessage';

function App() {

  const { isAuthenticating } = useAuthenticate();

  const { open, message, closeMessage, type } = useMessage();

  if (isAuthenticating) {
    return <Loading />
  }

  return (
    <>
      <Routes />
      <Message open={open} message={message} type={type} onClose={closeMessage} />
    </>
  );
}

export default App;
