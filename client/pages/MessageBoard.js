import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import Form from '../components/Form';

const MessageBoard = (props) => {
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/messages')
      .then((res) => {
        console.log('res');
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log('hit');
    scrollToBottom();
  }, [messages]);

  props.socket.on('chat message', (msg) => {
    console.log(messages);
    console.log('msg ', msg.socketObj);
    const copyMessages = messages.slice();

    copyMessages.push(msg.socketObj);

    setMessages(copyMessages);
  });

  const chatBlock = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //overflowY: 'auto',
    maxHeight: '500px',
  };

  const author = {
    marginLeft: '0% !important',
  };

  const submitZone = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxHeight: '80px',
  };

  return (
    <div>
      <center>
        <h1>ThomChat</h1>
      </center>

      <div style={chatBlock}>
        <div style={{ width: '50%', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none' }}>
            {messages.map((m, i) => {
              return (
                <div key={i}>
                  <span style={author}>{m.created_by}</span>
                  <center>
                    <li
                      style={{
                        backgroundColor: '#d3d3d3',
                        borderRadius: '10px',
                        width: '50%',
                        marginBottom: '1%',
                        marginLeft: '2%',
                        paddingTop: '2%',
                      }}
                    >
                      {m.item}
                    </li>
                    <div ref={messagesEndRef} />
                  </center>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <div style={submitZone}>
        <Form socket={props.socket} />
      </div>
    </div>
  );
};

export default MessageBoard;
