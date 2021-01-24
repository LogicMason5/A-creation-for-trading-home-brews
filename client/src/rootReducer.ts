import { combineReducers } from '@reduxjs/toolkit';

import locationReducer from './Map/locationSlice';
import offersReducer from './Offers/offersSlice';
import dispalyReducer from './Navigation/displaySlice';
import userReducer from './User/userSlice';

const rootReducer = combineReducers({
  location: locationReducer,
  offers: offersReducer,
  display: dispalyReducer,
  user: userReducer
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;