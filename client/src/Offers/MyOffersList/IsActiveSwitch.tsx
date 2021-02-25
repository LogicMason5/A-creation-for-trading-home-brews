import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ToggleSwitch from '../../SharedComponents/ToggleSwitch';



const useSwitchStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 26,
      padding: 2,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    focusVisible: {},
    checked: {}
  })
);

interface IsActiveSwitchProps {
  toggle: () => void;
  checked: boolean;
}

const IsActiveSwitch: React.FC<IsActiveSwitchProps> = ({ toggle, checked }) => {

  const switchClasses = useSwitchStyles();

  return (
      <FormControlLabel
        control={
          <ToggleSwitch
            name="checked"
            switchStyles={switchClasses}
            handleToggle={toggle}
            checked={checked}
          />}
        label={checked ? "active" : "inactive"}
        labelPlacement='top'
      />
  );
};

export default IsActiveSwitch;