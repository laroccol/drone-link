import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledModal, StyledContainer, StyledTextField, StyledSelect, AddedTimerButton, StyledForm, AddTimerButton, StyledNumberInput } from "../styles";
import { Button, MenuItem, Select, Tooltip, Typography, InputLabel, FormControl } from "@material-ui/core";
import { Timer, AddCircle } from "@material-ui/icons";
import { createRace } from "../../../../api/race";
import { updateTimer } from "../../../../api/timers";
import timerActions from "../../../../redux/actions/timers";

export default function NewRace(props) {

    const dispatch = useDispatch();
    const allTimers = useSelector(state => state.timers.available);

    const [adminName, setAdminName] = useState('');
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [minutes, setMinutes] = useState('');
    const [isTimerID, setIsTimerID] = useState(false);
    const [timerID, setTimerID]= useState('');
    const [timers, setTimers] = useState([]);


    const [isAdminError, setIsAdminError] = useState({helper: 'Admininstrator Name Required', isError: false});
    const [isNameError, setIsNameError] = useState({helper: 'Race Name Required', isError: false});
    const [isFrequencyError, setIsFrequencyError] = useState({helper: 'Frequency Required', isError: false});
    const [isMinutesError, setIsMinutesError] = useState({helper: 'Minutes Required', isError: false});
    const [isTimerError, setIsTimerError] = useState({helper: 'Add New Timer', isError: false});

    const addTimer = () => {
        timerID ? setTimerID('') : null;
        setIsTimerID(true);
    }

    const removeTimer = e => {
        dispatch(timerActions.unuse(timers[e.currentTarget.attributes.identifier.value]))
        setTimers(timers.filter(timer => timer !== timers[e.currentTarget.attributes.identifier.value]));
    }

    const selectTimer = e => {
        timers.length > 0 ? setTimers([...timers, allTimers[e.target.value]]): setTimers([allTimers[e.target.value]]);
        dispatch(timerActions.use(allTimers[e.target.value]))
        setIsTimerID(false);
    }

    const submitDetails = e => {
        e.preventDefault();

        //Sets Error States
        adminName === '' ? setIsAdminError({...isAdminError, isError: true}): setIsAdminError({...isAdminError, isError: false});
        name === '' ? setIsNameError({...isNameError, isError: true}): setIsNameError({...isNameError, isError: false});
        frequency === '' ? setIsFrequencyError({...isFrequencyError, isError: true}): setIsFrequencyError({...isFrequencyError, isError: false});
        minutes === '' ? setIsMinutesError({...isMinutesError, isError: true}): setIsMinutesError({...isMinutesError, isError: false});
        timers.length < 1 ? setIsTimerError({helper: 'Must Add One Timer', isError: true}): setIsTimerError({helper: 'Add New Timer', isError: false});

        //Checks again and submits data if all is valid
        if(adminName && name && frequency && minutes && timers.length > 0) {
            if(name.includes(' ')) {
                const split = name.split(' ');
                let newName = '';
                split.forEach((part, i) => {
                    if(i === 0 || i === split.length - 1) {
                        newName += part
                    } else {
                        newName += `-${part}`
                    }
                })
                createRace(generateDataStructure(newName)).then(() => window.location.assign(`/race/${newName}`));
            } else {
                createRace(generateDataStructure()).then(() => window.location.assign(`/race/${name}`));
            }
            timers.forEach(timer => {
                updateTimer({id: timer.id}, {inuse: true})
            })
        }
    }

    const generateDataStructure = (raceName = name) => {
        const data = {id: raceName, moderator: adminName, creation_date: Date.now(), minutes: parseInt(minutes), pings: []}
        const d_timers = [];

        timers.map((timer, i) => {
            //const pings = `timer_${timer.id}_pings`;
            d_timers.push(timer.id);
            //data[pings] = [{id: i, description: 'Initalization', timestamp: Date.now()}];
    
        })
        return {...data, pilots: [], race_start_time: null, race_end_time: null, timers: d_timers, end_date: null, status: 'waiting'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    }

    const reset = () =>  {
        setIsTimerID(false);
        setAdminName('');
        setName('');
        setFrequency('');
        setMinutes(0);
        setTimers([]);
    }

    const handleClose = () => {
        setIsTimerID(false);
        props.onClose();
    }

    const avalibleTimers = () => {
        return (
            <FormControl>
                <InputLabel>Timer Name</InputLabel>
                    <StyledSelect value={''} onChange={selectTimer}>
                        {allTimers.map((t, i) => {
                            return (<MenuItem value={i} key={i}>
                                {t.name}
                            </MenuItem>)
                        })}
                    </StyledSelect>
                </FormControl>
        )
    }

    return (
        <StyledModal open={props.open} onClose={handleClose}>
            <StyledContainer theme={"dark"}>
                <StyledForm onSubmit={submitDetails}>
                    <StyledTextField required value={adminName} placeholder={'Race Admininstrator Name'} onChange={e => setAdminName(e.target.value)} helperText={isAdminError.isError ? isAdminError.helper : null} error={isAdminError.isError}/>
                    <StyledTextField required value={name} placeholder={'Race Name'} onChange={e => setName(e.target.value)} helperText={isNameError.isError ? isNameError.helper : null} error={isNameError.isError}/>
                    <StyledTextField required value={frequency} placeholder={'Race Frequency'} onChange={e => setFrequency(e.target.value) } helperText={isFrequencyError.isError ? isFrequencyError.helper : null} error={isFrequencyError.isError}/>
                    <StyledNumberInput required type={'number'} value={minutes} placeholder={'Race Minutes'} onChange={e => setMinutes(e.target.value) } helperText={isMinutesError.isError ? isMinutesError.helper : null} error={isMinutesError.isError}/>
                    <div>
                            {timers.map((timer, i) => {
                                return (
                                    <Tooltip title={`Timer: ${timer.id}`} key={i} identifier={i}>
                                        <AddedTimerButton onClick={removeTimer}>
                                            <Timer/>
                                        </AddedTimerButton>
                                    </Tooltip>
                                )
                            })}
                        {!isTimerID ? (
                            <Tooltip title={isTimerError.helper}>
                                <AddTimerButton disabled={allTimers.length < 1} onClick={addTimer} error={isTimerError.isError.toString()}>
                                    <AddCircle/>
                                </AddTimerButton>
                            </Tooltip>
                        ): avalibleTimers()}
                    </div>
                    <Button type="submit" onClick={submitDetails} variant="outlined" color="primary">Create Race</Button>
                </StyledForm>
            </StyledContainer>
        </StyledModal>
    )
}