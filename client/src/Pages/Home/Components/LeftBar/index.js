import { Box, Container, makeStyles, Typography } from "@material-ui/core";
// import { Bookmark, List, PlayCircleOutline, Storefront } from '@material-ui/icons';
// import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import TelegramIcon from '@material-ui/icons/Telegram';
// import VideogameAssetRoundedIcon from '@material-ui/icons/VideogameAssetRounded';
import React, { useEffect, useState } from "react";
// import Particles from 'react-particles-js';
import { NavLink } from "react-router-dom";
import axios from "axios";

// import particlesConfig from 'utils/paritcleConfig';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 65px)",
    color: "white",
    paddingTop: theme.spacing(2),
    backgroundColor: "#f0f2f5",
    position: "sticky",
    top: theme.spacing(8),
  },
  item: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(1.5),
      paddingLeft: theme.spacing(1),
      cursor: "pointer",
      "&:hover": {
        borderRadius: "5px",
        backgroundColor: "#e0e0e0",
      },
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    // fontSize: '35px',
    width: "40px",
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '18px',
    //   color: '#fff',
    // },
  },
  text: {
    fontWeight: 500,
    // color: 'grey',
    // [theme.breakpoints.down('sm')]: {
    //   display: 'none',
    // },
  },
  navbarlink: {
    textDecoration: "none",
    color: "#5C8D89",
  },
}));

function LeftBar(props) {
  const classes = useStyles();
  const isActive = {
    color: "#587850",
  };
  const [coords, setCoords] = useState({
    latitude: 16,
    longitude: 108,
  });
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("");

  const convert = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };
  const getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon("wi-thunderstorm");
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon("wi-sleet");
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon("wi-storm-showers");
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon("wi-snow");
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon("wi-fog");
        break;
      case rangeId === 800:
        setIcon("wi-day-sunny");
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon("wi-day-fog");
        break;
      default:
        setIcon("wi-day-fog");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(newCoords);

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=c4117c9d3296f4a33d12dee537d4858f`
          )
          .then((res) => {
            let userWeather = {
              city: res.data.name,
              country: res.data.sys.country,
              wind: res.data.wind.speed,
              celsius: convert(res.data.main.temp),
              temp_max: convert(res.data.main.temp_max),
              temp_min: convert(res.data.main.temp_min),
              description: res.data.weather[0].description,
              humidity: res.data.main.humidity,
              pressure: res.data.main.pressure,
              gust: res.data.wind.gust,
            };
            getWeatherIcon(res.data.weather[0].id);
            setWeather(userWeather);
          });
      });
    } else {
      console.log("notsuported");
    }
  }, [coords.latitude, coords.longitude]);
  const navLinkItem = [
    {
      text: "Trang chủ",
      icon: (
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/9BDqQflVfXI.png"
          className={classes.icon}
          alt=""
        />
      ),
      path: "/",
    },
    {
      text: "Phân tích",
      icon: (
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/tKwWVioirmj.png"
          className={classes.icon}
          alt=""
        />
      ),
      path: "/analyze",
    },
    {
      text: "Trò chuyện",
      icon: (
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/YF1bztyGuX-.png"
          className={classes.icon}
          alt=""
        />
      ),
      path: "/message",
    },
    // {
    //   text: "Covid-19",
    //   icon: (
    //     <img
    //       src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/qR88GIDM38e.png"
    //       className={classes.icon}
    //       alt=""
    //     />
    //   ),
    //   path: "/covid",
    // },
    {
      text: "Weather",
      icon: (
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/kULMG0uFcEQ.png"
          className={classes.icon}
          alt=""
        />
      ),
      path: "/weather",
    },
  ];
  return (
    <div className={classes.container}>
      {/* <Particles params={particlesConfig} height="100vh" width="25%" style={{ position: 'fixed' }}></Particles> */}
      <Container>
        {navLinkItem.map((link, index) => (
          <NavLink
            exact
            activeStyle={isActive}
            key={index}
            to={link.path}
            className={classes.navbarlink}
          >
            <div className={classes.item}>
              {link.icon}
              <Typography className={classes.text}>{link.text}</Typography>
            </div>
          </NavLink>
        ))}
        <Box style={{ width: "235px", height: "auto", backgroundColor: "grey",
         borderRadius: '5px', marginTop: '8px', marginBottom: '25px', position: "absolute", bottom: '0'}}>
          <Typography>{weather.city}</Typography>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" style={{ marginRight: "50px" }}>
              {weather.celsius}
              <sup>o</sup>C
            </Typography>
            <i className={`wi ${icon}`} style={{ fontSize: "30px" }}></i>
          </Box>
          <div style={{textAlign: 'center', marginTop: '5px'}}>
          <span style={{ marginRight: "10px", fontSize: "17px" }}>
            Max: {weather.temp_max}
            <sup>o</sup>C
          </span>
          <span style={{ fontSize: "17px" }}>
            Min: {weather.temp_min} <sup>o</sup>C
          </span>
          </div>
          
          <Typography style={{ fontWeight: "500" }} variant="h5" align="center">
            {weather.description}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default LeftBar;
