/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';

import locationReducer from './Map/locationSlice';
import offersReducer from './Offers/offerSlice';
import displayReducer from './Display/displaySlice';
import userReducer from './User/userSlice';

const rootReducer = combineReducers({
  location: locationReducer,
  offers: offersReducer,
  display: displayReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
