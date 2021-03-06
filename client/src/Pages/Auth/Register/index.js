import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import InputField from "../../../components/Form-Controls/InputFiled/index";
import PasswordField from "../../../components/Form-Controls/PasswordField/index";
import RadioField from "../../../components/Form-Controls/RadioField";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { register } from "../../../Redux/Action/authAction";
import { useHistory } from "react-router-dom";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    width: 80,
    height: 80,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    top: theme.spacing(1),
    margin: theme.spacing(8, 4),
  },
  navlink: {
    textDecoration: "none",
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = yup.object().shape({
    // title: yup.string().required('Please enter title'), 
    firstname: yup.string().required("Vui l??ng ??i???n h??? c???a b???n!"),
    lastname: yup.string().required("Vui l??ng ??i???n t??n c???a b???n!"),
    email: yup
      .string()
      .required("Vui l??ng ??i???n Email c???a b???n!")
      .email("Vui l??ng nh???p ?????a ch??? Email h???p l???!"),
    password: yup
      .string()
      .required("Vui l??ng ??i???n m???t kh???u")
      .min(6, "Vui l??ng ??i???n m???t kh???u l???n h??n 5 k?? t???"),

    retypePassword: yup
      .string()
      .required("Vui l??ng ??i???n l???i m???t kh???u!")
      .oneOf([yup.ref("password")], "m???t kh???u kh??ng kh???p!"),
  });
  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      retypePassword: "",
      gender: "male",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);
  const handleSubmit = async (values) => {
    console.log(values);
    dispatch(register(values));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <LockRoundedIcon />
          <Typography component="h1" variant="h5">
            ????ng k?? t??i kho???n
          </Typography>
          <form
            className={classes.form}
            onSubmit={form.handleSubmit(handleSubmit)}
            noValidate
          >
            <InputField name="firstname" label="H???" form={form} />
            <InputField name="lastname" label="T??n" form={form} />
            <InputField name="email" label="Email" form={form} />
            <PasswordField name="password" label="M???t kh???u" form={form} />
            <PasswordField
              name="retypePassword"
              label="X??c nh???n m???t kh???u"
              form={form}
            />
            <RadioField name="role" label="User" form={form} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ????ng k??
            </Button>
            <Grid container>
              <Grid item></Grid>
              <Grid item>
                <NavLink className={classes.navlink} to="/login">
                  {"B???n ???? c?? t??i kho???n? ????ng nh???p ngay"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
