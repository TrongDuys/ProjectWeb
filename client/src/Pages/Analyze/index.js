import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  makeStyles,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ANALYZE_TYPES, getInfo } from "../../Redux/Action/analyzeAction";
import LeftBar from "../Home/Components/LeftBar";
import "./analyze.css";
import Infomation from "./Components/tab";

const useStyles = makeStyles((theme) => ({
  img: {
    margin: "0 auto",
    cursor: "pointer",
    position: "relative",
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    backgroundColor: "#f0f2f5",
  },
  box: {
    backgroundColor: "#f0f2f5",
  },
  container: {
    backgroundColor: "#f0f2f5",
  },
  containerchild: {
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "20px",
    marginTop: 20,
  },
  bookmark: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  close: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },

  sick: {
    padding: 20,
    textAlign: "center",
  },
  imageList: {
    width: 256,
  },
}));

function Analyze(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { analyze } = useSelector((state) => state);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState();
  const [name, setName] = useState("");
  const [nameSub, setNameSub] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [rsCoorX, setRsCoorX] = useState();
  const [rsCoorY, setRsCoorY] = useState();
  const [rsWidth, setRsWidth] = useState();
  const [rsHeight, setRsHeight] = useState();
  const [probability, setProbability] = useState("");

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    var objectUrl = URL.createObjectURL(file);
    img.onload = function () {
      URL.revokeObjectURL(objectUrl);
      setWidth(this.width);
      setHeight(this.height);
    };
    img.src = objectUrl;
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected || selected === "0") {
      const formData = new FormData();
      formData.append("img_file", image);
      dispatch({ type: ANALYZE_TYPES.LOADING, payload: true });
      axios
        // .post("https://agriculture.edt.onl/api/v2/plant_diseases", formData)
        .post("https://agriculture.dirox.dev/api/v2/plant_diseases", formData)
        .then((rs) => {
          // console.log("ca-chua", rs);
          setRsCoorX(rs.data.diseases[0].location[0]);
          setRsCoorY(rs.data.diseases[0].location[1]);
          setRsWidth(rs.data.diseases[0].location[2]);
          setRsHeight(rs.data.diseases[0].location[3]);
          setResult(rs);
          setName(rs.data.diseases[0].disease);
          convertName(rs.data.diseases[0].disease);
          setProbability(rs.data.diseases[0].probability);
          dispatch({ type: ANALYZE_TYPES.LOADING, payload: false });
        });
    } else {
      const formData = new FormData();
      formData.append("img_file", image);
      dispatch({ type: ANALYZE_TYPES.LOADING, payload: true });
      axios
        .post("https://agriculture.edt.onl/api/v2/mango/diseases", formData)
        // .post("https://agriculture.dirox.dev/api/v2/mango/diseases", formData)
        .then((rs) => {
          // console.log("xoai", rs);
          // console.log(rs.data.diseases.diseases[0].disease);
          setRsCoorX(rs.data.diseases.diseases[0].location[0]);
          setRsCoorY(rs.data.diseases.diseases[0].location[1]);
          setRsWidth(rs.data.diseases.diseases[0].location[2]);
          setRsHeight(rs.data.diseases.diseases[0].location[3]);
          setResult(rs);
          setName(rs.data.diseases.diseases[0].disease);
          convertName(rs.data.diseases.diseases[0].disease);
          setProbability(rs.data.diseases.diseases[0].probability);

          dispatch({ type: ANALYZE_TYPES.LOADING, payload: false });
        });
    }
  };
  console.log('name', name);

  const data = ["Cà Chua", "Xoài"];
  const handleSelect = (e) => {
    setSelected(e.target.value);
    setResult("");
    setRsCoorX("");
    setRsCoorY("");
    setRsWidth("");
    setRsHeight("");
    setName("");
    setImage(null);
  };
  // console.log(selected);
  const handleReAnalyze = () => {
    setResult("");
    setResult("");
    setRsCoorX("");
    setRsCoorY("");
    setRsWidth("");
    setRsHeight("");
    setNameSub("");
    setName("");
    setImage(null);
  };
  useEffect(() => {
    if (name) {
      dispatch(getInfo(name));
    }
  }, [ dispatch, name]);

  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    if (result) {
      console.log("step1");
      const canvasEle = canvas.current;
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;

      // get context of the canvas
      ctx = canvasEle.getContext("2d");
    }
  }, [result]);

  useEffect(() => {
    if (result) {
      console.log("step2");
      const a = width / 256; //10
      const b = height / 256; // 5.625
      const r1Info = {
        x: rsCoorX / a,
        y: rsCoorY / b,
        w: (rsWidth - rsCoorX) / a,
        h: (rsHeight - rsCoorY) / b,
      };
      drawRect(r1Info);
    }
  }, [result]);

  // draw rectangle
  const drawRect = (info, style = {}) => {
    console.log("step3");
    const { x, y, w, h } = info;
    const { borderColor = "red", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };
  const convertName = (name) => {
    switch (true){
      case name === 'Late_blight':
        setNameSub('Bệnh úa muộn');
        break;
      case name === 'Tomato_Yellow_Leaf_Curl_Virus':
        setNameSub('Bệnh vàng xoắn lá');
        break;
      case name === 'Tomato_mosaic_virus':
        setNameSub('Bệnh khảm lá');
        break;
      case name === 'Bacterial_spot':
        setNameSub('Bệnh đốm vi khuẩn');
        break;
      case name === 'Septoria_leaf_spot':
        setNameSub('Bệnh đốm lá Septoria');
        break;
      case name === 'Early_blight':
        setNameSub('Bệnh cháy lá sớm');
        break;
      case name === 'Leaf_Mold':
        setNameSub('Bệnh mốc xám');
        break;
      case name === 'Spider_mites Two-spotted_spider_mite':
        setNameSub('Bệnh ve nhện');
        break;
      case name === 'Target_Spot':
        setNameSub('Bệnh đốm vòng');
        break;
      case name === 'healthy':
        setNameSub('Lá khỏe mạnh');
        break;
      case name === 'mictis_longicornis':
        setNameSub('Bệnh héo lá');
        break;
      case name === 'apoderus_javanicus':
        setNameSub('Bệnh úa lá');
        break;
      case name === 'dappula_tertia':
        setNameSub('Bệnh sâu bướm ăn lá');
        break;
      case name === 'neomelicharia_sparsa':
        setNameSub('Bệnh phấn trắng');
        break;
      case name === 'normal':
        setNameSub('Lá khỏe mạnh');
        break;
      case name === 'procontarinia_rubus':
        setNameSub('Bệnh ghẻ xoài');
        break;
      case name === 'mango_anthracnose':
        setNameSub('Bệnh thán thư');
        break;
      case name === 'red_rust':
        setNameSub('Bệnh trỉ đỏ');
        break; 
      default:
        setNameSub(name);
    }
  }
  //console.log('111111111111111111111111111',nameSub);

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid className={classes.bookmark} item lg={3} md={3} sm={0} xs={0}>
          <LeftBar />
        </Grid>
        <Grid
          item
          lg={9}
          md={9}
          sm={0}
          xs={0}
          className={classes.box}
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <div style={{ display: "flex" }}>
            <InputLabel
              htmlFor=""
              shrink
              style={{
                fontSize: "22px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Chọn Loại Lá
            </InputLabel>
            <div style={{ paddingTop: "15px" }}>
              <FormControl>
                <NativeSelect
                  value={selected}
                  onChange={handleSelect}
                  inputProps={{
                    name: "country",
                    id: "country-selector",
                  }}
                >
                  {data.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>
            </div>
          </div>

          <Grid container className={classes.containerchild}>
            <Grid item xs={12} className={classes.sick}>
              {result ? (
                <>
                  <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {/* {result.data.diseases[0].disease} */}
                    {nameSub}
                  </span>
                  <span style={{ fontSize: "20px" }}>
                    {" "}
                    {/* ({result.data.diseases[0].probability}%) */}
                    ({probability}%)
                  </span>
                </>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={4}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="upload">
                  <center className="center_upload">
                    <label className="label">
                      <ImageList
                        rowHeight={256}
                        className={classes.imageList}
                        cols={1}
                      >
                        <ImageListItem>
                          {/* <div style={{ width: "256px", height: "256px" }}> */}
                          <img
                            className={classes.img}
                            width="100%"
                            height="100%"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : "https://picsum.photos/256"
                            }
                            alt=""
                          />
                          {result && (
                            <canvas
                              style={{
                                position: "absolute",
                                left: "0",
                                top: "0",
                                width: "256px",
                                height: "256px",
                              }}
                              ref={canvas}
                            ></canvas>
                          )}

                          {/* </div> */}

                          <ImageListItemBar
                            style={{ width: "256px", margin: "0 auto" }}
                            actionIcon={
                              <IconButton
                                aria-label={`info about $'aaaa'}`}
                                className={classes.icon}
                              >
                                <label htmlFor="file_up">
                                  <PhotoCamera
                                    htmlFor="file_up"
                                    style={{ color: "white" }}
                                  />
                                </label>
                              </IconButton>
                            }
                          />
                        </ImageListItem>
                      </ImageList>
                    </label>
                    <br />
                    {result ? (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleReAnalyze}
                          style={{ margin: "5px" }}
                        >
                          Phân tích
                        </Button>
                      </div>
                    ) : (
                      <div style={{ width: "256px", margin: "0 auto" }}>
                        <span className="icon">
                          <input
                            type="file"
                            name="img_file"
                            id="file_up"
                            accept="image/*"
                            onChange={handleChangeImage}
                            style={{ display: "none" }}
                          />
                        </span>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={image ? false : true}
                        >
                          {analyze.loading && (
                            <CircularProgress
                              style={{
                                color: "white",
                                width: "20px",
                                height: "20px",
                                padding: "0",
                                marginRight: "6px",
                                marginLeft: "-10px",
                              }}
                            />
                          )}
                          Phân Tích
                        </Button>
                      </div>
                    )}
                  </center>
                </div>
              </form>
            </Grid>

            <Grid item xs={4}>
              {/* <Typography variant="h6">Biểu hiện bệnh</Typography>
              {
                result ?  <Typography>{analyze.info ? analyze.info.symptom : '' }</Typography> : ''
              } */}
              {result ? (
                <>
                  <Infomation
                    symptom={analyze.info.symptom}
                    reason={analyze.info.reason}
                    solution={analyze.info.solution}
                    url={analyze.info.url}
                  />
                  <Box>
                    <Typography style={{ width: "750px", marginTop: "10px" }}>
                      Link tham khảo:{" "}
                      <a target="_blank" href={analyze.info.url}>
                        {analyze.info.url}
                      </a>
                    </Typography>
                  </Box>
                </>
              ) : (
                <div>
                  <Typography>
                    Chưa có dữ liệu hiển thị. Vui lòng chọn ảnh để xem{" "}
                  </Typography>
                </div>
              )}
            </Grid>
            {/* <Grid item xs={4}>
              <Typography variant="h6">Nguyên nhân bệnh</Typography>
              {
                result ?  <Typography>{analyze.info ? analyze.info.reason : ''}</Typography> : ''
              }
              
            </Grid> */}
          </Grid>
          {/*  */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Analyze;
