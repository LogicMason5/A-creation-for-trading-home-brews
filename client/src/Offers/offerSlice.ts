import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import history from '../utils/history';
import { IOffer, IOfferToDisplay, OfferFormValues } from '../type';
import store, { AppThunk } from '../store';
import offersService from './offerService';
import { giveAlert } from '../Navigation/displaySlice';

interface OffersState {
  activeOffers: IOffer[];
  myOffers: IOffer[];
  displayedOffer: IOfferToDisplay;
  selectedOffer: IOffer;
}

const emptyOffer: IOffer = {
  beerName: '',
  description: '',
  location: { lat: 0.0, lng: 0.0 },
  created: '',
  owner: '',
  id: '',
  active: false
};

const initialOffersState: OffersState = {
  activeOffers: [],
  myOffers: [],
  displayedOffer: {
    ...emptyOffer,
    owner: {
      id: '',
      username: ''
    }
  },
  selectedOffer: emptyOffer
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
      state.myOffers = state.myOffers.map(o => o.id === payload.id ? payload : o);
    },
    removeFromMyOffers(state, { payload }: PayloadAction<string>) {
      state.myOffers = state.myOffers.filter(o => o.id !== payload);
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
  updateMyOffer,
  removeFromMyOffers
} = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (formContent: Omit<OfferFormValues, "location">): AppThunk => async dispatch => {

  const location = store.getState().location.location;

  const newOffer = {
    created: new Date().toISOString(),
    location: location,
    ...formContent,
    active: true
  };

  try {

    const createdOffer = await offersService.createNew(newOffer);
    
    dispatch(addOffer(createdOffer));
    dispatch(giveAlert('success', `Offer for ${createdOffer.beerName} created!` ));
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
    location: location,
    id: id,
    owner: owner,
    active: active,
    ...formContent
  };

  try {
    const updatedOffer = await offersService.updateById(id, newOffer);
    dispatch(giveAlert('success', `Offer for ${updatedOffer.beerName} updated.`));
    history.push('/my-offers');

  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to update the offer.'));
  }

};

export const toggleActiveStatus = (offer: IOffer, setTo: boolean): AppThunk => async dispatch => {
  
  const newOffer = {
    ...offer,
    active: setTo,
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
    dispatch(removeFromMyOffers(id));
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
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load your offers. Please reload the page or relog to try again.'));
  }

};

export const fetchActiveOffers = (): AppThunk => async dispatch => {

  try {
    const offers = await offersService.getAllActive();
    dispatch(fetchActiveOffersSuccess(offers));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load active offers. Please reload the page.'));
  }

};

export const fetchOfferById = (id: string): AppThunk => async dispatch => {

  try {
    const offer = await offersService.getById(id);
    dispatch(fetchOfferByIdSuccess(offer));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to load the offer. Please reload the page.'));
  }

};

