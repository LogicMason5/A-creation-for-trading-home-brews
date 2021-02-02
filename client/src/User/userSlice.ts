/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { giveAlert, setDrawerOpen } from '../SharedComponents/displaySlice';
import { AppThunk } from '../store';
import { RegisterFormValues, CurrentUser, LoginFormValues } from '../type';
import userService from './userService';
import history from '../utils/history';

interface UserState {
  isLoggedIn: boolean,
  currentUser: CurrentUser
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: {
    id: '',
    token: '',
    displayName: ''
  }
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
    }
   }
});

export const { setLoggedUser, removeLoggedUser } = userSlice.actions;

export default userSlice.reducer;

export const login = (credentials: LoginFormValues ): AppThunk => async dispatch => {
  
  try {
    const response = await userService.login(credentials);
    dispatch(setLoggedUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    dispatch(giveAlert('success', 'log in success'));
    dispatch(setDrawerOpen(false));
    history.push('/');
  } catch (error) {
    dispatch(giveAlert('error',`Login failed: ${JSON.stringify(error.response.data.message)}`));
  }
};

export const logout = (): AppThunk => dispatch => {
  dispatch(removeLoggedUser());
  window.localStorage.removeItem('curUser');
  dispatch(giveAlert('success', 'You have logged out.'));
  dispatch(setDrawerOpen(false));
  history.push('/');
};


export const createUser = (content: RegisterFormValues): AppThunk => async dispatch => {

    try {
      const response = await userService.createNew(content);
      dispatch(setLoggedUser(response));
      window.localStorage.setItem('curUser', JSON.stringify(response));
      dispatch(giveAlert('success', `User created. Welcome ${response.displayName}`));
      dispatch(setDrawerOpen(false));
      history.push('/');
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
      dispatch(giveAlert('error',`Failed to create user: ${JSON.stringify(Object.keys(error.response.data.errors)[0])} is already taken`));
    }
    
};



