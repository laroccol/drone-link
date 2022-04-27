import React from 'react';
import defaultTheme from './theme';
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';


export default function ProvideTheme(props) {
    
    const theme = createMuiTheme({
        ...defaultTheme,
        ...props.overrride
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <React.Fragment>{props.children}</React.Fragment>
        </ThemeProvider>
    )

}