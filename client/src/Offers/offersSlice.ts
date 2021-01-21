import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Offer } from '../type'
import store, { AppThunk } from '../store'
import offersService from './offersService'


interface OffersState {
  offers: Offer[]
  displayedOffer: Offer | null
  // isLoading: boolean
}

const initialOffersState: OffersState = {
  offers: [],
  displayedOffer: null
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
    },
    getOfferByIdSuccess(state, { payload }: PayloadAction<Offer>) {
      state.displayedOffer = payload
    }
  }
})

export const { addOffer, getOffersSuccess, getOfferByIdSuccess } = offersSlice.actions

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

export const fetchOfferById = (id: string): AppThunk => async dispatch => {
  try {
    console.log('id in slice bef req' + id.toString())
    const offer = await offersService.getById(id)
    console.log('logging received offer in fetchOfferById ' + offer)
    dispatch(getOfferByIdSuccess(offer))
  } catch (error) {
    console.log(error)
  }
}

