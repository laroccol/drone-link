import React from "react";
import { useHistory } from "react-router";
import CustomNavbar from "../../../../../components/navbar/custom";
import { ArrowBack, Home, Person, Timer, Equalizer } from "@material-ui/icons";

export default function RaceNavbar(props) {

    const history = useHistory();

    const home = `/race/${props.name}`;
    const pilots = `${home}/pilots`;
    const timers = `${home}/timers`;
    const raceStats = `${home}/stats`;

    const categories = [
        [{
            key: 'back',
            icon: <ArrowBack style={{color: "#424242"}}/>,
            tooltip: 'Back',
            action: () => history.push('/race'),
            active: 'false'
        }],
        [{
            key: 'home',
            icon: <Home style={{color: window.location.pathname === home ? "#FFF" : "#424242"}}/>,
            tooltip: 'Race Information',
            action: () => history.push(home)
        },
        {
            key: 'pilot',
            icon: <Person style={{color: window.location.pathname === pilots ? "#FFF" : "#424242"}}/>,
            tooltip: 'Pilots',
            action: () => history.push(pilots)
        },
        {
            key: 'timer',
            icon: <Timer style={{color: window.location.pathname === timers ? "#FFF" : "#424242"}}/>,
            tooltip: 'Timers',
            action: () => history.push(timers)
        },
        {
            key: 'stats',
            icon: <Equalizer style={{color: window.location.pathname === raceStats ? "#FFF" : "#424242"}}/>,
            tooltip: 'Race Stats',
            action: () => history.push(raceStats)
        }]
    ]
    return (
        <CustomNavbar categories={categories}/>
    )
}