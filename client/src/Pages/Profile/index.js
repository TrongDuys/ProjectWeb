import React, { useState } from "react";
import "./profile.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useSelector } from "react-redux";
import { Avatar, Button, CssBaseline, Grid, Typography } from "@material-ui/core";
import EditProfile from "./EditProfile";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
  },
  box: {
    width: "70%",
    // height: 500,
    backgroundColor: "grey",
    margin: "0 auto",
    marginTop: 20,
  },
  paper: {
    margin: theme.spacing(4, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  top: {
    width: "100%",
    height: "100%",
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  bottom:{
    width: "100%",
    height: "100%",
    marginTop: '30px',
  },
  text:{
    marginTop: 8,
  },
  link: {
    marginLeft: 20,
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const [edit, setEdit] = useState(false);
  return (
    <div className="wrapper">
    <div className="left">
      <img src={auth.user.avatar} alt="user" width={100} />
      <h4>{`${auth.user.firstname} ${auth.user.lastname}`}</h4>
      <p>{auth.user.role}</p>
    </div>
    <div className="right">
      <div className="info">
      
          <h3>Information</h3>

        
        <div className="info_data">
          <div className="data">
            <h4>Email</h4>
            <p>{auth.user.email}</p>
          </div>
          <div className="data">
            <h4>Phone</h4>
            <p>{auth.user.mobile}</p>
          </div>
        </div>
      </div>
      <div className="projects">
        {/* <h3>Projects</h3> */}
        <div className="projects_data">
          <div className="data">
            <h4>Địa chỉ</h4>
            <p>{auth.user.address}</p>
          </div>
          <div className="data">
            <h4>Giới thiệu</h4>
            <p>{auth.user.story}</p>
          </div>
        </div>
      </div>
      <div className="social_media">
        <ul>
          <li><FacebookIcon fontSize="large" /></li>
          <li><TwitterIcon fontSize="large" /></li>
          <li><YouTubeIcon  fontSize="large" /></li>
        </ul>
        <Button onClick={() => setEdit(true)} style={{fontSize: '13px', }} variant="outlined">Chỉnh sửa</Button>

      </div>
    </div>
    {edit && <EditProfile setEdit={setEdit} />}
  </div>
    // <div className={classes.box}>
    //   {/* <Grid container component="main" className={classes.root}>
    //     <CssBaseline />
    //     <Grid item xs={false} sm={6} md={6} className={classes.image} />
    //     <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
    //       <div className={classes.paper}>
    //         <div className={classes.top}>
    //           <Grid container>
    //             <Grid item xs={9}>
    //               <div style={{textAlign: 'center', paddingTop: '32px'}}>
    //                 <Typography variant="h5">{`${auth.user.firstname} ${auth.user.lastname}`}</Typography>
    //                 <Typography>{auth.user.role}</Typography>
    //               </div>
    //             </Grid>
    //             <Grid item xs={3} style={{paddingLeft: '0%'}}>
    //               <Avatar src={auth.user.avatar}  className={classes.large}/>
    //             </Grid>
    //           </Grid>
    //         </div>
    //         <div className={classes.bottom}>
    //           <Typography className={classes.text} color="primary"><strong>Email liên hệ:</strong> {auth.user.email}</Typography>
    //           <Typography className={classes.text} color="primary"><strong>Số điện thoại:</strong> {auth.user.mobile}</Typography>
    //           <Typography className={classes.text} color="primary"><strong>Địa chỉ:</strong> {auth.user.address}</Typography>
    //           <Typography className={classes.text} color="primary"><strong>Giới thiệu:</strong> {auth.user.story}</Typography>
    //         </div>
    //         <div className={classes.link}>
    //          <FacebookIcon fontSize="large" />
    //           <TwitterIcon fontSize="large" />
    //           <YouTubeIcon  fontSize="large" />
    //         </div>
    //       </div>
    //     </Grid>
    //   </Grid> */}
    //   {/* <header className="header">
    //       <i className="fa fa-bars" aria-hidden="true" />
    //     </header>
    //     <Button onClick={() => setEdit(true)} variant='outlined' style={{ marginTop: '7px', position: 'absolute', right: '10%'}}>
    //       Chỉnh sửa
    //     </Button>
    //     <main>
    //       <div className="profile">
    //         <div className="left col-lg-4">
    //           <div className="photo-left">
    //             <img className="photo" src={auth.user.avatar} alt="" />
    //           </div>
    //           <h4 className="name">{`${auth.user.firstname} ${auth.user.lastname}`}</h4>
    //           <p className="info">{auth.user.role}</p>
    //           <p className="info">{auth.user.email}</p>
    //           <p className="info">Điện thoại: {auth.user.mobile}</p>
    //           <p className="info">Địa chỉ: {auth.user.address}</p>
    //           <p className="desc">{auth.user.story}</p>
    //           <div className="social">
    //           <FacebookIcon />
    //             <TwitterIcon />
    //             <YouTubeIcon />
    //           </div>
    //         </div>
            
    //       </div></main>
    //       {edit && <EditProfile setEdit={setEdit} />} */}
    // </div>
  );
}

export default Profile;
