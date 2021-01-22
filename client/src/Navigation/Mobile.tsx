import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddLocation from '@material-ui/icons/AddLocation';
import { Link } from 'react-router-dom';
import black from '../assets/black.png';
import MobileSwitch from './MobileSwitch';

const tabProps = (index: number) => {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    component: (Link)
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const MobileHeader: React.FC = () => {
  
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
        </Tabs>
      </AppBar>
      <MobileSwitch />
    </div>
  );
};

export default MobileHeader;