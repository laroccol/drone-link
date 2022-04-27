import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topbar";
import { StyledCardContent, CardAction, CardText, HeaderPaper, InfoCard, InfoRow, RowHeaderText, DetailGrid, RowText } from "../race/components/styles";
import { Grid, Card, Typography, Divider, CardHeader } from "@material-ui/core";
import { TimeToLeave, Timeline, DataUsage } from "@material-ui/icons";
import { StyledContainer, StyledCard } from "./styles";
import { getWeatherByZip } from "../../api/weather";
import WeatherWidget from "../../components/weather";
import { getDateTitle, getTime} from "../../utils/date";
import { getAllActiveRaces, getAllInactiveRaces, inactivateRace } from "../../api/race";
import { getTable } from "../../api/database";
import CTable from "../../components/table/Table";

export default function Landing() {
    const [pilots, setPilots] = useState([]);
    const [activeRaces, setActiveRaces] = useState(null);
    const [raceData, setRaceData] = useState([]);

    const pilotColums = ['Name', 'Team                 ', 'Active'];
    const raceColumns = ['ID', 'Timer(s)', 'Start Date'];

    const fetchRaces = () => {
        getAllActiveRaces().then(d => {
            setActiveRaces(d)
        });
    }

    const pilotLogInit = () => {
        console.log("init");
        const arr = [];
        getTable('drone-link', 'pilots')
            .then(data => {
                data.result.map(d => {
                    const name = d.name;
                    const team = d.team;
                    const active = d.inrace ? <Link style={{textDecoration: 'underline'}} href={`/race/${d.current_race}`}>{d.current_race}</Link> : 'None'
                    arr.push({
                        name: name,
                        team: team,
                        active: active
                    })
                });
                console.log(arr);
                return arr;
        }).then(arr => setPilots(arr));
  
    }

    const generateTableData = (data, func, dateType) => {
        const lData = [];
        if(data && data.result) {
            console.log(data);
            data.result.map(data => {
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
        fetchRaces();
        pilotLogInit();
      }, []);

    useEffect(() => {
        generateTableData(activeRaces, setRaceData, 'start');
    }, [activeRaces]);



    return (
        <div>
            <Navbar />
            <TopBar />
            <StyledContainer maxWidth={"lg"}>
                <DetailGrid container spacing={2}>
                    <Grid item xs>
                        <HeaderPaper>Registered Pilots</HeaderPaper>
                        <Divider/>
                        <InfoCard>
                            {pilots ? <CTable columns={pilotColums} data={pilots} />: (<InfoRow hover={'false'}>
                                <RowHeaderText>No Active Pilots</RowHeaderText>
                            </InfoRow>)}  
                        </InfoCard>
                    </Grid>
                    <Grid item xs>
                        <HeaderPaper>Scheduled Races</HeaderPaper>
                        <Divider/>
                        <InfoCard>
                            {activeRaces ? <CTable columns={raceColumns} data={raceData} />: (<InfoRow hover={'false'}>
                                <RowHeaderText>No Active Races</RowHeaderText>
                            </InfoRow>)}
                        </InfoCard>
                    </Grid>
                </DetailGrid>
                <StyledCard>
                    <WeatherWidget />
                </StyledCard>
                
            </StyledContainer>
        </div>
    )
}