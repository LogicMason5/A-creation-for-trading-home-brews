import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocation from '@material-ui/icons/AddLocation';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import black from '../assets/black.png';
import MobileSwitch from './MobileSwitch';
import Box from '@material-ui/core/Box';

const tabProps = (index: number) => {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    component: (Link)
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  mobileContentBox: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  toolbarBuffer: theme.mixins.toolbar
}));

const MobileHeader: React.FC = () => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Box className={classes.mobileContentBox}>
        <AppBar position="fixed">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="off"
            aria-label="mobile tabs"
          >
            <Tab icon={<img src={black} alt="homeButton" height="40px" />}
              aria-label="map"
              to="/"        
              {...tabProps(0)} fullWidth
            />
            <Tab icon={<AddLocation />}
              aria-label="create-offer"
              to="/create-offer"
              {...tabProps(1)}
            />
            <Tab icon={<AccountCircle />}
              aria-label="user-"
              to="/my-account"
              {...tabProps(2)}
            />
          </Tabs>
        </AppBar>
        <div className={classes.toolbarBuffer} />
        <MobileSwitch />
    </Box>
  );
};

export default MobileHeader;