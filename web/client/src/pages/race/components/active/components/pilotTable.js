import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import raceActions from "../../../../../redux/actions/race";
import { updatePilot } from "../../../../../api/pilot";
import { updateRace, addPilot } from "../../../../../api/race";
import {StyledContainer, StyledModal, StyledTable} from "./styles";
import { IconButton, Tooltip, Typography} from "@material-ui/core";
import { Add } from "@material-ui/icons";


export default function PilotTable(props) {

    const [data, setData] = useState();
    const localPilotData = useRef();
    const selectedRows = useRef();

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

    const generateData = () => {
        if(props.data) {
            const lPilots = [];
            props.data.map(pilot => {
                lPilots.push({
                    id: pilot.id,
                    name: pilot.name,
                    team: pilot.team,
                    frequency: pilot.frequency
                })
            });
            setData(lPilots);
        }
    }

    const addPilots = (selected, data) => {
        let newData = data;
        const tempData = [];
        let racers = [];
        selected.map(pilot => {
            addPilot(raceData.id, data[pilot.dataIndex].data);
            //updatePilot({id: data[pilot.dataIndex].data[0]}, {current_race: raceData.id, inrace: true})
            racers.push(data[pilot.dataIndex].data[0]);
            newData = newData.filter(p => pilot.dataIndex !== p.dataIndex);
        });

        newData.forEach(pilot => {
            tempData.push({
                id: data[pilot.dataIndex].data[0],
                name: data[pilot.dataIndex].data[1],
                team: data[pilot.dataIndex].data[2],
                frequency: data[pilot.dataIndex].data[3]
            })
        })

        racers = [...raceData.pilots, ...racers];

        dispatch(raceActions.addPilot(raceData.id, racers));
        
        selectedRows.current = [];
        setData(tempData);
    }

    const CustomSelectToolbar = selected => {
        return (
            <div>
                <Tooltip title={"Add Pilot(s)"}>
                    <IconButton onClick={() => addPilots(selected.selected, selected.data)}>
                        <Add />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    const handleRowSelection = (c, a, rows) => {
        selectedRows.current = rows;
    }

    const options = {
        print: false,
        download: false,
        customToolbarSelect: (selectedRows, data) => (
            <CustomSelectToolbar selected={selectedRows.data} data={data}/>
        ),
        onRowSelectionChange: handleRowSelection,
        rowsSelected: selectedRows.current,
        textLabels: {
            selectedRows: {
                text: "Selected Pilots"
              },
        }
    }

    useEffect(() => {
        localPilotData.current = props.data;
    }, [props.data]) 

    useEffect(() => {
        generateData();
    }, [localPilotData.current])

    return (
        <StyledModal open={props.open}
        onClose={props.onClose}>
            <StyledContainer>
                <StyledTable columns={columns} data={data} options={options}/>
            </StyledContainer>
        </StyledModal>
    )
}