import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { IconButton } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const initialValues = {
  username: "",
  password: "",
  email: "",
  location: "",
  trucks: []
};

export default function SignUp() {
  const classes = useStyles();
  const [truckForm, setTruckForm] = useState("");
  const [values, setValues] = useState(initialValues);
  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log(values);
  }, [values]);

  const addTruck = (e) => {
    e.preventDefault();
    setValues({ ...values, trucks: [...values.trucks, truckForm] });
  };

  const handelChanges = (e) => {
    const { value } = e.target;
    setTruckForm(value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      values.username.match(/^\w{5,11}$/g) &&
      values.password.match(/^[.\S]{7,15}$/g) &&
      values.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
    ) {
    }
    return;
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation(position.coords.latitude + "," + position.coords.longitude);
  }
  getLocation();

  function locationSet() {
    setValues({ ...values, location: location });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <input
                name="username"
                variant="outlined"
                required
                fullWidth
                onChange={onChange}
                id="username"
                label="Username"
                value={values.username}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                onChange={onChange}
                value={values.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                onChange={onChange}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                variant="outlined"
                required
                fullWidth
                label="Location"
                type="address"
                id="location"
                onChange={onChange}
                value={values.location}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={locationSet}>
                      <LocationSearchingIcon />
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <TextField
                  onChange={(e) => handelChanges(e)}
                  value={truckForm}
                />
              </div>
              {values.trucks.map((truck) => {
                return (
                  <div>
                    <Button onClick={(e) => {}}>{truck}</Button>
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={(e) => addTruck(e)}
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Truck
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
