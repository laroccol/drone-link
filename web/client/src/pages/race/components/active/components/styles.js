import styled from 'styled-components';

import { Container, Modal, Button, TextField } from "@material-ui/core";
import MUIDatatable from "mui-datatables";

export const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledTable = styled(MUIDatatable)`
    min-width: 1200px;
    max-width: 1200px;
    margin-bottom: 15px;
`

export const StyledContainer = styled(Container)`
    max-width: fit-content;
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