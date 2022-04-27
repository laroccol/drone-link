import styled from 'styled-components';
import MUIDatatable from "mui-datatables";
import { Container, Card, CardContent, CardActionArea, Typography } from '@material-ui/core';

export const StyledTable = styled(MUIDatatable)`
    margin-top: 15px;
`

export const StyledContainer = styled(Container)`
    margin-top: 90px;
`

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