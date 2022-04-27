import React from 'react';
import { Divider, List, ListItem, ListItemIcon, Tooltip } from "@material-ui/core";
import { StyledDrawer } from "./styles";

//Categories: [[{}], [{}]]
export default function CustomNavbar(props) {
    return (
        <StyledDrawer variant={"permanent"}>
            {props.categories.map((cats, i) => {
                return (
                    <div>
                        <List>
                            {cats.map(cat => {
                                return (
                                <Tooltip title={cat.tooltip}>
                                    <ListItem button key={cat.key} onClick={cat.action}>
                                        {cat.icon}
                                    </ListItem>
                                </Tooltip>
                                )
                            })}
                        </List>
                        {i !== props.categories.length - 1 ? <Divider/> : null}
                    </div>
                )
            })}
        </StyledDrawer>
    )
}