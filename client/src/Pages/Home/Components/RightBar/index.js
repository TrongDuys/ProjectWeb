import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Particles from 'react-particles-js';
import { Link, useParams } from "react-router-dom";
import { getUserActions } from "../../../../Redux/Action/getuserAction";

const useStyles = makeStyles((theme) => ({
  paper: {},
  container: {
    // paddingTop: theme.spacing(10),
    position: "sticky",
    top: theme.spacing(8),
    backgroundColor: "#f0f2f5",
    height: "calc(100vh - 63px)",
    paddingTop: theme.spacing(4),
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#555",
  },
  listitem: {
    padding: "10px 0",
  },
  reload: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    height: "200px",
    alignItems: "center",
  },
  linkSuggestions: {
    minWidth: "70%",
    textDecoration: "none",
    color: "black",
  },
  //   btn: {
  //     position: "absolute",
  //     width: 70,
  //     height: 29,
  //   },
}));
function RightBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getUserActions());
  }, [dispatch]);
  console.log(users.users);

  useEffect(() => {
    const rs = [];
    if (users) {
      users.users.filter((item) => {
        if (
          item.role === "Chuyên gia nông nghiệp" ||
          item.role === "Chuyên gia công nghệ"
        ) {
          rs.push(item);
        }
      });
      setUser(rs);
    }
  }, [users]);

  return (
    // <Paper elevation={1}>
    <Container className={classes.container}>
      <Box className={classes.reload}>
        <Typography className={classes.title} gutterBottom>
          Đề xuất chuyên gia 
        </Typography>

        {/* <IconButton>
          <ReplayRoundedIcon />
        </IconButton> */}
      </Box>

      <List>
        {user.map((item) => (
          <ListItem style={{ padding: 0 }}>
            <Link className={classes.linkSuggestions} to={`/`}>
              <ListItem button className={classes.listitem}>
                <ListItemAvatar>
                  <Avatar src={item.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${item.lastname} ${item.firstname}`} secondary={item.role} />
              </ListItem>
            </Link>
            {/* <IconButton size="small" edge="end">
              <Button className={classes.btn} variant="outlined">
                Follow
              </Button>
            </IconButton> */}
          </ListItem>
        ))}

        {/* <ListItem style={{ padding: 0 }}>
          <Link className={classes.linkSuggestions} to={`/`}>
            <ListItem button className={classes.listitem}>
              <ListItemAvatar>
                <Avatar src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Nam Vo"} />
            </ListItem>
          </Link>
          <IconButton size="small" edge="end">
            <Button className={classes.btn} variant="outlined">
              Follow
            </Button>
          </IconButton>
        </ListItem>
        <ListItem style={{ padding: 0 }}>
          <Link className={classes.linkSuggestions} to={`/`}>
            <ListItem button className={classes.listitem}>
              <ListItemAvatar>
                <Avatar src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Doan Duy"} />
            </ListItem>
          </Link>
        </ListItem>
        <ListItem style={{ padding: 0 }}>
          <Link className={classes.linkSuggestions} to={`/`}>
            <ListItem button className={classes.listitem}>
              <ListItemAvatar>
                <Avatar src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Xuan Truong"} />
            </ListItem>
          </Link>
        </ListItem>
        <ListItem style={{ padding: 0 }}>
          <Link className={classes.linkSuggestions} to={`/`}>
            <ListItem button className={classes.listitem}>
              <ListItemAvatar>
                <Avatar src="https://hinhnen123.com/wp-content/uploads/2021/06/anh-avatar-cute-dep-nhat-5.jpg"></Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Nguyen Hoai"} />
            </ListItem>
          </Link>
        </ListItem> */}
      </List>
      <hr></hr>
      <Box style={{ textAlign: "center" }}>
        <Typography color="textSecondary">Khoa Luan Tot Nghiep</Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <span color="inherit" to="facebook.com">
          Duy vs Nam
          </span>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
    // </Paper>
  );
}

export default RightBar;
