import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { getTable, removeTimer } from '../../api/database'
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { StyledTable, StyledContainer } from "./styles";
import Navbar from "../../components/navbar";

export default function Timer() {
  const [data, setData] = useState([]);
  const [updatedLog, setUpdatedLog] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const localData = useRef();
  const selectedRows = useRef([]);
  const removeData = useRef();
  const postRemoveData = useRef();

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
      name: 'ip',
      label: 'IP',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true
      }
    },
  ]

  const timersLogInit = () => {
    const arr = [];
    getTable('drone-link', 'timers')
        .then(data => {
            data.result.map(d => {
                const id = d.id;
                const name = d.name;
                const ip = '0.0.0.0';
                let status = d.inuse ? <Typography inuse={String(d.inuse)} style={{ color: 'red'}}>In Use</Typography> : <Typography inuse={String(d.inuse)} style={{ color: '#0aada0'}}>Available</Typography>;
  
                arr.push({
                    id: id,
                    name: name,
                    ip: ip,
                    status: status
                })
            });
            return arr;
    }).then(arr => setData(arr));

}

useEffect(() => {
  timersLogInit();
}, []);

useEffect(() => {
  const socket = io();
  socket.on('timers-update', val => setUpdatedLog(val));
}, []);


useEffect(() => {
  if (updatedLog.old || updatedLog.new) {
    if (updatedLog.new !== null) {
      const id = updatedLog.new.id;
      const name = updatedLog.new.name;
      const ip = '0.0.0.0';
      let status = updatedLog.new.inuse ? <Typography inuse={String(updatedLog.new.inuse)} style={{ color: 'red'}}>In Use</Typography> : <Typography inuse={String(updatedLog.new.inuse)} style={{ color: '#0aada0'}}>Available</Typography>;
      const newData = {
          id: id,
          name: name,
          ip: ip,
          status: status
      }
  
      setData([newData, ...data]);
    }
  }
}, [updatedLog]);

useEffect(() => {
  localData.current = data;
}, [data])

  const handleTimerRemoval = (row, data) => {
    setOpenDialog(true);
    removeData.current = row.data;
    postRemoveData.current = data;
    return false;
  }

  const agreeRemoval = () => {
    console.log(removeData.current);
    if(removeData.current && postRemoveData.current) {
      removeData.current.map(data => {
        removeTimer('drone-link', 'timers', localData.current[data.dataIndex].id)
      })
      setData(postRemoveData.current);
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


  const selectableRows = (index, s) => localData.current[index].status.props.inuse === 'false' ? true : false;

  const options = {
    onRowsDelete: handleTimerRemoval,
    rowsSelected: selectedRows.current,
    onRowSelectionChange: handleRowSelection,
    isRowSelectable: selectableRows
  }

  return (
    <div>
      <Navbar />
      <StyledContainer>
        <StyledTable title={"Timers"} data={data} columns={columns} options={options} />
      </StyledContainer>
      <Dialog open={openDialog} onClick={() => setOpenDialog(false)}>
        <DialogTitle>{"Delete Selected Timers Permanently?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will remove the timer from the system entirely. This is NOT reversible without re-adding the timers
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
