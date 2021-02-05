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
  selectedOffer: IOffer;
}

const emptyOffer: IOffer = {
    beerName: '',
    description: '',
    location: {lat: 0.0, lng: 0.0},
    created: '',
    owner: '',
    id: ''
};

const initialOffersState: OffersState = {
  offers: [],
  myOffers: [],
  displayedOffer: null,
  selectedOffer: emptyOffer
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
    setSelectedOffer(state, { payload }: PayloadAction<IOffer>) {
      state.selectedOffer = payload;
    },
    removeSelectedOffer(state) {
      state.selectedOffer = emptyOffer;
    }
  }
});

export const { 
  addOffer,
  fetchActiveOffersSuccess,
  fetchOfferByIdSuccess,
  fetchMyOffersSuccess,
  setSelectedOffer,
  removeSelectedOffer
} = offersSlice.actions;

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

export const updateSelectedOffer = (formContent: Omit<IOffer, "id" | "created" | "location" | "owner">): AppThunk => async dispatch => {

  const state = store.getState();

  const id = state.offers.selectedOffer.id;
  const location = state.location.location;
  const owner = state.user.currentUser.id;

  const newOffer = {
    created: new Date().toISOString(),
    location: location,
    id: id,
    owner: owner,
    ...formContent
  };

  try {
    const updatedOffer = await offersService.updateById(id, newOffer);
    dispatch(giveAlert('success', `Offer for ${updatedOffer.beerName} updated.`));
    history.push(`/offers/${updatedOffer.id}`);
    console.log(updatedOffer); 
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to update the offer.'));
  }

};

export const deleteSelectedOffer = (): AppThunk => async dispatch => {

  const id = store.getState().offers.selectedOffer.id;

  try {
    await offersService.deleteById(id);
    dispatch(giveAlert('success', 'Offer deleted.'));

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

