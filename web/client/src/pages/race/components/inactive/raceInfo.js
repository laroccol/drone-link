import React, { useEffect, useState, useRef } from "react";
import { endRace, updateRace, updateRacePilot, getInactiveRace } from "../../../../api/race";
import InactiveRaceNavBar from './components/inactiveracenav';
import { StyledModal, StyledTable } from "../active/components/styles";
import { HeaderCard, StyledHeader, StyledProgressBar, StyledRaceHeader } from "../styles";
import { StyledContainer } from "../../styles";

export default function RaceInfo(props) {


    const [data, setData] = useState([]);
    const selectedRows = useRef();

    //setInterval(() => {setMinutesLeft(minutesLeft - 1)}, 1000);


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
          name: 'averageLapTime',
          label: 'Average Lap Time',
          options: {
            filter: true,
            sort: true
          }
        },
      ]

      const initRaceData = () => {
        const arr = [];
        getInactiveRace(props.match.params.name)
            .then(tableData => {
                var results = JSON.parse(tableData.result[0].stats);
                results.map(d => {
                    const tableInfo = reduceRaceStat(d);

                    arr.push(tableInfo);
                })

                return arr;
            
        }).then(arr => setData(arr));
  
    }

    useEffect(() => {
        initRaceData();
    }, []);

    return (
      <div>
        <InactiveRaceNavBar />
        <StyledContainer maxWidth={"lg"}>
            <StyledRaceHeader>
            <h1>Race Stats</h1>
            </StyledRaceHeader>
            <StyledTable columns={columns} data={data}/>
        </StyledContainer>
      </div>
    )
}

function msToTime(s) {
    var minutes = Math.floor(s / 60000);
    var seconds = ((s % 60000) / 1000).toFixed(2);
    return minutes + " : " + (seconds < 10 ? '0' : '') + seconds;
  }

const reduceRaceStat = (raceStat) => {
    const id = raceStat.id;
    const place = raceStat.place;
    const name = raceStat.pilotName;
    //const team = d.team;
    const gate = raceStat.gate;
    const lapTimes = raceStat.lapTimes;
  
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
  
    const lapString = msToTime(lapTime);
    const avgLapString = msToTime(Math.round(avgLapTime));
  
    return {
      id: id,
      place: place,
      name: name,
      laps: laps,
      lapTime: lapString,
      gate: gate,
      averageLapTime: avgLapString,
    }
  }