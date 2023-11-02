import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if (email && password) {
            Axios.post('https://kaspertechbackend-production.up.railway.app/login', { email, password })
                .then((response) => {
                    console.log('User logged in successfully!', response.data);
                    Cookies.set('jwt_token', response.data.jwtToken, { expires: 30, path: '/' });
                    let userId=null;
                    Axios.get('https://kaspertechbackend-production.up.railway.app/')
                        .then((res) => {
                            let userData = res.data;
                            let present=userData.find(each => {if(each.email === email){
                                userId=(each._id);
                                return true;
                            }
                        return false;} );
                            if(present){
                                console.log(userId)
                                    navigate(`/customer/${userId}`);
                            }
                            })
                        .catch((err) => console.log(err));
                })
                .catch((error) => {
                    console.error('Error occurred while logging in:', error);
                    alert('Invalid email or password');
                    setPasswordError(true);
                });
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Login</Button>

            </form>
        </React.Fragment>
    );
}

export default Login;