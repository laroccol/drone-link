import React from "react";
import { useHistory } from "react-router";
import CustomNavbar from "../../../components/navbar/custom";
import { ArrowBack, Home, Person, Timer, Equalizer } from "@material-ui/icons";

export default function PilotInfoNav(props) {

    const history = useHistory();

    const categories = [
        [{
            key: 'back',
            icon: <ArrowBack style={{color: "#424242"}}/>,
            tooltip: 'Back',
            action: () => history.goBack(),
            active: 'false'
        }],
    ]
    return (
        <CustomNavbar categories={categories}/>
    )
}