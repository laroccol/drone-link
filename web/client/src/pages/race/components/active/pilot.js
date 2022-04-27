import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import raceActions from "../../../../redux/actions/race";
import { PersonAdd } from "@material-ui/icons";
import { getPilot } from "../../../../api/pilot";
import { getTable } from "../../../../api/database";
import { StyledContainer } from "../../styles";
import {  StyledCard, CardAction, StyledCardContent, CardText, StyledTable } from "../styles";
import RaceNavbar from "./components/racenav";
import PilotTable from "./components/pilotTable";

export default function Pilots(props) {

    const [allPilots, setAllPilots] = useState([]);
    const [pilots, setPilots] = useState();
    const [addPilot, setAddPilot] = useState(false);
    const dispatch = useDispatch();

    const raceData = useSelector(state => state.race);

    const columns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                filter: true,
                sort: true,
              }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: 'team',
            label: 'Team',
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: 'frequency',
            label: 'Frequency',
            options: {
              filter: true,
              sort: true
            }
          },
    ]


    const getAllPilots = () => {
        const lPilots = [];
        getTable('drone-link', 'pilots').then(data => {
            data.result.map(pilot => {
                if(!pilot.inrace) {
                    lPilots.push({
                        id: pilot.id,
                        name: pilot.name,
                        team: pilot.team,
                        frequency: pilot.frequency
                    })
                }
            })

            setAllPilots(lPilots);
        })
    }

    const getRacePilots = async () => {
        const filters = [];
        const lPilots = [];
        raceData.pilots.map(pilot => {
            filters.push(pilot)
        })

        await getPilot(filters).then(pilots => {
            pilots.result.map(p => {
                //console.log(p)
                lPilots.push({
                    id: p.id,
                    name: p.name,
                    team: p.team,
                    frequency: p.frequency
                })
            })
        });
        setPilots(lPilots)
    }

    useEffect(() => {
        getAllPilots();
        if(!raceData.id) {
            dispatch(raceActions.init(props.match.params.name))
        }
    }, []);

    useEffect(() => {
        if(raceData.id)
            getRacePilots();
    }, [raceData])

    return (
    <div>
        <RaceNavbar name={raceData.id}/>
        <StyledContainer>
        <StyledCard>
                <CardAction onClick={() => setAddPilot(true)}>
                    <StyledCardContent>
                        <PersonAdd style={{ fontSize: 50 }} color={"primary"}/>
                        <CardText color={"primary"}>Add Pilot To Race</CardText>
                        </StyledCardContent>
                 </CardAction>
            </StyledCard>
            <StyledTable columns={columns} data={pilots}/>
        </StyledContainer>
        <PilotTable open={addPilot} onClose={() => setAddPilot(false)} data={allPilots} />
    </div>
    )
}