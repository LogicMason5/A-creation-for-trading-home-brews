import { combineReducers } from '@reduxjs/toolkit';

import locationReducer from './Map/locationSlice';
import offersReducer from './Offers/offersSlice';
import dispalyReducer from './Navigation/displaySlice';

const rootReducer = combineReducers({
  location: locationReducer,
  offers: offersReducer,
  display: dispalyReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;