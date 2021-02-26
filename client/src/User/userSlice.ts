/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { giveAlert, setDrawerOpen, setShowMessageForm } from '../Display/displaySlice';
import {
  RegisterFormValues,
  MessageFormValues,
  CurrentUser,
  LoginFormValues,
  ReqResetPwFormValues,
  ResetPwFormValues,
  ChangePwFormValues,
} from '../type';
import userService from './userService';
import history from '../utils/history';
import store, { AppThunk } from '../store';

interface UserState {
  isLoggedIn: boolean,
  currentUser: CurrentUser
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: {
    id: '',
    token: '',
    displayName: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<CurrentUser>): void {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    removeLoggedUser(state): void {
      state.isLoggedIn = false;
      state.currentUser = initialState.currentUser;
    },
    setLoggedIn(state, action: PayloadAction<boolean>): void {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedUser, removeLoggedUser, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;

export const login = (credentials: LoginFormValues): AppThunk => async (dispatch) => {
  try {
    const response = await userService.login(credentials);
    dispatch(setLoggedUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    dispatch(giveAlert('success', `Welcome ${response.displayName}!`));
    history.push('/');
  } catch (error) {
    dispatch(giveAlert('error', `Login failed: ${JSON.stringify(error.response.data.message)}`));
  }
};

export const reqResetPw = (email: ReqResetPwFormValues): AppThunk => async (dispatch) => {
  try {
    await userService.reqResetPw(email);
    dispatch(giveAlert('success', `Password reset email sent to ${email.email}.`));
    history.push('/login');
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', `Failed to send reset email: ${JSON.stringify(error.response.data.message)}`));
  }
};

export const resetPw = (form: ResetPwFormValues, token: string): AppThunk => async (dispatch) => {
  try {
    const response = await userService.resetPw(form, token);
    dispatch(setLoggedUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    dispatch(giveAlert('success', `Welcome ${response.displayName}! Email confirmation about password reset sent.`));
    history.push('/');
  } catch (error) {
    dispatch(giveAlert('error', `Failed to reset password: ${JSON.stringify(error.response.data)}`));
  }
};

export const changePw = (form: ChangePwFormValues): AppThunk => async (dispatch) => {
  try {
    const response = await userService.changePw(form);
    dispatch(setLoggedUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    dispatch(giveAlert('success', `Welcome ${response.displayName}! Email confirmation about password change sent.`));
  } catch (error) {
    dispatch(giveAlert('error', `Failed to change password: ${JSON.stringify(error.response.data)}`));
  }
};

export const logout = (): AppThunk => (dispatch) => {
  dispatch(removeLoggedUser());
  window.localStorage.removeItem('curUser');
  dispatch(giveAlert('success', 'You have logged out.'));
  dispatch(setDrawerOpen(false));
  history.push('/');
};

export const initUser = (): AppThunk => async (dispatch) => {
  const initStoredUser = window.localStorage.getItem('curUser');

  if (!initStoredUser) return;

  try {
    const tokenStatus = await userService.checkCurrentToken();
    dispatch(setLoggedIn(tokenStatus.checked));
    if (!tokenStatus.checked) window.localStorage.removeItem('curUser');
  } catch (error) {
    console.log(error);
    dispatch(removeLoggedUser());
    window.localStorage.removeItem('curUser');
  }
};

export const createUser = (content: RegisterFormValues): AppThunk => async (dispatch) => {
  try {
    const response = await userService.createNew(content);
    dispatch(setLoggedUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    dispatch(giveAlert('success', `Welcome ${response.displayName}`));
    dispatch(setDrawerOpen(false));
    history.push('/');
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', `Failed to create user. ${JSON.stringify(Object.keys(error.response.data.errors)[0])} is already taken`));
  }
};

export const messageBrewer = (formContent: MessageFormValues): AppThunk => async (dispatch) => {
  const { beerName, owner } = store.getState().offers.displayedOffer;

  const message = {
    brewer: owner.username,
    recipient: owner.id,
    beerName,
    ...formContent,
  };

  try {
    console.log(message);
    await userService.sendMessage(message);
    dispatch(giveAlert('success', `Message sent to ${message.brewer}`));
  } catch (error) {
    console.log(error);
    dispatch(giveAlert('error', 'Failed to deliver your message.'));
  }

  dispatch(setShowMessageForm(false));
};
