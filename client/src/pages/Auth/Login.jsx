import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import loginApi from '../../api/loginAPI';

function Login({setLogin}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(event) => {
      event.preventDefault();
      try {
        const data = await loginApi(username, password)
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