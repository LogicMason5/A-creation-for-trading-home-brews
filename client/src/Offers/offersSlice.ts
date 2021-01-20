import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Offer } from '../type'
import store, { AppThunk } from '../store'
import offersService from './offersService'


interface OffersState {
  offers: Offer[]
  // isLoading: boolean
}

const initialOffersState: OffersState = {
  offers: [],
  // isLoading: false
}

// function startLoading(state: OffersState) {
//   state.isLoading = true
// }

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialOffersState,
  reducers: {
    addOffer(state, action: PayloadAction<Offer>) {
        state.offers.push(action.payload)
        console.log('printing in offerSlice' + state)
    },
    // getOffersStart: startLoading
    getOffersSuccess(state, { payload }: PayloadAction<Offer[]>) {
      state.offers = payload
    }
  }
})

export const { addOffer, getOffersSuccess } = offersSlice.actions

export default offersSlice.reducer

export const createOffer = (content: Omit<Offer, "id" | "created" | "location" | "owner">) => {
    const newOffer = {
      created: new Date().toISOString(),
      location: store.getState().location.location,
      owner: "FakeCurrentUser",
      ...content
    }
    offersService.createNew(newOffer)
}

export const fetchOffers = (): AppThunk => async dispatch => {
  try {
    const offers = await offersService.getAll()
    console.log(offers)  
    dispatch(getOffersSuccess(offers))
  } catch (error) {
    console.log(error)
  }
  
}

