import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from '../type';

type LocationState = {
  location: Coordinates
};

const initialState: LocationState = {
  location: {
    lat: 60.16209,
    lng: 24.92022
  }
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action:PayloadAction<Coordinates>) {
      state.location = action.payload;
    },  
  }
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;