import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MyLocation from '@material-ui/icons/MyLocation';

interface LocateButtonProps {
  onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  locateButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const LocateButton: React.FC<LocateButtonProps> = ({ onClick }) => {

  const classes = useStyles();

  return (
      <Fab color="primary" size="medium" className={classes.locateButton} onClick={onClick}>
        <MyLocation fontSize="large"/>
      </Fab>
  );
};

export default LocateButton;