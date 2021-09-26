import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHttpClient } from "../hooks/http-hook";
import Copyrights from "../components/shared/Copyrights";
import { Avatar, Chip } from "@material-ui/core";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function HomeScreen() {
  const classes = useStyles();

  const history = useHistory();
  const redirectToLogin = () => {
    history.push("/login-as");
  };
  useEffect(() => {
    const authCookie = Cookies.get();
    console.log(authCookie);

    if (authCookie) {
      console.log("we are in");
    }
    /* if (storedData && storedData.token) {
      login(storedData.name, storedData.token, storedData.user);
    } */
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Not Authorized
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              You need logged into the system using your Google acccount to
              access the full features.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Button align="center" onClick={redirectToLogin} variant="outlined">
             Please Take Me to the Login
            </Button>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          SLIIT SSD Assignment 02
        </Typography>
        <Copyrights></Copyrights>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
