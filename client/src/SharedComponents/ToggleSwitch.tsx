import React from 'react';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';


interface SwitchStyles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface CustomSwitchProps extends SwitchProps {
  switchStyles: SwitchStyles;
  checked: boolean;
  handleToggle: () => void;
}


const ToggleSwitch: React.FC<CustomSwitchProps> = props => {

  const { checked, switchStyles, handleToggle } = props;

  return (
    <Switch
      color="primary"
      checked={checked}
      onChange={handleToggle}
      focusVisibleClassName={switchStyles.focusVisible}
      disableRipple
      classes={{
        root: switchStyles.root,
        switchBase: switchStyles.switchBase,
        thumb: switchStyles.thumb,
        track: switchStyles.track,
        checked: switchStyles.checked
      }}
    />
  );

};

export default ToggleSwitch;