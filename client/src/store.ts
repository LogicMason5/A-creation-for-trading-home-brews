import { configureStore, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAsyncDispatch = () => useDispatch<AppDispatch>();

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;

