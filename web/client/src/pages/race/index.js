import React, { useState, useEffect } from "react";
import InactiveRace from "./components/inactive";
import { StyledContainer } from "./styles";

export default function Race() {

    const [isActive, setIsActive] = useState(false);

    return (
        <StyledContainer maxWidth={"lg"}>
            {!isActive ? <InactiveRace/> : <div/>}
        </StyledContainer>
    )
}