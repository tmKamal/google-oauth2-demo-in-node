import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import bgImage from "../../assets/images/dashboard-bg.png";
import MenuBtn from "../../components/menu-btn/MenuBtn";
import axios from "axios";

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

const LoginAs = () => {
  const classes = useStyles();
  const loginHandler = async (e) => {
    console.log('clicked')
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/auth/google/consent`
      );
      console.log(response.data);
      
      if (response && response.data) {
        
        window.location.href = response.data;
      } 
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
    
  };

  return (
    <div className={classes.root}>
      <Box my={0} mx={4}>
        <Grid lg={10} className={classes.layout} container spacing={3}>
          <Grid item xs={12}>
            <h1 className={classes.mainText}>Login Using</h1>
            <MenuBtn
              url={"/login-teacher"}
              name="Google"
              image="teacher"
              click={loginHandler}
            ></MenuBtn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default LoginAs;
