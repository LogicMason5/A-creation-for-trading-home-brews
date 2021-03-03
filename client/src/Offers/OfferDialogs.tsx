import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { closeDialog } from '../Display/displaySlice';
import { deleteSelectedOffer, copySelectedOffer } from './offerSlice';
import ConfirmDialog from '../SharedComponents/ConfirmDialog';
import { useAsyncDispatch } from '../store';

const DeleteOfferDialog: React.FC = () => {
  const asyncDispatch = useAsyncDispatch();
  const localDispatch = useDispatch();

  const { dialogContent, dialogType } = useSelector(
    (state: RootState) => state.display.dialogState,
  );

  const handleYes = () => {
    localDispatch(closeDialog());
    switch (dialogType) {
      case 'delete':
        asyncDispatch(deleteSelectedOffer());
        break;
      case 'copy':
        copySelectedOffer();
        break;
      default:
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
