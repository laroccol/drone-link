import styled from 'styled-components';
import { Card, Container, CardContent, CardActionArea, Typography } from "@material-ui/core";
import MUIDatatable from 'mui-datatables';


export const StyledContainer = styled(Container)`
    margin-top: 90px;
`;

export const StyledCard = styled(Card)`
  border-radius: 10px;
  max-height: 150px;
  min-height: 150px;
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
    color: whitesmoke;
`

export const StyledTable = styled(MUIDatatable)`
  margin-top: 15px;
`