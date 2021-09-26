import React, { useState, useContext } from "react";
import axios from "axios";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
  
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AuthContext } from "../../context/auth-context";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },

  button: {
    marginTop: theme.spacing(3),
  },
  // eslint-disable-next-line
  layout: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const SendMail = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
 
  const [msg, setMsg] = useState();
  const [error, setError] = useState();
 
  const [values, setValues] = useState({
    to: "",
    from: auth.user.email,
    message: "",
    subject: "",
    
  });

  const { to, from, subject, message   } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    setError(null);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const mailInfo = {
      to,
      from,
      message,
      subject,
      
    };
    console.log(mailInfo);
    try {
      const responseData = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/mail/gmail/send-mail`,mailInfo,{withCredentials:true});
      console.log(responseData);
      if (responseData) {
        setValues({
          to: "",
          message: "",
          subject: "",
     

        });
        console.log(responseData);
        setMsg(true);
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Grid
        md={5}
        xs={10}
        style={{ marginTop: "100px" }}
        className={classes.layout}
      >
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Send an Email
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  required
                  onChange={onChangeHandler("to")}
                  value={to}
                  id="to"
                  name="to"
                  variant="outlined"
                  label="Receiver's Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                     onChange={onChangeHandler("message")}
                  id="outlined-multiline-static"
                  label="Message"
                  value={message}
                  multiline
                  rows={4}
                  defaultValue={message}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("subject")}
                  value={subject}
                  id="subject"
                  name="subject"
                  variant="outlined"
                  label="Subject"
                  
                  fullWidth
                />
              </Grid>
              

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error}</strong> Please refresh your browser and sign into your account again.
                  </Alert>
                </Grid>
              )}
              {msg && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <AlertTitle>Success !!</AlertTitle>
                    Mail has been sent successfully.
                  </Alert>
                </Grid>
              )}
            </Grid>

            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
                href="/"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Send
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};
export default SendMail;
