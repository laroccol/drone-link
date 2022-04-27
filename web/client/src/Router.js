import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pages from "./pages";

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Pages.Landing}/>
            <Route exact path="/admin" component={Pages.Admin}/>
            <Route exact path="/race" component={Pages.Race} /> 
            <Route exact path="/pilot" component={Pages.Pilot} />
            <Route exact path="/pilot/:name" component={Pages.PilotInfo} />
            <Route exact path="/timer" component={Pages.Timer} />
            <Route exact path="/race/:name" component={Pages.ActiveRace} />
            <Route exact path="/race/:name/pilots" component={Pages.Pilots} />
            <Route exact path="/race/:name/timers" component={Pages.Timers} />
            <Route exact path="/race/:name/stats" component={Pages.RaceStats} />
            <Route exact path="/raceinactive/:name" component={Pages.RaceInfo} />
        </Switch>
    </BrowserRouter>
)