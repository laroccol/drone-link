import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { getWeatherByZip } from "../../api/weather";
import { WiDaySunny } from "weather-icons-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "relative",
    height: 250,
    width: 250,
    backgroundImage: "linear-gradient(rgba(21,76,121, 1), rgba(118,181,197, 0.7))",
    padding: "20px",
    color: "white",
  },
  control: {
    padding: theme.spacing(2),
  },
  temp: {
      fontSize: "60px",
      margin: "0",
  },
  paperText: {
      margin: "0",
  },
  iconDisplay: {
      position: "absolute",
      margin: "-25% 45%",
  }
}));

export default function WeatherWidget() {
    const [currentTemp, setCurrentTemp] = useState(0);
    const [highTemp, setHighTemp] = useState(0);
    const [lowTemp, setLowTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Batavia, IL');
    const [icon1, setIcon1] = useState('');
    const [icon2, setIcon2] = useState('');
    const [icon3, setIcon3] = useState('');

    const parseWeatherData = (weatherData) => {
        const loc = weatherData.name;
        const cTemp = Math.floor(weatherData.main.temp);
        const hTemp = Math.floor(weatherData.main.temp_max);
        const lTemp = Math.floor(weatherData.main.temp_min);
        const desc = weatherData.weather[0].main;
        const iconcode = weatherData.weather[0].icon;

        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        setIcon1(iconurl);
        setIcon2(iconurl);
        setIcon3(iconurl);
    
        setLocation(loc);
        setCurrentTemp(cTemp);
        setHighTemp(hTemp);
        setLowTemp(lTemp);
        setDescription(desc);
    }

    useEffect(() => {
        async function getWeatherData() {
            var weatherData = await getWeatherByZip("60510");
            console.log(weatherData);
            parseWeatherData(weatherData);
        }
        getWeatherData();
      }, []);

    const classes = useStyles();

    return (
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
            <Grid item>
                <Paper className={classes.paper}>
                <h3 className={classes.paperText}>Morning</h3>
                <h1 className={classes.temp}>{currentTemp}</h1>
                <img src={icon1} alt="morning" className={classes.iconDisplay} />
                <h2 className={classes.paperText}>{location}</h2>
                <h2 className={classes.paperText}>{description}</h2>
                <h4 className={classes.paperText}>{getDateString()}</h4>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                <h3 className={classes.paperText}>Afternoon</h3>
                <h1 className={classes.temp}>{highTemp}</h1>
                <img src={icon1} alt="afternoon" className={classes.iconDisplay} />
                <h2 className={classes.paperText}>{location}</h2>
                <h2 className={classes.paperText}>{description}</h2>
                <h4 className={classes.paperText}>{getDateString()}</h4>
                </Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                <h3 className={classes.paperText}>Evening</h3>
                <h1 className={classes.temp}>{lowTemp}</h1>
                <img src={icon1} alt="evening" className={classes.iconDisplay} />
                <h2 className={classes.paperText}>{location}</h2>
                <h2 className={classes.paperText}>{description}</h2>
                <h4 className={classes.paperText}>{getDateString()}</h4>
                </Paper>
            </Grid>
        </Grid>
        </Grid>
    </Grid>
    );
}

const getDateString = () => {
    var date = new Date();
    return date.toDateString();
}
