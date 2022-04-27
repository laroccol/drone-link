import styled from "styled-components";
import { TableCell, TableRow, TableHead, Table } from "@material-ui/core";

export const StyledTableHead = styled(TableHead)`
`
export const StyledTableRow = styled(TableRow)`
    &:hover {
        cursor: ${props => props.hashover === 'true' ? 'pointer' : 'inherit'};
        background-color: ${props => props.hashover === 'true' ? 'rgba(135, 179, 174, .15)' : 'inherit'};
    }
`
export const StyledMobileTable = styled(Table)`
    background-color: ${props => props.color};
`
export const MobileHeaderCell = styled(TableCell)`
    font-weight: bold;
`