import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../rootReducer';
import { closeDialog } from '../Navigation/displaySlice';
import { deleteSelectedOffer, copySelectedOffer } from './offerSlice';
import ConfirmDialog from '../SharedComponents/ConfirmDialog';



const DeleteOfferDialog: React.FC = () => {

  const dispatch = useDispatch();
  
  const { dialogContent, dialogType } = useSelector((state: RootState) => state.display.dialogState);

  const handleYes = () => {
    dispatch(closeDialog());
    switch(dialogType) {
      case 'delete':
        dispatch(deleteSelectedOffer());
        break;
      case 'copy':
        copySelectedOffer();
        break;
    }
  };

  return (
    <ConfirmDialog
      dialogTitle={dialogContent.dialogTitle}
      dialogText={dialogContent.dialogText}
      onYes={handleYes}
    />
  );
};

export default DeleteOfferDialog;