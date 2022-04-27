import React from 'react';
import { useHistory } from "react-router-dom";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { Home, Person, Timer, Flight, SupervisorAccount } from "@material-ui/icons";
import { StyledDrawer } from "./styles"; 
export default function Navbar() {

    const history = useHistory();
    const activePath = window.location.pathname;

    return (
        <StyledDrawer variant={"permanent"} >
            <List>
                <Tooltip title={"Home"}>
                <ListItem button key={"home"} onClick={() => window.location.assign("/")}>
                    <ListItemIcon>
                        <Home style={{color: activePath === '/' ? "#FFF" : "#424242"}}/>
                    </ListItemIcon>
                </ListItem>
                </Tooltip>
            </List>
            <Divider/>
            <List>
                <Tooltip title={"Pilot(s)"}>
                <ListItem button key={"pilot"} onClick={() => history.push('/pilot')}>
                    <ListItemIcon>
                        <Person style={{color: activePath === '/pilot' ? "#FFF" : "#424242"}}/>
                    </ListItemIcon>
                </ListItem>
                </Tooltip>
                <Tooltip title={"Race(s)"}>
                <ListItem button key={"race"} onClick={() => history.push('/race')}>
                    <ListItemIcon>
                        <Flight style={{color: activePath === '/race' ? "#FFF" : "#424242"}}/>
                    </ListItemIcon>
                </ListItem>
                </Tooltip>
                <Tooltip title={"Timer(s)"}>
                <ListItem button key={"timer"} onClick={() => history.push('/timer')}>
                    <ListItemIcon>
                        <Timer style={{color: activePath === '/timer' ? "#FFF" : "#424242"}}/>
                    </ListItemIcon>
                </ListItem>
                </Tooltip>
            </List>
            <Divider/>
            <List>
                <Tooltip title={"Admininstration"}>
                <ListItem button key={"admin"} onClick={() =>history.push('/admin')}>
                    <ListItemIcon>
                        <SupervisorAccount style={{color: activePath === '/admin' ? "#FFF" : "#424242"}}/>
                    </ListItemIcon>
                </ListItem>
                </Tooltip>
            </List>
        </StyledDrawer>
    )

}