import React, { Dispatch, SetStateAction } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';

interface ClusterMenuProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  menuItems: {
    offerName: string,
    offerId: string
  }[];
  onMenuItemClick: (id: string) => void;
  anchorEl: null | HTMLElement
}

const ClusterMenu:React.FC<ClusterMenuProps> = (props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    anchorEl, menuOpen, setMenuOpen, menuItems, onMenuItemClick,
  } = props;

  const handleClose = () => {
    setMenuOpen(false);
  };

  if (!anchorEl) return null;

  return (
    <div>
      <Menu
        id="simple-menu"
        keepMounted
        open={menuOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {menuItems.map((item) => (
          <div key={item.offerId}>
            <MenuItem
              onClick={() => onMenuItemClick(item.offerId)}
            >
              {item.offerName}
            </MenuItem>
            <Divider />
          </div>
        ))}
      </Menu>
    </div>
  );
};

export default ClusterMenu;
