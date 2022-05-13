import React, { useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Action/authAction";
import { Link } from "react-router-dom";
import PieChartIcon from "@material-ui/icons/PieChart";
import SearchCard from "../Search/SearchCard";
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    zIndex: 1100,
    position: "sticky",
    top: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    marginRight: "30px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    width: "50%",
    // [theme.breakpoints.down('sm')]: {
    //   display: (props) => (props.open ? 'flex' : 'none'),
    //   width: '60%',
    //   alignItems: 'center',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    // display: (props) => (props.open ? 'none' : 'flex'),
  },
  searchButton: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  cancel: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    alignItems: "center",
  },
}));

function Header(props) {
  const [open, setOpen] = useState(false);

  const classes = useStyles({ open });

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            // edge="start"
            // className={classes.menuButton}
            // color="inherit"
            // aria-label="open drawer"
            
          >
            <img
              src="https://logodep.vn/wp-content/uploads/2017/01/thiet-ke-logo-cong-ty-hoi-nhap-_1292835984.jpg"
              className={classes.icon}
              alt=""
              width={30}
             />
            {/* <MenuIcon /> */}
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              Nông Nghiệp CX
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/message" style={{ color: "white" }}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <MailIcon />
              </IconButton>
            </Link>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <MenuItem>Hồ sơ</MenuItem>
        </Link>

        <MenuItem onClick={() => dispatch(logout())}>Đăng Xuất</MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
