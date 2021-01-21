import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from '../type';


type LocationState = {
  location: Coordinates
  mapsLoaded: boolean
};

const initialState: LocationState = {
  location: {
    lat: 60.16209,
    lng: 24.92022
  },
  mapsLoaded:false
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action:PayloadAction<Coordinates>) {
      state.location = action.payload;
    },
    setMapsLoaded(state, action:PayloadAction<boolean>) {
      state.mapsLoaded = action.payload;
    },  
  }
});

export const { setLocation, setMapsLoaded } = locationSlice.actions;

export default locationSlice.reducer;

