import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import bgImage from "../../assets/images/dashboard-bg.png";
import MenuBtn from "../../components/menu-btn/MenuBtn";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",

    marginTop: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    paddingTop: "30px",
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainText: {
    fontSize: "3.2rem",
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#666",
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "0rem",
    textShadow:
      "1px 0px 1px #ccc, 0px 1px 1px #eee, \n    2px 1px 1px #ccc, 1px 2px 1px #eee,\n    3px 2px 1px #ccc, 2px 3px 1px #eee,\n    4px 3px 1px #ccc, 3px 4px 1px #eee,\n    5px 4px 1px #ccc, 4px 5px 1px #eee,\n    6px 5px 1px #ccc, 5px 6px 1px #eee,\n    7px 6px 1px #ccc",
  },
}));

const DashBoardFront = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Box my={0} mx={4}>
        <Grid lg={10} className={classes.layout} container spacing={3}>
          <Grid item xs={12}>
            <h1 className={classes.mainText}>
              Google
              <br /> Features
            </h1>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MenuBtn
              name="Create Draft Mail"
              image="view"
              click={() => history.push("/create-draft")}
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MenuBtn
              name="Send an Email"
              image="add"
              click={() => history.push("/send-email")}
            ></MenuBtn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default DashBoardFront;
