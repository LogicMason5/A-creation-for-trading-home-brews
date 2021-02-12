import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { toggleActiveStatus } from '../offerSlice';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ToggleSwitch from '../../SharedComponents/ToggleSwitch';
import { useAsyncDispatch } from '../../store';
import { IOffer } from '../../type';



const useSwitchStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 45,
      height: 26,
      padding: 1,
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

const IsActiveSwitch: React.FC<{ offer: IOffer }> = ({ offer }) => {

  const switchClasses = useSwitchStyles();

  const dispatch = useAsyncDispatch();

  const [checked, setChecked] = useState(offer.active);

  const toggleActive = () => {
    setChecked(!checked);
    dispatch(toggleActiveStatus(offer, !checked));
  };

  return (
      <FormControlLabel
        control={
          <ToggleSwitch
            name="checked"
            switchStyles={switchClasses}
            handleToggle={toggleActive}
            checked={checked}
          />}
        label={checked ? "active" : "inactive"}
        labelPlacement='top'
      />
  );
};

export default IsActiveSwitch;