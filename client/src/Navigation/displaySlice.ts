import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisplayState {
  drawerOpen: boolean
  mapsLoaded: boolean
}

const initialState: DisplayState = {
  drawerOpen: true,
  mapsLoaded: false
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
  }
});

export const { setDrawerOpen, setMapsLoaded } = displaySlice.actions;

export default displaySlice.reducer;



