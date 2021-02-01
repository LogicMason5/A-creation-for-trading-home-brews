/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../utils/history';
import { IOffer } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offerService';
import { giveAlert, setDrawerOpen } from '../Navigation/displaySlice';

interface OffersState {
  offers: IOffer[];
  myOffers: IOffer[];
  displayedOffer: IOffer | null;
}

const initialOffersState: OffersState = {
  offers: [],
  myOffers: [],
  displayedOffer: null
};



const offersSlice = createSlice({
  name: 'offers',
  initialState: initialOffersState,
  reducers: {
    addOffer(state, { payload }: PayloadAction<IOffer>): void {
        state.offers.push(payload);
    },
    fetchActiveOffersSuccess(state, { payload }: PayloadAction<IOffer[]>): void {
      state.offers = payload;
    },
    fetchMyOffersSuccess(state, { payload }: PayloadAction<IOffer[]>): void {
      state.offers = payload;
    },
    fetchOfferByIdSuccess(state, { payload }: PayloadAction<IOffer>): void {
      state.displayedOffer = payload;
    }
  }
});

export const { addOffer, fetchActiveOffersSuccess, fetchOfferByIdSuccess, fetchMyOffersSuccess } = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (formContent: Omit<IOffer, "id" | "created" | "location" | "owner">): AppThunk => async dispatch => {

  try {
    const location = store.getState().location.location;

    const newOffer = {
      created: new Date().toISOString(),
      location: location,
      ...formContent
    };

    const createdOffer = await offersService.createNew(newOffer);
    
    dispatch(addOffer(createdOffer));
    dispatch(giveAlert('success', `Offer for ${createdOffer.beerName} created!` ));
    dispatch(setDrawerOpen(false));
    history.push('/');

    } catch (error) {
    console.log(error);
  }

};

export const fetchMyOffers = (): AppThunk => async dispatch => {
  try {
    const myOffers = await offersService.getMyOffers();
    console.log(myOffers);  
    dispatch(fetchMyOffersSuccess(myOffers)); // need new action for this
  } catch (error) {
    console.log(error);
  }
};

export const fetchActiveOffers = (): AppThunk => async dispatch => {
  try {
    const offers = await offersService.getAllActive();
    console.log(offers);  
    dispatch(fetchActiveOffersSuccess(offers));
  } catch (error) {
    console.log(error);
  }
};

export const fetchOfferById = (id: string): AppThunk => async dispatch => {
  try {
    const offer = await offersService.getById(id);
    dispatch(fetchOfferByIdSuccess(offer));
  } catch (error) {
    console.log(error);
  }
};

