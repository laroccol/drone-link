import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import raceActions from "../../../../redux/actions/race";
import { getDateTitle, getTime} from "../../../../utils/date";
import { updateRace } from "../../../../api/race";
import { Grid, Button, Tooltip, Divider, Typography } from "@material-ui/core";
import { PingCard, HeaderPaper, RowHeaderText, InfoRow } from "../styles";
import { StyledContainer } from "../../styles";
import RaceNavbar from "./components/racenav";

export default function Timer(props) {

    const raceData = useSelector(state => state.race);
    const [data, setData] = useState({timers: []});
    const [pings, setPings] = useState([]);
    const dispatch = useDispatch();


    const pingTimer = e => {
        const pingData = raceData['pings'];
        //const id = (pingData[pingData.length - 1].id) + 1;
        pingData.push({description: "Manually Ping", timestamp: Date.now()});
        const pingUpdate = {}
        pingUpdate['pings'] = pingData;
        updateRace({id: props.match.params.name}, pingUpdate); 
    }

    const intializeData = () => {
        if(raceData.timers.length > 0) {
            const newPings = [];
            let tempPings = [];
            raceData.timers.forEach((timer, idx) => {
                if(idx % 3 === 0 && idx !== 0) {
                    newPings.push(tempPings);
                    tempPings = [];
                } else if(idx === raceData.timers.length - 1 && tempPings.length > 0) {
                    newPings.push(tempPings);
                }
                tempPings.push({name: `Timer ${timer} Pings`, id: `pings`})
            })
            setPings(newPings)
        }
    }

    useEffect(() => {
        const socket = io();
        if(!raceData.id)
            dispatch(raceActions.init(props.match.params.name));
        socket.on('race-update', val => val.old !== val.new && val.new.id === props.match.params.name ? setData(val.new) : null);
        return;
    }, []);

    useEffect(() => {
        if(raceData.id) {
            intializeData();
        }
    }, [raceData])

    const generatePings = () => {
        if(raceData.timers.length > 0 && pings.length > 0) {
            return pings.map(p => {   
                return(<Grid container spacing={3}>
                    {p.map(ping => {
                        return (<Grid item xs><Divider/><HeaderPaper>{ping.name}</HeaderPaper>
                        <PingCard>
                        {raceData[ping.id].map(t => {
                                return (
                                <InfoRow>
                                    <RowHeaderText>{t.description}</RowHeaderText>
                                    <Typography>{`${getDateTitle(new Date(t.timestamp))} ${getTime(new Date(t.timestamp))}`}</Typography>
                                </InfoRow>)})}
                                <Button onClick={pingTimer} id={ping.id}>Ping Timer</Button>
                        </PingCard>
                            </Grid>)
                    })}
                </Grid>)});
        }
    }

    return (
        <div>
            <RaceNavbar name={raceData.id}/>
            <StyledContainer>
                {generatePings()}
            </StyledContainer>
        </div>
    )

}