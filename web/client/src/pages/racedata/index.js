import React, { useState, useEffect, useRef } from 'react';
import { StyledContainer, StyledCardContent, StyledCard, CardAction, CardText, StyledTable } from "./styles";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Link } from "@material-ui/core";
import TextModal from "../../components/modal/TextModal";
import { getTable } from "../../api/database";
import { addPilot, getPilot, removePilot } from '../../api/pilot'
import { PersonAdd } from "@material-ui/icons";
import Navbar from "../../components/navbar";
import InactiveRace from "./components/inactive";
import raceActions from "../../../../redux/actions/race";
import { getActiveRace, updateRace, endRace, removeRace, inactivateRace } from "../../../../api/race";
import { StyledContainer } from "./styles";

export default function RaceStats() {
		const raceData = useSelector(state => state.race);
		
	    const columns = [
      {
        name: 'name',
        label: 'Pilot Name',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'position',
        label: 'Position',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'pace',
        label: 'Pace',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'lap',
        label: 'Lap',
        options: {
          filter: true,
          sort: true
        }
      },
	  {
        name: 'laptime',
        label: 'Lap Time',
        options: {
          filter: true,
          sort: true,
        }
      },
	  {
        name: 'first',
        label: 'To 1st',
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
        name: 'average',
        label: 'Average',
        options: {
          filter: true,
          sort: true,
        }
      },
	  {
        name: 'fast',
        label: 'Fast',
        options: {
          filter: true,
          sort: true,
        }
      },
    ];
	
	
	
    const [isActive, setIsActive] = useState(false);
    return (
        <StyledContainer maxWidth={"lg"}>
            {!isActive ? <InactiveRace/> : <div/>}
        </StyledContainer>
    )
return (
      <div>
        <Navbar />
        <StyledContainer>
          <StyledCard>
            <CardAction onClick={() => setAddOpen(true)}>
              <StyledCardContent>
                <PersonAdd style={{ fontSize: 50 }} color={"primary"}/>
                <CardText color={"primary"}>Register New Pilot</CardText>
              </StyledCardContent>
            </CardAction>
          </StyledCard>
          <StyledTable title={${raceData.id}} data={pilotLog} columns={columns} options={options}/>
        </StyledContainer>
	);
}