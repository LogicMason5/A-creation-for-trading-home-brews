import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { LocalOffer, PersonAdd } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => createStyles({
  listText: {
    color: theme.palette.text.primary,
  },
}));

const NotLoggedItems: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Link to="/login" className={classes.listText} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <LocalOffer />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </ListItem>
      </Link>
      <Divider />
      <Link to="/register" className={classes.listText} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </Link>
    </div>
  );
};

export default NotLoggedItems;
