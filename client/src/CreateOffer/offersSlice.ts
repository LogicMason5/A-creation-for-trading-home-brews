import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Offer, OffersState } from '../type'
import store from '../store'
import offersService from './offersService'


const initialOffers = [] as unknown as OffersState

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialOffers,
  reducers: {
    addOffer(state, action: PayloadAction<Offer>) {
        state.offers.push(action.payload)
        console.log('printing in offerSlice' + state)
    }
  }
})

export const { addOffer } = offersSlice.actions

export default offersSlice.reducer

export const createOffer = (content: Omit<Offer, "id" | "created" | "location" | "owner">) => {
    console.log('print in createOffer' + content) 
    const newOffer = {
      created: new Date().toISOString(),
      location: store.getState().location.location,
      owner: "FakeCurrentUser",
      ...content
    }
    console.log('newOffer before post' + newOffer)
    offersService.createNew(newOffer)
}

// store.getState().location