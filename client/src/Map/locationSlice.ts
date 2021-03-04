/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../type';

type LocationState = {
  location: Location
};

const initialState: LocationState = {
  location: {
    lat: 62.242,
    lng: 25.747,
    asText: '',
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates(state, { payload }: PayloadAction<Location>) {
      state.location.lat = payload.lat;
      state.location.lng = payload.lng;
    },
    setLocation(state, { payload }: PayloadAction<Location>) {
      state.location = payload;
    },
  },
});

export const { setCoordinates, setLocation } = locationSlice.actions;

export default locationSlice.reducer;
