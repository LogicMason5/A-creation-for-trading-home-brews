import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Help } from '@material-ui/icons';
import MenuListItem from '../SharedComponents/MenuListItem';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const AlwaysShowItems: React.FC = () => {

  const classes = useStyles();

  return (
        <div className={classes.root}>
              <MenuListItem
                itemText="FAQ"
                linkTo="/FAQ"
                icon={<Help />}
              />
        </div>
  );
};

export default AlwaysShowItems;