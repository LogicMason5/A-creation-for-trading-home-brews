import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../rootReducer';
import { closeDialog } from './displaySlice';



const ConfirmDialog: React.FC = () => {

  const dispatch = useDispatch();
  
  const { dialogOpen, dialogMessage } = useSelector((state: RootState) => state.display.dialogState);

  const handleNo = () => {
    dispatch(closeDialog());
  };

  const handleYes = () => {
    console.log('yes');
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleNo}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{dialogMessage}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will be permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            Cancel
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;