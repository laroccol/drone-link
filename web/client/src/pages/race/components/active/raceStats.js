import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";
import raceActions from "../../../../redux/actions/race";
import { getTable} from "../../../../api/database";
import { getPilot } from "../../../../api/pilot";
import { endRace, updateRace, updateRacePilot } from "../../../../api/race";
import { Button, IconButton, Tooltip, Typography, Paper} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { StyledModal, StyledTable } from "./components/styles";
import { HeaderCard, StyledHeader, StyledProgressBar, StyledRaceHeader } from "../styles";
import { StyledContainer } from "../../styles";
import RaceNavbar from "./components/racenav";
import race from "../../../../redux/reducers/race";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  timelineContainer: {
    textAlign: "center"
  },
  timeline: {
    display: "inline-block",
    padding: "50px"
  },
  timelineItem: {
    '&::before': {
      flex: "0"
    }
  },
  timelineSeparator: {
    color: "red"
  },
  timelineContentContainer: {
    textAlign: "center"
  },
  timelineContent_right: {
    padding: "5px",
    marginRight: "50px"
  },
  timelineContent_left: {
    padding: "5px",
    marginLeft: "50px"
  },
  timelineIcon: {
  },
  connector: {
    height: "125px"
  },
  dot: {
    borderWidth: "7px",
  },
  dot_outlined: {
    borderWidth: "4px",
    padding: "7px"
  }
});


export default function RaceStats(props) {

    const testProgressData = [
        {
            id: 0,
            name: 'name0',
            progress: <StyledProgressBar variant="determinate" value={70}/>,
        },
        {
            id: 1,
            name: 'name1',
            progress: <StyledProgressBar variant="determinate" value={30}/>,
        }
    ]

    const raceData = useSelector(state => state.race);

    const calculateTimeLeft = () => {
      let timeLeft = {minutes: 0, seconds: 0};

      if (raceData.id) {
        if (raceData.status === 'started') {
          let difference = (raceData.minutes * 60000) - (Date.now() - raceData.race_start_time);
          if (difference > 0) {
            timeLeft = {
              minutes: Math.floor(difference / 60000),
              seconds: ((difference % 60000) / 1000).toFixed(2)
            };
          }
        }
        else {
          timeLeft.minutes = raceData.minutes;
        }
      }

      return timeLeft;
    }

    const [data, setData] = useState([]);
    const [updatedLog, setUpdatedLog] = useState({});
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [timeExpired, setTimeExpired] = useState(false);
    const [raceFinished, setRaceFinished] = useState(false);
    const localRaceData = useRef();
    const [pilots, setPilots] = useState();
    const selectedRows = useRef();

    //setInterval(() => {setMinutesLeft(minutesLeft - 1)}, 1000);

    const dispatch = useDispatch();
    const columns = [
        {
          name: 'place',
          label: 'Place',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'name',
          label: 'Pilot Name',
          options: {
            filter: true,
            sort: true
          }
        },
        {
          name: 'laps',
          label: 'Laps',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'lapTime',
          label: 'Lap Time (m:s)',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'gate',
          label: 'Current Gate',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'pace',
          label: 'Pace',
          options: {
            filter: true,
            sort: true
          }
        },
		{
          name: 'fast',
          label: 'Fast',
          options: {
            filter: true,
            sort: true
          }
        },
        {
          name: 'status',
          label: 'Status',
          options: {
            filter: true,
            sort: true
          }
        }
      ]

      const initRaceData = () => {
        const arr = [];
        getTable('drone-link', `race_${raceData.id}_stats`)
            .then(tableData => {
                tableData.result.map(d => {
                    const tableInfo = reduceRaceStat(d);

                    arr.push(tableInfo)
                });
                return arr;
        }).then(arr => setData(arr));
  
    }

    useEffect(() => {
      if (raceData.id && raceData.status === 'started') {
        const timer = setTimeout(() => {
          const timeRemaining = calculateTimeLeft();
          if (timeRemaining.minutes <= 0 && timeRemaining.seconds <= 0) {
            setTimeLeft(timeRemaining);
            setTimeExpired(true);
          }
          else if (!timeExpired) {
            setTimeLeft(timeRemaining);
          }
        }, 100);
      }
    }, [timeLeft]);

    useEffect(() => {
      if(!raceData.id) {
          dispatch(raceActions.init(props.match.params.name))
      }
  }, []);

    useEffect(() => {
      if (raceData.id) {
        initRaceData();
      }
    }, [raceData]);

    useEffect(() => {
        const socket = io();
        socket.on('race-ping', update => setUpdatedLog(update));
      }, []);

      useEffect(() => {
        if (!raceData.id) return;

        if (updatedLog.new) {

          const pilotStat = updatedLog.new;
          
          const tableInfo = reduceRaceStat(pilotStat);

          let newStatArray = [...data];
          const pilotIndex = getIndexById(data, pilotStat.id);

          if (newStatArray[pilotIndex].status === 'finished') return;

          if (timeExpired && tableInfo.gate === 1) {
            updateRacePilot(raceData.id, {id: tableInfo.id}, {status: 'finished'});
            tableInfo.status = 'finished';
            newStatArray[pilotIndex] = tableInfo;
            var end = true;
            for (var i = 0; i < newStatArray.length; i++) {
              console.log(newStatArray[i].status);
              if (newStatArray[i].status === 'racing') {
                end = false;
              }
            }
            console.log(end);
            if (end) {
              setRaceFinished(true);
              endRace(raceData);
            }
          }

          newStatArray[pilotIndex] = tableInfo;
          
          setData(newStatArray);
        }
      }, [updatedLog]);

      const colors = ['#ff4040', '#ffff40', '#39f755']

      const arrangeTimeline = () => {
        return (
          <div className={classes.timelineContainer}>
            {raceData.timers.map((timer, index) => {
              return (
                <Timeline className={classes.timeline} align={index < raceData.timers.length - 1 ? "right" : "left"}>
                  {data.map((pilot, i) => {
                    return (
                      <TimelineItem className={classes.timelineItem}>
                        <TimelineSeparator className={classes.timelineSeparator}>
                          {pilot.gate === timer ? (<TimelineDot className={classes.dot} style={{backgroundColor: colors[i]}} />) : (<TimelineDot className={classes.dot_outlined} variant="outlined" />)}
                          {i <= data.length - 2 ? (<TimelineConnector className={classes.connector} />) : (null)}
                        </TimelineSeparator>
                        {index === 0 ? (<TimelineContent className={classes.timelineContentContainer}>
                            <Paper className={classes.timelineContent_right}>
                              <Typography>{pilot.name}</Typography>
                            </Paper>
                          </TimelineContent>) : (null)}
                          {index === raceData.timers.length - 1 ? (<TimelineContent className={classes.timelineContentContainer}>
                            <Paper className={classes.timelineContent_left}>
                              <Typography>{`${pilot.laps} Laps`}</Typography>
                            </Paper>
                          </TimelineContent>) : (null)}
                      </TimelineItem>
                    )
                  })}
                </Timeline>
              )
            })}
            </div>
        )
      }

      const getIndexById = (array, id) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.id === id) return index;
        }
        return -1;
      }
      
      function msToTime(s) {
        var minutes = Math.floor(s / 60000);
        var seconds = ((s % 60000) / 1000).toFixed(2);
        return minutes + " : " + (seconds < 10 ? '0' : '') + seconds;
      }
      
      function getFastestLap(lapTimes) {
        if (lapTimes.length < 2) return 0;
        var fastestLap = lapTimes[0];
        for (let i = 0; i < lapTimes.length - 1; i++){
          if (fastestLap > lapTimes[i]){
            fastestLap = lapTimes[i];
          }
        }
        return fastestLap;
      }
      
      const reduceRaceStat = (raceStat) => {
        const id = raceStat.id;
        const place = raceStat.place;
        const name = raceStat.pilotName;
        //const team = d.team;
        const gate = raceStat.gate;
        const lapTimes = raceStat.lapTimes;
        const status = raceStat.status;
      
        const laps = lapTimes.length < 2 ? 0 : lapTimes.length - 1;
        const lapTime = lapTimes.length < 2 ? 0 : lapTimes[lapTimes.length - 2];
      
        let avgLapTime = 0;
        for (let index = 0; index < lapTimes.length - 1; index++) {
          const element = lapTimes[index];
          avgLapTime += element;
        }
      
        if (lapTimes.length < 2) {
          avgLapTime = 0;
        }
        else {
          avgLapTime /= (lapTimes.length - 1);
        } 
        var fastLap = msToTime(getFastestLap(lapTimes));
        var msLeft = (timeLeft.minutes * 60000) + (timeLeft.seconds * 1000);
        const pace = laps + (avgLapTime === 0 ? 0 : Math.floor(parseFloat(msLeft)/avgLapTime));
        const lapString = msToTime(lapTime);
        const avgLapString = msToTime(Math.round(avgLapTime));
        const displayPace = `${pace} / ${avgLapString}`;
      
        return {
          id: id,
          place: place,
          name: name,
          laps: laps,
          lapTime: lapString,
          gate: gate,
          pace: displayPace,
        fast: fastLap,
          status: status
        }
      }

      const classes = useStyles();

      

    return (
      <div>
        <RaceNavbar name={raceData.id}/>
        <StyledContainer maxWidth={"lg"}>
        <StyledRaceHeader>
          {timeExpired ? raceFinished ? 
          (<h1>Race Finished</h1>) :
          (<h1>Waiting for Pilots to Finish</h1>) :
          (<h1>Time Remaining:  {timeLeft.minutes} : {timeLeft.seconds.toString().padStart(2, '0')}</h1>)}
        </StyledRaceHeader>
          <StyledTable columns={columns} data={data}/>
          <div>
            {arrangeTimeline()}
          </div>
        </StyledContainer>
      </div>
    )
}