import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import LeftBar from "./Components/LeftBar/index";
import Post from "./Components/Post/index";
import RightBar from "./Components/RightBar";
// import RightBar from "./components/RightBar";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    backgroundColor: "#f0f2f5",
  },
  box: {
    backgroundColor: "#f0f2f5",
    // marginTop: theme.spacing(9)
  },
  container: {
    backgroundColor: "#f0f2f5",
  },
  bookmark: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

let scroll = 0;

function Home(props) {
  const classes = useStyles();

  window.addEventListener("scroll", () => {
    if ((window.location.patchname = "/")) {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid className={classes.bookmark} item lg={3} md={3} sm={0} xs={0}>
          <LeftBar />
        </Grid>
        {/* <Grid item sm={0} xs={0} className={classes.box} style={{ backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }} /> */}
        <Grid
          item
          lg={5}
          md={5}
          sm={12}
          xs={12}
          className={classes.box}
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <Post />
        </Grid>
        <Grid
          item
          lg={1}
          md={1}
          sm={0}
          xs={0}
          className={classes.box}
          style={{ backgroundColor: "#f0f2f5" }}
        />
        <Grid item lg={3} md={3} sm={0} xs={0} className={classes.right}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
