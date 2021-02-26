/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@material-ui/lab/Alert';
import { AppThunk } from '../store';
import { IOffer } from '../type';
import { setSelectedOffer } from '../Offers/offerSlice';

interface Size {
  width: number;
  height: number;
}

interface DisplayState {
  drawerOpen: boolean;
  showMessageForm: boolean;
  mapsLoaded: boolean;
  alertState: AlertState;
  dialogState: DialogState;
  offerUploadUrl: string;
  switchSize: Size;
}

interface AlertState {
  snackbarOpen: boolean;
  alertType: Color;
  alertMessage: string;
}

interface DialogContent {
  dialogTitle: string;
  dialogText: string;
}

interface DialogState {
  dialogOpen: boolean;
  dialogContent: DialogContent;
  dialogType: 'delete' | 'copy';
}

const initialDialogContent: DialogContent = {
  dialogTitle: '',
  dialogText: '',
};

const initialDialogState: DialogState = {
  dialogOpen: false,
  dialogContent: initialDialogContent,
  dialogType: 'delete',
};

const initialAlertState: AlertState = {
  snackbarOpen: false,
  alertType: 'success',
  alertMessage: '',
};

const initialState: DisplayState = {
  drawerOpen: false,
  showMessageForm: false,
  mapsLoaded: false,
  alertState: initialAlertState,
  dialogState: initialDialogState,
  offerUploadUrl: '',
  switchSize: {
    width: 0,
    height: 0,
  },
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDrawerOpen(state, action:PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    setShowMessageForm(state, action:PayloadAction<boolean>) {
      state.showMessageForm = action.payload;
    },
    setMapsLoaded(state, action:PayloadAction<boolean>) {
      state.mapsLoaded = action.payload;
    },
    setAlert(state, action: PayloadAction<Omit<AlertState, 'snackbarOpen'>>) {
      state.alertState = {
        ...action.payload,
        snackbarOpen: true,
      };
    },
    setDialog(state, action: PayloadAction<DialogContent>) {
      state.dialogState.dialogOpen = true;
      state.dialogState.dialogContent = action.payload;
    },
    setDialogType(state, action: PayloadAction<'delete' | 'copy'>) {
      state.dialogState.dialogType = action.payload;
    },
    closeAlert(state) {
      state.alertState.snackbarOpen = false;
    },
    closeDialog(state) {
      state.dialogState.dialogOpen = false;
    },
    setOfferUploadUrl(state, action: PayloadAction<string>) {
      state.offerUploadUrl = action.payload;
    },
    setSwitchSize(state, action: PayloadAction<Size>) {
      state.switchSize = action.payload;
    },

  },
});

export const {
  setDrawerOpen,
  setShowMessageForm,
  setMapsLoaded,
  setAlert,
  setDialog,
  closeAlert,
  closeDialog,
  setDialogType,
  setOfferUploadUrl,
  setSwitchSize,
} = displaySlice.actions;

export default displaySlice.reducer;

export const giveAlert = (type: Color, message: string): AppThunk => (dispatch) => {
  dispatch(setAlert({
    alertType: type,
    alertMessage: message,
  }));
};

export const confirmDeletion = (offer: IOffer): AppThunk => (dispatch) => {
  dispatch(setSelectedOffer(offer));
  dispatch(setDialog({
    dialogTitle: `Delete offer for ${offer.beerName}?`,
    dialogText: 'You can use the active switch to deactivate it instead.',
  }));
  dispatch(setDialogType('delete'));
};

export const confirmCopy = (offer: IOffer): AppThunk => (dispatch) => {
  dispatch(setSelectedOffer(offer));
  dispatch(setDialog({
    dialogTitle: `Create a copy of the offer for ${offer.beerName}?`,
    dialogText: 'You will be redirected to edit the details of the new Offer.',
  }));
  dispatch(setDialogType('copy'));
};
