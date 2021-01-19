import { combineReducers } from '@reduxjs/toolkit'

import locationReducer from './Map/locationSlice'
import offersReducer from './CreateOffer/offersSlice'

const rootReducer = combineReducers({
  location: locationReducer,
  offers: offersReducer
})


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer