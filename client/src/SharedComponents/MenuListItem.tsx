import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

interface MenuListItemProps {
  itemText: string;
  linkTo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  listText: {
    color: theme.palette.text.primary,
  },
}));

const MenuListItem: React.FC<MenuListItemProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    itemText, linkTo, icon, onClick,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <Link to={linkTo} style={{ textDecoration: 'none' }}>
        <ListItem button onClick={onClick}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={itemText} className={classes.listText} />
        </ListItem>
      </Link>
      <Divider />
    </div>

  );
};

export default MenuListItem;
