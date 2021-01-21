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
    addOffer(state, action: PayloadAction<IOffer>) {
        state.offers.push(action.payload);
    },
    // getOffersStart: startLoading
    getOffersSuccess(state, { payload }: PayloadAction<IOffer[]>) {
      state.offers = payload;
    },
    getOfferByIdSuccess(state, { payload }: PayloadAction<IOffer>) {
      state.displayedOffer = payload;
    }
  }
});

export const { addOffer, getOffersSuccess, getOfferByIdSuccess } = offersSlice.actions;

export default offersSlice.reducer;

export const createOffer = (content: Omit<IOffer, "id" | "created" | "location" | "owner">) => {
    const newOffer = {
      created: new Date().toISOString(),
      location: store.getState().location.location,
      owner: "FakeCurrentUser",
      ...content
    };
    offersService.createNew(newOffer);
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

