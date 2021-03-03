import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../store';
import { RootState } from '../rootReducer';
import { closeDialog } from '../Display/displaySlice';

interface DialogProps {
  dialogTitle: string;
  dialogText: string;
  onYes: () => void;
}

const ConfirmDialog: React.FC<DialogProps> = (props) => {
  const { dialogTitle, dialogText, onYes } = props;

  const dispatch = useAsyncDispatch();

  const { dialogOpen } = useSelector((state: RootState) => state.display.dialogState);

  const handleNo = () => {
    dispatch(closeDialog());
  };

  const handleYes = () => {
    onYes();
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleNo}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="primary">
            Cancel
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus id="offerDialogConfirmButton">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
