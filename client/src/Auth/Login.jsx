import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Login({setLogin}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });
        console.log("response header: "+ response.headers.get("content-type"));
        const data = await response.json();
        if (data) {
          setLogin(true);
        } else {
          setUsername('');
          setPassword('');
          setMessage("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại");
        }
      } catch (err) {
        setMessage('Something went wrong. ' + err.message);
      }
    }


    return (
        <>
            <h1>Đăng nhập</h1>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                onSubmit={handleSubmit}
                //noValidate
                autoComplete="off"
            >
                    <div>
                        <TextField
                        required
                        id="username"
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    </div>
                    <div>
                        <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <Button variant="contained" type="submit">Đăng nhập</Button>
                    <p>{message}</p>
            </Box>
            
        </>
        
    )
}
export default Login;