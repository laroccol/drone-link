import React, { useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import socketIOClient from 'socket.io-client';

const EP = 'localhost:3000';

export default function User() {

    const [users, setUsers] = useState('None');

    const socket = socketIOClient(EP);

    socket.on('user:insert', data => {
        console.log(data);
    })

    const handleCreate = () => {
        socket.emit('user:insert', ('bob', 'joe', '99'))
    }


    return (
        <div>
            <Button onClick={handleCreate}>
                
            </Button>
        </div>
    )

}