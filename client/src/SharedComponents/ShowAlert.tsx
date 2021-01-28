import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { closeAlert  } from "../Navigation/displaySlice";
import { RootState } from '../rootReducer';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const ShowAlert:React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { snackbarOpen, alertType, alertMessage  } = useSelector((state: RootState) => state.display.alertState);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={alertType}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowAlert;
