/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOffer } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offersService';


interface OffersState {
  offers: IOffer[]
  displayedOffer: IOffer | null
  // isLoading: boolean
}

const initialOffersState: OffersState = {
  offers: [],
  displayedOffer: null
  // isLoading: false
};

// function startLoading(state: OffersState) {
//   state.isLoading = true
// }

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialOffersState,
  reducers: {
    addOffer(state, { payload }: PayloadAction<IOffer>): void {
        state.offers.push(payload);
    },
    // getOffersStart: startLoading
    getOffersSuccess(state, { payload }: PayloadAction<IOffer[]>): void {
      state.offers = payload;
    },
    getOfferByIdSuccess(state, { payload }: PayloadAction<IOffer>): void {
      state.displayedOffer = payload;
    }
  }
});

export const { addOffer, getOffersSuccess, getOfferByIdSuccess } = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (content: Omit<IOffer, "id" | "created" | "location" | "owner">): AppThunk => async dispatch => {

  console.log('logging in createOffer');

    const newOffer = {
      created: new Date().toISOString(),
      location: store.getState().location.location,
      owner: "FakeCurrentUser",
      ...content
    };

    try {
      const createdOffer = await offersService.createNew(newOffer);
      dispatch(addOffer(createdOffer));
    } catch (error) {
      console.log(error);
    }

};

export const fetchOffers = (): AppThunk => async dispatch => {
  try {
    const offers = await offersService.getAll();
    console.log(offers);  
    dispatch(getOffersSuccess(offers));
  } catch (error) {
    console.log(error);
  }
};

export const fetchOfferById = (id: string): AppThunk => async dispatch => {
  try {
    const offer = await offersService.getById(id);
    dispatch(getOfferByIdSuccess(offer));
  } catch (error) {
    console.log(error);
  }
};

