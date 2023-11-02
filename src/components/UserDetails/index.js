import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        // Fetch users and devices data
        Axios.get('https://kaspertechbackend-production.up.railway.app/')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error occurred while retrieving users:', error);
            });

        Axios.get('https://kaspertechbackend-production.up.railway.app/devices')
            .then((response) => {
                setDevices(response.data);
            })
            .catch((error) => {
                console.error('Error occurred while retrieving devices:', error);
            });
    }, []); // Empty dependency array ensures that the effect runs once after the initial render

    return (
        <>
            <h2>User Details</h2>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Light</TableCell>
                            <TableCell>Fan</TableCell>
                            <TableCell>Misc</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            const device = devices.find((d) => d.alloted_to_user === user._id);
                            return (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {device ? (
                                        <>
                                            <TableCell>{device.state.light ? 'On' : 'Off'}</TableCell>
                                            <TableCell>{device.state.fan ? 'On' : 'Off'}</TableCell>
                                            <TableCell>{device.state.misc ? 'On' : 'Off'}</TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UserDetails;
