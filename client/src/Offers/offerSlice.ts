/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../utils/history';
import { IOffer } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offerService';
import { giveAlert, setDrawerOpen } from '../SharedComponents/displaySlice';

interface OffersState {
  offers: IOffer[];
  myOffers: IOffer[];
  displayedOffer: IOffer | null;
  chosenOfferId: string;
}

const initialOffersState: OffersState = {
  offers: [],
  myOffers: [],
  displayedOffer: null,
  chosenOfferId: ''
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
      state.myOffers = payload;
    },
    fetchOfferByIdSuccess(state, { payload }: PayloadAction<IOffer>): void {
      state.displayedOffer = payload;
    },
    setChosenOffer(state, { payload }: PayloadAction<string>) {
      state.chosenOfferId = payload;
    },
    removeChosenOffer(state) {
      state.chosenOfferId = 'undefined';
    }
  }
});

export const { addOffer, fetchActiveOffersSuccess, fetchOfferByIdSuccess, fetchMyOffersSuccess, setChosenOffer, removeChosenOffer } = offersSlice.actions;

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
    dispatch(giveAlert('error', 'Failed to the create the offer.'));
  }

};

export const deleteChosenOffer = (): AppThunk => async dispatch => {

  const id = store.getState().offers.chosenOfferId;

  try {
    const response = await offersService.deleteById(id);
    console.log(response);
    dispatch(giveAlert('success', 'Offer successfully deleted.'));

  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to delete the offer.'));
  }
  

};

export const fetchMyOffers = (): AppThunk => async dispatch => {
  try {
    const myOffers = await offersService.getMyOffers();
    dispatch(fetchMyOffersSuccess(myOffers)); // need new action for this
  } catch (error) {
    console.log(error);
  }
};

export const fetchActiveOffers = (): AppThunk => async dispatch => {
  try {
    const offers = await offersService.getAllActive();
    dispatch(fetchActiveOffersSuccess(offers));
  } catch (error) {
    dispatch(giveAlert('error', 'Failed to load active offers. Please reload the page.'));
    console.log(error);
  }
};

export const fetchOfferById = (id: string): AppThunk => async dispatch => {
  try {
    const offer = await offersService.getById(id);
    dispatch(fetchOfferByIdSuccess(offer));
  } catch (error) {
    dispatch(giveAlert('error', 'Failed to load the offer. Please reload the page.'));
    console.log(error);
  }
};

