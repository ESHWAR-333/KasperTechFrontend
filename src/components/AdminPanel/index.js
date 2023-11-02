import React  from 'react';
import {  Typography} from '@mui/material';
// import Axios from 'axios';
import RegisterForm from '../Registration';
import UserDetails from '../UserDetails';
import DeviceCreation from '../DeviceCreation';

const AdminPanel = () => {


  return (
    <div>
      <Typography variant="h4" gutterBottom textAlign={'center'} sx={{ m: 2 }}>
        Admin Panel
      </Typography>
      <div>
        <RegisterForm/>
      </div>
      
      <DeviceCreation/>
      <UserDetails/>
    </div>
  );
};

export default AdminPanel;
