import styled from 'styled-components';

import { Container, Modal, Button, TextField } from "@material-ui/core";

export const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledContainer = styled(Container)`
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    background-color: ${props => props.theme === 'dark' ? '#303030' : '#FFF'};
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledButton = styled(Button)`
    width: 100%;
`
export const StyledTextField = styled(TextField)`
    width: 100%;
    margin: 5px 5px 15px 5px;
`