
import styled from "styled-components";
import { Card, Modal, Container, CardContent, CardActionArea, Typography, TextField, IconButton, Select, CardHeader, Paper, Grid, LinearProgress, Input } from "@material-ui/core";
import MUIDatatable from 'mui-datatables';
import Timeline from "@material-ui/lab/Timeline";

export const StyledCard = styled(Card)`
  border-radius: 10px;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`

export const StyledCardContent = styled(CardContent)`
    color: #415A77;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const CardAction = styled(CardActionArea)`
  height: 100%;
  height: -webkit-fill-available;
  display: flex;
`

export const CardText = styled(Typography)`
    font-size: 19px;
`

export const StyledTable = styled(MUIDatatable)`
  margin-top: 15px;
`

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

export const StyledTextField = styled(TextField)`
    width: 100%;
    margin: 5px 5px 15px 5px;
`

export const StyledNumberInput = styled(Input)`
    width: 100%;
    margin: 5px 5px 15px 5px;
`

export const StyledSelect = styled(Select)`
    width: 150px;
    margin: 5px 5px 15px 5px;
`

export const AddTimerButton = styled(IconButton)`
    color: ${props => props.error === 'true' ? 'red': 'default'};
    &:hover {
        color: ${props => props.error === 'false' ? '#03fc73' : '#b00202'};
    }
`

export const StartRaceButton = styled(IconButton)`
    &:hover {
        color: #03fc73;
    }
`
export const EndRaceButton = styled(IconButton)`
    &:hover {
        color: #b00202;
    }
`

export const AddedTimerButton = styled(IconButton)`
    color: #03fc73;
    &:hover {
        color: red;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
`

export const HeaderCard = styled(Card)`
    margin-top: 5px;
    margin-bottom: 12px;
`

export const StyledHeader = styled(CardHeader)`
    .MuiCardHeader-subheader {
        color: ${props => props.status === 'started' ?  '#03fc73' : props.status === 'waiting' ?  'yellow' :'#b00202'};
    }
`

export const HeaderPaper = styled(Paper)`
    font-size: 16px;
    padding: 16px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    display: flex;
    flex-direction: row;
`

export const InfoCard = styled(Card)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    min-height: 300px;
    max-height: 300px;
    @media (max-width: 600px) {
        min-height: fit-content;
    }
    overflow: auto;
`

export const InfoRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 16px;
    justify-content: flex-start;
    &:hover {
        background-color: ${props => props.hover === 'true' ? '#525050' : 'inherit'};
        cursor: ${props => props.hover === 'true' ? 'pointer' : 'inherit'};
    }
`

export const RowHeaderText = styled(Typography)`
    font-weight: bold;
    margin-right: 10px;
`

export const RowText = styled(Typography)`
margin-right: 10px;
`

export const DetailGrid = styled(Grid)`
    margin-top: 5px;
`

export const PingCard = styled(InfoCard)`
    display: flex;
    flex-direction: column;
    max-height: inherit;
    min-height: inherit;
    height: 100%;
`

export const StyledProgressBar = styled(LinearProgress)`
    min-width: 500px;
    color: green;
    margin-right: 40px;
`

export const StyledRaceHeader = styled(Card)`
    min-width: 1200px;
    max-width: 1200px;
    margin-bottom: 15px;
    padding: 0px 15px 0px 15px;
`