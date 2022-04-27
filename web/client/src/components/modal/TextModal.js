import React from "react";
import { Button, Modal, TextField, Typography } from "@material-ui/core";
import {StyledContainer, StyledModal, StyledForm, StyledButton, StyledTextField} from "./styles";

/**
 * 
 * @param {open, () => close, [textfield text], [textfield state], () => action} props a series of different attributes
 * 
 */
export default function TextModal(props) {
    return (
        <StyledModal open={props.open}
        onClose={props.onClose}>
            <StyledContainer theme={"dark"}>
                <StyledForm onSubmit={props.submit}>
                    {props.text.map((text, idx) => {
                        return (
                            <StyledTextField required label={text} onChange={e => props.onChange[idx](e.target.value)}/>
                        )  
                    })}
                    <div>
                        <StyledButton type="submit">Confirm</StyledButton>
                        <StyledButton onClick={props.onClose}>Cancel</StyledButton>
                    </div>
                </StyledForm>
            </StyledContainer>
        </StyledModal>
    )
}