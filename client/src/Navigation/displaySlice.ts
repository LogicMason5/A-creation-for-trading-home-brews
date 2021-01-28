import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from "@material-ui/lab/Alert";
import { AppThunk } from '../store';

interface DisplayState {
  drawerOpen: boolean;
  mapsLoaded: boolean;
  alertState: AlertState;
}

interface AlertState {
  snackbarOpen: boolean;
  alertType: Color;
  alertMessage: string;
}

const initialAlertState: AlertState = {
  snackbarOpen: false,
  alertType: 'success',
  alertMessage: ''
};

const initialState: DisplayState = {
  drawerOpen: false,
  mapsLoaded: false,
  alertState: initialAlertState
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDrawerOpen(state, action:PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    setMapsLoaded(state, action:PayloadAction<boolean>) {
      state.mapsLoaded = action.payload;
    },
    setAlert(state, action: PayloadAction<Omit<AlertState, 'snackbarOpen'>>) {
      state.alertState = {
        ...action.payload,
        snackbarOpen: true
      };
    },
    closeAlert(state) {
      state.alertState.snackbarOpen = false;
    }
  } 
});

export const { setDrawerOpen, setMapsLoaded, setAlert, closeAlert } = displaySlice.actions;

export default displaySlice.reducer;

export const giveAlert = (type: Color, message: string): AppThunk => dispatch => {
  dispatch(setAlert({
    alertType: type,
    alertMessage: message
  }));
};



