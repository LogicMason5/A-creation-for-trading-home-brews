import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';



const useStyles = makeStyles((theme: Theme) => createStyles({

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },

}));


const Main: React.FC = () => {

  const classes = useStyles();

  return (
    <div>
      <div className={classes.sectionDesktop}>
          <DesktopHeader />
          {/* <DesktopContent /> */}
      </div>
      <div className={classes.sectionMobile}>
        <MobileHeader>

        </MobileHeader>
      </div>
    </div>



  );
};

export default Main;
