import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SignIn from './pages/SignIn';
import MessageBoard from './pages/MessageBoard';

//const App = () => <MessageBoard />;

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);

    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className='App'>
      {socket ? (
        <div className='chat-container'>
          <MessageBoard socket={socket} />
        </div>
      ) : (
        <div>Not Connected to Server</div>
      )}
    </div>
  );
}

export default App;
