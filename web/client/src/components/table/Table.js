/**
 * Custom Table, handles "scaling" as well as mobile view when utilizing a 
 * device with at most an innter width of 414px
 */

import React, { useState } from "react";
import PropType from "prop-types";
import { Table, TableRow, TableCell, TableBody, Menu, MenuItem } from "@material-ui/core";
import { StyledTableHead, StyledTableRow, StyledMobileTable, MobileHeaderCell } from "./styles";


/**
 * Creates the datatable
 * @param {data, columns, handleRowClick} props to set columns, data, as well as row functionality
 */
const CTable = props => {

    const initalMouse = {
        mouseX: null,
        mouseY: null
    }

    const isMobile = window.innerWidth <= 414;

    const [mouseState, setMouseState] = useState(initalMouse);

    const handleRightClick = event => {
        event.preventDefault();
        setMouseState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4
        });
        props.rightClickedObject(event.currentTarget);
    }

    const closeContext = () => {
        setMouseState(initalMouse)
    }

    /**
     * Makes sure text is not selected when clicking the row
     */
    const handleRowClick = event => {
        if(window.getSelection().type !== 'Range') {
            props.handleRowClick(event);
        }
    }

    /**
     * Generates desktop/ipad versions of the datatable. 
     */
    const generateTable = () => {

        return (
            <Table>
                <StyledTableHead color={"primary"}>
                    <TableRow data-testid={'column-headers'}>
                        {props.columns.map((column, index) => {
                            return index === 0 ? <TableCell style={{fontWeight: "bolder"}} key={index}>{column}</TableCell> : <TableCell style={{fontWeight: "bolder"}} align="right" key={index}>{column}</TableCell>;
                        })}
                    </TableRow>
                </StyledTableHead>
                <TableBody data-testid={'data-rows'}>

                    {props.data.map((dep, dex) => {
                        return (
                            <StyledTableRow id={dex.toString()} key={dex} onClick={handleRowClick} onContextMenu={props.contextOptions ? handleRightClick : null} hashover={props.handleRowClick ? 'true' : 'false'}>
                                {
                                    Object.keys(dep).map((key, keyDex) => {
                                        return (
                                            keyDex === 0 ? <TableCell component={"th"} scope={"row"} key={keyDex}>{dep[key]}</TableCell> : <TableCell align="right" key={keyDex}>{dep[key]}</TableCell>
                                        )
                                    })
                                }
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }

    /**
     * Generates the mobile version of the datatable
     */
    const generateMobileTable = () => {
        return (
            <div>
                {props.data.map((dep, index) => {
                    let color = "inherit";
                    return (
                        <StyledMobileTable color={color} key={index.toString()} onClick={props.handleRowClick} >
                            <TableBody>
                                {props.columns.map((column, dex) => {
                                    return (
                                        <StyledTableRow id={dex.toString()} key={dex} hashover={props.handleRowClick ? 'true' : 'false'}>
                                            <MobileHeaderCell component="th" scope="row">
                                                {column}:
                                        </MobileHeaderCell>
                                            <TableCell>{dep[Object.keys(dep)[dex]]}</TableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </StyledMobileTable>
                    )
                })}
            </div>
        )
    }

    /**
     * Table, based upon wheter mobile or desktop
     */
    return (
        <div onContextMenu={(event) => { props.contextOptions ? event.preventDefault() : null }}>
            {isMobile ? generateMobileTable() : generateTable()}
            {props.contextOptions ?
                <Menu
                    keepMounted
                    open={mouseState.mouseY !== null}
                    onClose={closeContext}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        mouseState.mouseY !== null && mouseState.mouseX !== null ?
                            { top: mouseState.mouseY, left: mouseState.mouseX } : undefined
                    }>
                    {props.contextOptions.map(option => {
                        const clickAction = () => {
                            option.action();
                            closeContext();
                        }
                        return <MenuItem key={option.label} onClick={clickAction}>{option.label}</MenuItem>
                    })}
                </Menu> : <div />}
        </div>
    )

}

CTable.propTypes = {
    columns: PropType.array.isRequired,
    data: PropType.array.isRequired,
    handleRowClick: PropType.func,
    rightClickedObject: PropType.func,
    contextOptions: PropType.array
}

export default CTable;