/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../utils/history';
import { IOffer, IOfferToDisplay, OfferFormValues } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offerService';
import { giveAlert } from '../Display/displaySlice';

interface OffersState {
  activeOffers: IOffer[];
  myOffers: IOffer[];
  displayedOffer: IOfferToDisplay;
  selectedOffer: IOffer;
}

const emptyOffer: IOffer = {
  beerName: '',
  description: '',
  location: { lat: 0.0, lng: 0.0, asText: '' },
  created: '',
  owner: '',
  id: '',
  imgUrl: '',
  active: false,
};

const initialOffersState: OffersState = {
  activeOffers: [],
  myOffers: [],
  displayedOffer: {
    ...emptyOffer,
    owner: {
      _id: '',
      username: '',
    },
  },
  selectedOffer: emptyOffer,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState: initialOffersState,
  reducers: {
    addOffer(state, { payload }: PayloadAction<IOffer>): void {
      state.activeOffers.push(payload);
    },
    fetchActiveOffersSuccess(state, { payload }: PayloadAction<IOffer[]>): void {
      state.activeOffers = payload;
    },
    fetchMyOffersSuccess(state, { payload }: PayloadAction<IOffer[]>): void {
      state.myOffers = payload;
    },
    fetchOfferByIdSuccess(state, { payload }: PayloadAction<IOfferToDisplay>): void {
      state.displayedOffer = payload;
    },
    setSelectedOffer(state, { payload }: PayloadAction<IOffer>) {
      state.selectedOffer = payload;
    },
    removeSelectedOffer(state) {
      state.selectedOffer = emptyOffer;
    },
    updateMyOffer(state, { payload }: PayloadAction<IOffer>) {
      state.myOffers = state.myOffers.map((o) => (o.id === payload.id ? payload : o));
    },
    removeFromMyOffers(state, { payload }: PayloadAction<string>) {
      state.myOffers = state.myOffers.filter((o) => o.id !== payload);
    },
    removeActiveById(state, { payload }: PayloadAction<string>) {
      state.myOffers = state.activeOffers.filter((o) => o.id !== payload);
    },
  },
});

export const {
  addOffer,
  fetchActiveOffersSuccess,
  fetchOfferByIdSuccess,
  fetchMyOffersSuccess,
  setSelectedOffer,
  removeSelectedOffer,
  updateMyOffer,
  removeFromMyOffers,
  removeActiveById,
} = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (formContent: OfferFormValues): AppThunk => async (dispatch) => {
  const { location } = store.getState().location;
  const imgUrl = store.getState().display.offerUploadUrl;

  const newOffer = {
    ...formContent,
    location,
    imgUrl,
    active: true,
  };

  try {
    const createdOffer = await offersService.createNew(newOffer);

    dispatch(addOffer(createdOffer));
    dispatch(giveAlert('success', `Offer for ${createdOffer.beerName} created!`));
    history.push('/');
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to the create the offer.'));
  }
};

export const updateSelectedOffer = (formContent: OfferFormValues): AppThunk => async (dispatch) => {
  const state = store.getState();

  const {
    id, active, owner,
  } = state.offers.selectedOffer;
  const imgUrl = store.getState().display.offerUploadUrl;

  const newOffer = {
    ...formContent,
    location: state.location.location,
    imgUrl,
    id,
    owner,
    active,
  };

  try {
    const updatedOffer = await offersService.updateById(id, newOffer);
    dispatch(giveAlert('success', `Offer for ${updatedOffer.beerName} updated.`));
    updateMyOffer(updatedOffer);
    history.push('/my-offers');
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to update the offer.'));
  }
};

export const toggleActiveStatus = (offer: IOffer, setTo: boolean): AppThunk => async (dispatch) => {
  const newOffer = {
    ...offer,
    active: setTo,
  };

  try {
    const updatedOffer = await offersService.updateById(newOffer.id, newOffer);
    dispatch(
      updatedOffer.active
        ? giveAlert('success', `Offer for ${updatedOffer.beerName} activated.`)
        : giveAlert('info', `Offer for ${updatedOffer.beerName} deactivated.`),
    );
    dispatch(updateMyOffer(updatedOffer));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to update the offer.'));
  }
};

export const deleteSelectedOffer = (): AppThunk => async (dispatch) => {
  const { id } = store.getState().offers.selectedOffer;

  try {
    await offersService.deleteById(id);
    dispatch(removeFromMyOffers(id));
    dispatch(giveAlert('success', 'Offer deleted.'));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to delete the offer.'));
  }
};

export const copySelectedOffer = (): void => {
  const { id } = store.getState().offers.selectedOffer;
  history.push(`/my-offers/copy/${id}`);
};

export const fetchMyOffers = (): AppThunk => async (dispatch) => {
  try {
    const myOffers = await offersService.getMyOffers();
    dispatch(fetchMyOffersSuccess(myOffers));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load your offers. Please reload the page or relog to try again.'));
  }
};

export const fetchActiveOffers = (): AppThunk => async (dispatch) => {
  try {
    const offers = await offersService.getAllActive();
    dispatch(fetchActiveOffersSuccess(offers));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load active offers. Please reload the page.'));
  }
};

export const fetchOfferById = (id: string): AppThunk => async (dispatch) => {
  try {
    const offer = await offersService.getById(id);
    dispatch(fetchOfferByIdSuccess(offer));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load the offer. Please reload the page.'));
  }
};
