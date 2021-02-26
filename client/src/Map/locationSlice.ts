/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../type';

type LocationState = {
  location: Location
};

const initialState: LocationState = {
  location: {
    lat: 60.16209,
    lng: 24.92022,
    asText: '',
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates(state, action: PayloadAction<Location>) {
      state.location = action.payload;
    },
  },
});

export const { setCoordinates } = locationSlice.actions;

export default locationSlice.reducer;
