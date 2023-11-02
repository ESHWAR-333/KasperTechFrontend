import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Axios from 'axios';

const DeviceCreation = () => {
  const [userId, setUserId] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('https://kaspertechbackend-production.up.railway.app/devices/create', { alloted_to_user: userId });
      console.log('Device created successfully:', response.data);
      setUserId("")
      
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  return (
    <><h2>Create new IoT devices</h2>
    <form onSubmit={handleFormSubmit} >
      <TextField
        label="User ID"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button type="submit" variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
        Create Device
      </Button>
    </form>
    </>
  );
};

export default DeviceCreation;
