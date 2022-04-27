import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import io from 'socket.io-client';
import { useDispatch } from "react-redux";
import { getAllActiveRaces, getAllInactiveRaces, inactivateRace } from "../../../../api/race";
import { getDateTitle, getTime} from "../../../../utils/date";
import { Grid, Typography, Divider } from "@material-ui/core";
import { TimeToLeave, Timeline, DataUsage } from "@material-ui/icons";
import {StyledCard, StyledCardContent, CardAction, CardText, HeaderPaper, InfoCard, InfoRow, RowHeaderText, DetailGrid, RowText } from "../styles";
import timerActions from "../../../../redux/actions/timers";
import NewRace from "./NewRace";
import CTable from "../../../../components/table/Table";
import Navbar from "../../../../components/navbar";

export default function InactiveRace() {

    const [openNewRace, setOpenNewRace] = useState(false);
    const [activeRaces, setActiveRaces] = useState(null);
    const [tableActive, setTableActive] = useState([]);
    const [tableInactive, setTableInactive] = useState([]);
    const [inactiveRaces, setInactiveRaces] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const activeRef = useRef();
    const inactiveRef = useRef();
    const activeTableRef = useRef();
    const inactiveTableRef = useRef();

    const activeColumns = ['ID', 'Timer(s)', 'Start Date'];
    const inactiveColumns = ['ID', 'Timer(s)', 'End Date']

    const fetchRaces = () => {
        getAllActiveRaces().then(d => setActiveRaces(d));
        getAllInactiveRaces().then(d => setInactiveRaces(d))
    }

    const activeRaceSelection = e => {
        console.log(activeTableRef.current[e.currentTarget.id])
        history.push(`/race/${activeTableRef.current[e.currentTarget.id].id}`)
    }

    const inactiveRaceSelection = e => {
        history.push(`/raceinactive/${inactiveTableRef.current[e.currentTarget.id].id}`)
    }

    useEffect(() => {
        dispatch(timerActions.init());
        const socket = io();
        socket.on('timers-update', val => {
            if(!val.old) {
                dispatch(timerActions.add(val.new))
            }
        });
        socket.on('race-insert', val => {
            setActiveRaces({result: [...activeRef.current.result, val.new]})
        })
        socket.on('race-delete', val => {
            const filtered = activeRef.current.result.filter(race => race.id !== val.old.id);
            setActiveRaces({result: filtered});
        })
        socket.on('irace-insert', val => {
            console.log(val);
            if(inactiveRef.current) {
                setInactiveRaces({result: [...inactiveRef.current.result, val.new]});
            } else {
                setInactiveRaces({result: [val.new]});
            }
        })
        fetchRaces();
    }, []);

    const generateTableData = (data, func, dateType) => {
        const lData = [];
        if(data.current && data.current.result) {
            data.current.result.map(data => {
                let timerString = '';
                {data.timers.map((timer, i) => {
                    i > 0 ? timerString += `, ${timer}` : timerString += `${timer}`
                })}
                lData.push(
                    {
                        id: data.id,
                        timers: timerString,
                        date: `${getDateTitle(new Date(dateType === 'start' ? data.creation_date: data.end_date))} ${getTime(new Date(dateType === 'start' ? data.creation_date: data.end_date))}`
                    }
                )
            })
            func(lData);
        };
    }

    useEffect(() => {
        activeRef.current = activeRaces;
    }, [activeRaces]);

    useEffect(() => {
        inactiveRef.current = inactiveRaces;
    }, [inactiveRaces])

    useEffect(() => {
        generateTableData(activeRef, setTableActive, 'start');
    }, [activeRef.current]);

    useEffect(() => {
        generateTableData(inactiveRef, setTableInactive);
    }, [inactiveRef.current])


    useEffect(() => {
        activeTableRef.current = tableActive;
    }, [tableActive])

    useEffect(() => {
        inactiveTableRef.current = tableInactive;
    }, [tableInactive])


    return (
        <div>
            <Navbar/>
            <StyledCard>
                <CardAction onClick={() => setOpenNewRace(true)}>
                    <StyledCardContent>
                        <TimeToLeave style={{ fontSize: 50 }} color={"primary"}/>
                        <CardText color={"primary"}>Create New Race</CardText>
                        </StyledCardContent>
                 </CardAction>
            </StyledCard>
            <DetailGrid container spacing={2}>
                <Grid item xs>
                    <HeaderPaper>Active Races</HeaderPaper>
                    <Divider/>
                    <InfoCard>
                            {activeRaces  && tableActive  && tableActive.length > 0 ? <CTable columns={activeColumns} data={tableActive} handleRowClick={activeRaceSelection}/>: (<InfoRow hover={'false'}>
                                <RowHeaderText>No Active Races</RowHeaderText>
                            </InfoRow>)}
                    </InfoCard>
                </Grid>
                <Grid item xs>
                    <HeaderPaper>Inactive Races</HeaderPaper>
                    <Divider/>
                    <InfoCard>
                        {inactiveRaces && tableInactive && tableInactive.length > 0 ? <CTable columns={inactiveColumns} data={tableInactive} handleRowClick={inactiveRaceSelection}/> : (<InfoRow hover={'false'}>
                                <RowHeaderText>No Inactive Races</RowHeaderText>
                            </InfoRow>)}
                    </InfoCard>
                </Grid>
            </DetailGrid>
                 
                <NewRace open={openNewRace} onClose={() => setOpenNewRace(false)}/>
            </div>
    )
}