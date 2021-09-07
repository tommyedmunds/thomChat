import React, { useEffect } from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  //const [socket, setSocket] = useState(null)

  //useEffect(() => {})

  const handleSubmit = () => {
    //console.log(author, message);

    axios
      .post('/thomChat', {
        item: message,
        created_by: author,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    const socketObj = {
      item: message,
      created_by: author,
    };

    props.socket.emit('chat message', { socketObj });

    setMessage('');
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='outlined-basic'
        label='Author'
        onChange={(e) => setAuthor(e.target.value)}
        variant='outlined'
        value={author}
      />
      <TextField
        id='outlined-basic'
        label='Message'
        onChange={(e) => setMessage(e.target.value)}
        variant='outlined'
        value={message}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        style={{ height: '60px' }}
      >
        Submit
      </Button>
    </form>
  );
}
