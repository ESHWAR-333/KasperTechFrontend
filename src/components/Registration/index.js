import React, {useState} from 'react';
import { TextField, Button, Stack } from '@mui/material';
import Axios from 'axios';
import { Link } from "react-router-dom"
 
 
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const handleSubmit = (event) => {
        
        event.preventDefault();
        Axios.post('https://kaspertechbackend-production.up.railway.app/insert', { firstName, lastName, email, password })
          .then((response) => {
            console.log('User registered successfully!', response.data);
            
          })
          .catch((error) => {
            console.error('Error occurred while registering user:', error);
            
          });
      };

    
 
    return (
        <React.Fragment>
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Register User</Button>
            </form>
            
     
        </React.Fragment>
    )
}
 
export default RegisterForm;