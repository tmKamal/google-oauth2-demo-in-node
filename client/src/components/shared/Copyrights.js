import { Typography } from "@material-ui/core";


export default function Copyrights() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      
        SLIIT -
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
