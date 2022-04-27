import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Button, Typography, IconButton } from "@material-ui/core";
import { StyledContainer, StyledCard, StyledCardContent, CardAction, CardText, StyledTable } from "./styles";
import { Storage, ClearAll, TableChart, DeleteForever, FlashOn, AssistantPhoto } from "@material-ui/icons";
import { initalizeDB, createDB, deleteDB, createTable, deleteTable, getTable } from "../../api/database";
import TextModal from '../../components/modal/TextModal';
import io, { Socket } from 'socket.io-client';
import { getPerscisetime, getDateTitle, getLocalISO } from '../../utils/date'



export default function Admin() {
    
    const [dbOpen, setDbOpen] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [dbDelOpen, setDbDelOpen] = useState(false);
    const [tableDelOpen, setTableDelOpen] = useState(false)
    const [dbName, setDbName] = useState('');
    const [tableName, setTableName] = useState('');
    const [dbDelName, setDbDelName] = useState('');
    const [tableDelName, setTableDelName] = useState('');
    const [dbLog, setDbLog] = useState([]);
    const [updatedLog, setUpdatedLog] = useState({});

    const options = {
        selectableRows: 'none'
    }

    const dbLogColumns = [
        {
            name: 'date',
            label: 'Date',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'time',
            label: 'Time',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'action',
            label: 'Action Performed',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'type',
            label: 'Performed Upon',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'message',
            label: 'Message',
            options: {
                filter: true,
                sort: true,
            }
        }
    ]
    
    

    const databaseCreate = async event => {
        event.preventDefault();
        createDB(dbName).then(() => setDbOpen(false));
    }

    const tableCreate = async event => {
        event.preventDefault();
        createTable(dbName, tableName).then(setTableOpen(false));
    }

    const databaseDelete = async event => {
        event.preventDefault();
        deleteDB(dbDelName).then(setDbDelOpen(false));
    }

    const tableDelete = async event => {
        event.preventDefault();
        console.log(dbDelName, tableDelName);
        deleteTable(dbDelName, tableDelName).then(setTableDelOpen(false));
    }

    /**
     * Intializes DB Log state on Page Load
     */
    const dbLogInit = () => {
        const arr = [];
        getTable('drone-link', 'db-logs')
            .then(data => {
                data.result.map(d => {
                    const date = new Date(d.date);
                    const textDate = getDateTitle(date);
                    const textTime = getPerscisetime(date);
                    let action = null;
                    switch(d.action) {
                        case 'create':
                                action = <Typography style={{ color: '#0aada0'}}>{d.action}</Typography>
                            break;
                        case 'delete':
                                action = <Typography style={{ color: 'red'}}>{d.action}</Typography>
                        break;
                        default:
                            action = action = <Typography>{d.action}</Typography>
                            break;
                    }
                    arr.push({
                        date: textDate,
                        time: textTime,
                        type: d.type,
                        action: action,
                        message: d.message
                    })
                });
                return arr;
        }).then(arr => setDbLog(arr));

    }

    useEffect(() => {
        dbLogInit();
    }, []);

    useEffect(() => {
        const socket = io();
        socket.on('db-log-update', val => setUpdatedLog(val));
    }, []);


    useEffect(() => {
        if(dbLog.length > 0) {
            const date = new Date(updatedLog.date);
            const textDate = getDateTitle(date);
            const textTime = getPerscisetime(date);
            let action = null;
            switch(updatedLog.action) {
                case 'create':
                        action = <Typography style={{ color: '#0aada0'}}>{updatedLog.action}</Typography>
                    break;
                case 'delete':
                        action = <Typography style={{ color: 'red'}}>{updatedLog.action}</Typography>
                break;
                default:
                    action = action = <Typography>{updatedLog.action}</Typography>
                break;
            }
            const data = {
                date: textDate,
                time: textTime,
                type: updatedLog.type,
                action: action,
                message: updatedLog.message
            }
            setDbLog([data, ...dbLog]);
        }
    }, [updatedLog]);

    return (
        <div>
            <StyledContainer maxWidth={"lg"}>
                <Grid container spacing={3}>
                <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => initalizeDB()}>
                            <StyledCardContent>
                                <FlashOn style={{ fontSize: 50 }}/>
                                <CardText>Init Database</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                    <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => setDbOpen(true)}>
                            <StyledCardContent>
                                <Storage style={{ fontSize: 50 }}/>
                                <CardText>Create Database</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                    <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => setTableOpen(true)}>
                            <StyledCardContent>
                                <TableChart style={{ fontSize: 50 }}/>
                                <CardText>Create Table</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                    <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => setDbDelOpen(true)}>
                            <StyledCardContent>
                                <DeleteForever style={{ fontSize: 50 }}/>
                                <CardText>Delete Database</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                    <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => setTableDelOpen(true)}>
                            <StyledCardContent>
                                <ClearAll style={{ fontSize: 50 }}/>
                                <CardText>Delete Table</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                    <Grid item xs>
                        <StyledCard>
                        <CardAction onClick={() => window.open('http://localhost:8080/')}>
                            <StyledCardContent>
                                <AssistantPhoto style={{ fontSize: 50 }}/>
                                <CardText>RethinkDB Portal</CardText>
                            </StyledCardContent>
                        </CardAction>
                        </StyledCard>
                    </Grid>
                </Grid>
                <StyledTable title={"Database Logs"} data={dbLog} columns={dbLogColumns} options={options} />
            </StyledContainer>
            <TextModal open={dbOpen} onClose={() => setDbOpen(false)} text={['Database Name']} onChange={[setDbName]} submit={databaseCreate}/>
            <TextModal open={tableOpen} onClose={() => setTableOpen(false)} text={['Database Name', 'Table Name']} onChange={[setDbName, setTableName]} submit={tableCreate}/>
            <TextModal open={dbDelOpen} onClose={() => setDbDelOpen(false)} text={['Database Name']} onChange={[setDbDelName]} submit={databaseDelete}/>
            <TextModal open={tableDelOpen} onClose={() => setTableDelOpen(false)} text={['Database Name', 'Table Name']} onChange={[setDbDelName, setTableDelName]} submit={tableDelete}/>
        </div>
    )

}