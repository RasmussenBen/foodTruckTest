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
import { Input } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "@material-ui/core";

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
  itemName: "",
  itemdescription: "",
  price: "",
  image: ""
};

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setValues({ ...values, image: uploadedImage });
    }
  };
  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    console.log(uploadedImage);
  }, [uploadedImage]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.itemName.match(/^\w{5,11}$/g)) {
    }
    return;
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Menu Item
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                accept="image/*"
                fullWidth
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none"
                }}
              />
              <img
                onClick={() => imageUploader.current.click()}
                ref={uploadedImage}
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "10px"
                }}
                alt="click"
                fullWidth
              />
            </Grid>

            <Grid container spacing={2} sm={8}>
              <Grid item xs={12}>
                <TextField
                  name="itemName"
                  variant="outlined"
                  type="text"
                  required
                  fullWidth
                  onChange={onChange}
                  id="itemname"
                  label="Item name"
                  value={values.itemname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="itemdescription"
                  required
                  id="itemdescription"
                  type="text"
                  label="Item Description"
                  onChange={onChange}
                  value={values.itemdescription}
                  variant="outlined"
                  fullWidth
                  style={{ textAlign: "left" }}
                  hintText="Message Field"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="price"
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  onChange={onChange}
                  id="price"
                  label="Item price"
                  value={values.price}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Item
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
