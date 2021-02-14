import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Help } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import MenuListItem from '../SharedComponents/MenuListItem';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accountMenuRoot: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const AlwaysShowItems: React.FC = () => {

  const classes = useStyles();

  return (
        <div className={classes.accountMenuRoot}>
          <Grid item >
            <List component="nav" aria-label="account menu list">
              <MenuListItem
                itemText="FAQ"
                linkTo="/FAQ"
                icon={<Help />}
              />
            </List>
          </Grid>
        </div>
  );
};

export default AlwaysShowItems;