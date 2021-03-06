import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  root1: {
    backgroundColor: theme.palette.background.paper,
    // width: 703,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Post() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root1}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Tin T???c N??ng Nghi???p" {...a11yProps(0)} />
          <Tab label="Th???i Ti???t N??ng V???" {...a11yProps(1)} />
          <Tab label="Th??ng Tin Kh??c" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Card className={classes.root}>
            <CardHeader
              // avatar={
              //   <Avatar aria-label="recipe" className={classes.avatar}>
              //     R
              //   </Avatar>
              // }
              
              title="Tin T???c N??ng Nghi???p"
              subheader="January 10, 2022"
            />
            <a
              href="https://www.tintucnongnghiep.com/2019/03/luu-y-sau-benh-hai-lua-xuan.html"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                className={classes.media}
                image="https://2.bp.blogspot.com/-PtKfWuXsYrI/XIcS81ZlEsI/AAAAAAACjU4/u9WMnzjpQbMy-X5Yt_V9CCO7eENd30IQACLcBGAs/s230/lua.jpg"
                title="Paella dish"
              />
            </a>

            <CardContent>
              <Typography variant="h5">
                L??u ?? s??u b???nh h???i l??a m??a xu??n
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Theo d??? b??o c???a Trung t??m D??? b??o kh?? t?????ng th???y v??n Trung ????ng,
                th???i ti???t v??? xu??n 2022 n??ng ???m, n???ng n??ng ?????n s???m
              </Typography>
            </CardContent>
          </Card>
          {/* <Card className={classes.root}>
            <CardHeader
              // avatar={
              //   <Avatar aria-label="recipe" className={classes.avatar}>
              //     R
              //   </Avatar>
              // }
             
              title="Tin T???c N??ng Nghi???p"
              subheader="September 14, 2016"
            />
            <a
              href="https://www.tintucnongnghiep.com/2019/03/luu-y-sau-benh-hai-lua-xuan.html"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                className={classes.media}
                image="https://2.bp.blogspot.com/-PtKfWuXsYrI/XIcS81ZlEsI/AAAAAAACjU4/u9WMnzjpQbMy-X5Yt_V9CCO7eENd30IQACLcBGAs/s230/lua.jpg"
                title="Paella dish"
              />
            </a>

            <CardContent>
              <Typography variant="h5">
                L??u ?? s??u b???nh h???i l??a m??a xu??n
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Theo d??? b??o c???a Trung t??m D??? b??o kh?? t?????ng th???y v??n Trung ????ng,
                th???i ti???t v??? xu??n 2019 n??ng ???m, n???ng n??ng ?????n s???m
              </Typography>
            </CardContent>
          </Card> */}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Card className={classes.root}>
            <CardHeader
              // avatar={
              //   <Avatar aria-label="recipe" className={classes.avatar}>
              //     R
              //   </Avatar>
              // }
              
              title="Th???i ti???t n??ng v???"
              subheader="17:48 06/01/2022"
            />
            <a
              href="https://hatinhtv.vn/vi/chuyen-muc/tin-bai/105768/du-bao-thoi-tiet-nong-vu-tu-0701-den-11012022"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                className={classes.media}
                image="https://hatinhtv.vn/uploads/thumbs/16414661185310.jpg"
                title="Paella dish"
              />
            </a>

            <CardContent>
              <Typography variant="h5">
                D??? b??o th???i ti???t n??ng v??? t??? 07/01 ?????n 11/01/2022
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Card className={classes.root}>
            <CardHeader
              
              title="Gi?? n??ng s???n"
              subheader="17:48 06/01/2022"
            />
            <a
              href="https://snnptnt.binhdinh.gov.vn/gia-ca-thi-truong/581-581.html"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                className={classes.media}
                image="https://snnptnt.binhdinh.gov.vn/uploads/news//upload/images/traicay.jpg"
                title="Paella dish"
              />
            </a>

            <CardContent>
              <Typography variant="h5">
              Gi?? c??? th??? tr?????ng m???t s??? m???t h??ng n??ng s???n v?? v???t t?? n??ng nghi???p tu???n qua
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
