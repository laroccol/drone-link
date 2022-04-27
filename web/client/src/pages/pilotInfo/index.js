import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router";
import { StyledCardAction, StyledContainer, StyledHeader } from "./styles";
import { getPilot } from "../../api/pilot";
import PilotInfoNav from './components/pilotInfoNav';
import { Divider, Typography, CardActionArea } from "@material-ui/core";
import { Card } from '@material-ui/core';



export default function PilotInfo(props) {
    const [pilotName, setPilotName] = useState('');
    const [pilotTeam, setPilotTeam] = useState('');
    const [currentRace, setCurrentRace] = useState('');
    const [races, setRaces] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const asyncfunc = async () => {
            const response = await getPilot({name: props.match.params.name});
            const pilot = response.result[0];
            console.log(pilot);
            setPilotName(pilot.name);
            setPilotTeam(pilot.team);
            setCurrentRace(pilot.current_race === null ? 'None' : pilot.current_race);
            setRaces(pilot.past_races);
        }

        asyncfunc();
    }, [])

    const handleRaceClick = (raceName) => {
        console.log(raceName)
        history.push(`/raceinactive/${raceName}`);
    }

    const generateRaceCard = (raceName) => {
        return (
            <Card style={{ marginBottom: '15px'}}> 
                <StyledCardAction onClick={() => {handleRaceClick(raceName)}}>
                    <h1 style={{ display: 'inline-block'}}>{raceName}</h1>
                </StyledCardAction>
            </Card>
        )
    }

    return (
      <div>
          <PilotInfoNav />
          <StyledContainer maxWidth={"lg"} >
            <StyledHeader style={{ padding: '0px 15px 0px 15px'}}>
                <h1>{pilotName}</h1>
                <Divider />
                <h3>Team: {pilotTeam}</h3>
                <h3>Current Race: {currentRace}</h3>
                <h3>Average Lap Time: Coming Soon</h3>
            </StyledHeader>
            <h2>Past Races</h2>
            {races.map((val) => {
                return generateRaceCard(val);
            })}
          </StyledContainer>
      </div>
    );
}