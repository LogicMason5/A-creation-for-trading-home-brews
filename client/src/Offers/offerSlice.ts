/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../utils/history';
import { IOffer, OfferFormValues } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offerService';
import { giveAlert, setDrawerOpen } from '../Navigation/displaySlice';

interface OffersState {
  offers: IOffer[];
  myOffers: IOffer[];
  displayedOffer: IOffer;
  selectedOffer: IOffer;
}

const emptyOffer: IOffer = {
    beerName: '',
    description: '',
    location: {lat: 0.0, lng: 0.0},
    created: '',
    ownerId: '',
    id: '',
    active: false
};

const initialOffersState: OffersState = {
  offers: [],
  myOffers: [],
  displayedOffer: emptyOffer,
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
    },
    updateMyOffer(state, { payload }: PayloadAction<IOffer>) {
      state.myOffers.map(o => o.id === payload.id ? payload : o);
    }
  }
});

export const { 
  addOffer,
  fetchActiveOffersSuccess,
  fetchOfferByIdSuccess,
  fetchMyOffersSuccess,
  setSelectedOffer,
  removeSelectedOffer,
  updateMyOffer
} = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (formContent: Omit<OfferFormValues, "location">): AppThunk => async dispatch => {

  try {
    const location = store.getState().location.location;

    const newOffer = {
      created: new Date().toISOString(),
      location: location,
      ...formContent,
      active: true
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

export const updateSelectedOffer = (formContent: Omit<OfferFormValues, "location">): AppThunk => async dispatch => {

  const state = store.getState();

  const { id, active }  = state.offers.selectedOffer;
  const location = state.location.location;
  const owner = state.user.currentUser.id;

  const newOffer = {
    created: new Date().toISOString(),
    location: location,
    id: id,
    ownerId: owner,
    active: active,
    ...formContent
  };

  try {
    const updatedOffer = await offersService.updateById(id, newOffer);
    dispatch(giveAlert('success', `Offer for ${updatedOffer.beerName} updated.`));
    history.push(`/offers/${updatedOffer.id}`);
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to update the offer.'));
  }

};

export const toggleActiveStatus = (offer: IOffer, setTo: boolean): AppThunk => async dispatch => {
  
  const newOffer = {
    ...offer,
    active: setTo,
    created: new Date().toISOString()
  };

  try {
    const updatedOffer = await offersService.updateById(newOffer.id, newOffer);
    dispatch(
      updatedOffer.active 
      ?
      giveAlert('success', `Offer for ${updatedOffer.beerName} activated.`)
      :
      giveAlert('info', `Offer for ${updatedOffer.beerName} deactivated.`)
    );
    dispatch(updateMyOffer(updatedOffer));
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

export const copySelectedOffer = (): void => {

  const id = store.getState().offers.selectedOffer.id;

  history.push(`/my-offers/copy/${id}`);

};

export const fetchMyOffers = (): AppThunk => async dispatch => {
  try {
    const myOffers = await offersService.getMyOffers();
    dispatch(fetchMyOffersSuccess(myOffers));
  } catch (error) {
    dispatch(giveAlert('error', 'Failed to load your offers. Please reload the page or relog to try again.'));
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

