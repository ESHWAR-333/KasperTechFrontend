import React, { useEffect, useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../../App.css'

const CustomerPanel = () => {
  const [light, setLight] = useState(false);
  const [fan, setFan] = useState(false);
  const [misc, setMisc] = useState(false);
  const { userId } = useParams();
  const[deviceId,setDeviceId]=useState(null);
  const [checkuser,setCheckUser]=useState(false);

  useEffect(()=>{
    try {
      
       Axios.get('https://kaspertechbackend-production.up.railway.app/devices')
       .then((res)=>{
        let present=res.data.find(each=>{
          if(each.alloted_to_user===userId)
          {
            setDeviceId(each._id);
            setLight(each.state.light)
            setFan(each.state.fan)
            setMisc(each.state.misc)
            setCheckUser(true);
            return true;
          }
          return false;
        });
        if (!present) {
          console.log('No matching device found for user:', userId);
        }
       }).catch(err=>console.log(err))
    
      
    } catch (error) {
      console.error('Error fecthing device:', error);
    }
  },[userId]);

  const handleSwitchChange = async (load) => {
    try {
        
      if (!deviceId) {
        console.error('Device ID is null or undefined');
        return;
      }
      if (load === 'light') {
        
        setLight(prevLight => !prevLight);
      } else if (load === 'fan') {
        
        setFan(prevFan => !prevFan);
      } else if (load === 'misc') {
        
        setMisc(prevMisc => !prevMisc);
      }
      console.log(deviceId,{ light, fan, misc })

       Axios.put(`https://kaspertechbackend-production.up.railway.app/devices/${deviceId}`, { light, fan, misc });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <h1>UserId: <span>{userId}</span></h1>
      {checkuser?
      <>
      <div className='device-container'>
      {light?<img src="../../pic_bulbon.gif" alt="bulb"/>:<img src="../../pic_bulboff.gif" alt="bulb"/>}
      <FormControlLabel
        control={<Switch checked={light} onChange={() => handleSwitchChange('light')} />}
        label="Light"
      />
      </div>
      <div className='device-container'>
      <img
        id="myFan"
        src="../../fan.png"
        width="200"
        height="100"
        className={fan ? 'rotate-fan' : ''}
        alt="fan" 
      />
      <FormControlLabel
        control={<Switch checked={fan} onChange={() => handleSwitchChange('fan')} />}
        label="Fan"
      />
      </div>
      <div className='device-container'>
      {misc?<img src="../../miscon.png" width={120} alt="bulb"/>:<img src="../../miscoff.png"  width={120} alt="bulb"/>}
      <FormControlLabel
        control={<Switch checked={misc} onChange={() => handleSwitchChange('misc')} />}
        label="Misc"
      />
      </div>
     </>:''}
    </div>
  );
};

export default CustomerPanel;
