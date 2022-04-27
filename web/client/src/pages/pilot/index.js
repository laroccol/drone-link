import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router";
import { StyledContainer, StyledCardContent, StyledCard, CardAction, CardText, StyledTable } from "./styles";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Link } from "@material-ui/core";
import TextModal from "../../components/modal/TextModal";
import { getTable } from "../../api/database";
import { addPilot, getPilot, removePilot } from '../../api/pilot'
import { PersonAdd } from "@material-ui/icons";
import Navbar from "../../components/navbar";
//import { update } from '../../../../api/src/utils/database';


export default function Pilot() {
    const [addOpen, setAddOpen] = useState(false);
    const [pilotName, setPilotName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [frequency, setFrequency] = useState(0);
    const [pilotLog, setPilotLog] = useState([]);
    const [updatedLog, setUpdatedLog] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const localPilots = useRef();
    const removeData = useRef();
    const selectedRows = useRef([]);
    const postRemoveData = useRef();
    const history = useHistory();

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
          sort: true,
        }
      },
      {
        name: 'active',
        label: 'Active Race',
        options: {
          filter: true,
          sort: true
        }
      },
    ];



    const pilotLogInit = () => {
      console.log("init");
      const arr = [];
      getTable('drone-link', 'pilots')
          .then(data => {
              data.result.map(d => {
                  const id = d.id;
                  const name = d.name;
                  const team = d.team;
                  const frequency = d.frequency;
                  const active = d.inrace ? <Link style={{textDecoration: 'underline'}} href={`/race/${d.current_race}`}>{d.current_race}</Link> : 'None'
                  arr.push({
                      id: id,
                      name: name,
                      team: team,
                      frequency: frequency,
                      active: active
                  })
              });
              console.log(arr);
              return arr;
      }).then(arr => setPilotLog(arr));

  }

  const onPilotAdd = async (event) => {
      event.preventDefault();
      let data = {
          name: pilotName, 
          team: teamName, 
          frequency: parseInt(frequency), 
          inrace: false,
          past_races: [],
          current_race: null
      };

      await addPilot(data);
      const pilotSearch = await getPilot({name: pilotName, team: teamName, frequency: parseInt(frequency)});
      const newPilot = pilotSearch.result[0];

      data = {...newPilot, ...data, option: 'add', active: 'None'};

      setPilotLog([...pilotLog, data]);

      setUpdatedLog(data);
      setAddOpen(false);
  }

  const handlePilotRemoval = (row, data) => {
    setOpenDialog(true);
    removeData.current = row.data;
    postRemoveData.current = data;
    return false;
  }

  const agreeRemoval = () => {
    console.log(removeData.current);
    if(removeData.current && postRemoveData.current) {
      removeData.current.map(data => {
        removePilot(localPilots.current[data.dataIndex].id)
      })
      setPilotLog(postRemoveData.current);
      selectedRows.current = [];
    }
  }

  const cancelRemoval = () => {
    setOpenDialog(false);
    removeData.current = null;
    postRemoveData.current = null;
  }

  const handleRowSelection = (c, a, rows) => {
    selectedRows.current = rows;
  }

  const handleRowClick = (rowData, rowMeta) => {
    console.log(rowData);
    history.push(`/pilot/${rowData[0]}`);
  }

  const selectableRows = (index, s) => localPilots.current[index].active === 'None' ? true : false;

  const options = {
    onRowsDelete: handlePilotRemoval,
    rowsSelected: selectedRows.current,
    onRowSelectionChange: handleRowSelection,
    isRowSelectable: selectableRows,
    onRowClick: handleRowClick,
  }

  useEffect(() => {
    pilotLogInit();
  }, []);

  useEffect(() => {
    localPilots.current = pilotLog;
    console.log(pilotLog);
  }, [pilotLog])

  useEffect(() => {
    }, [updatedLog]);

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
          <StyledTable title={"Pilots"} data={pilotLog} columns={columns} options={options} />
        </StyledContainer>
        <TextModal open={addOpen} onClose={() => setAddOpen(false)} text={['Pilot Name', 'Team Name', 'Frequency']} onChange={[setPilotName, setTeamName, setFrequency]} submit={onPilotAdd}/>
        <Dialog open={openDialog} onClick={() => setOpenDialog(false)}>
          <DialogTitle>{"Remove Selected Pilots Permanently?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action will remove the pilot from the system entirely. This is NOT reversible without re-adding the timers
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={agreeRemoval}> Agree </Button>
            <Button onClick={cancelRemoval}> Disagree </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}