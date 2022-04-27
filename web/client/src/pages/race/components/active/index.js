import React, {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import io from "socket.io-client";
import raceActions from "../../../../redux/actions/race";
import { getActiveRace, updateRace, endRace, removeRace, inactivateRace } from "../../../../api/race";
import { getDateTitle, getTime} from "../../../../utils/date";
import { Grid, Button, Tooltip, Divider, Typography } from "@material-ui/core";
import { Timer, TimerOff } from "@material-ui/icons";
import { HeaderCard, StyledHeader, EndRaceButton, PingCard, HeaderPaper, RowHeaderText, InfoRow, StartRaceButton, StyledTable } from "../styles";
import { StyledContainer } from "../../styles";
import RaceNavbar from "./components/racenav";
import race from "../../../../redux/reducers/race";

export default function ActiveRace(props) {

    //console.log(props.match.params);
    const dispatch = useDispatch();
    const history = useHistory();
    //const [data, setData] = useState([]);

    const raceData = useSelector(state => state.race);

    useEffect(() => {
        dispatch(dispatch =>
            dispatch({
                type: 'RESET'}))
        dispatch(raceActions.init(props.match.params.name));
        return;
    }, []);

    const start = () => {
        dispatch(raceActions.startRace(props.match.params.name));
    }

    /**
     * Set end_date and active
     * Clone data
     * Move Data
     * Send To Race Page
     */
    const finish = () => {
        endRace(raceData).then(() => history.push('/race'));
    }

    return (
        <div>
            <RaceNavbar name={raceData.id}/>
            <StyledContainer maxWidth={"lg"}>
                    <HeaderCard>
                        <StyledHeader avatar={<Timer />}
                            title={`Race: ${raceData.id}`}
                            subheader={`${raceData.status === 'started' ? 'Started' : (raceData.status === 'waiting' ? 'Awaiting Start' : 'Completed')}`} 
                            status={raceData.status}
                            action={
                                <Tooltip title={raceData.status === 'started' ? "End Race" : "Start Race"}>
                                    {raceData.status === 'started' ? 
                                        <EndRaceButton onClick={finish}>
                                            <TimerOff />
                                        </EndRaceButton>
                                    :
                                        <StartRaceButton onClick={start}>
                                            <Timer />
                                        </StartRaceButton>}
    
                                </Tooltip>
                            }/>
                    </HeaderCard>
            </StyledContainer>
        </div>
    )
}