/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { giveAlert } from '../Navigation/displaySlice';
import { AppThunk } from '../store';
import { RegisterFormValues, CurrentUser, LoginFormValues } from '../type';
import userService from './userService';

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
    setCurUser(state, action: PayloadAction<CurrentUser>): void {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    }
   }
});

export const { setCurUser } = userSlice.actions;

export default userSlice.reducer;


export const login = (credentials: LoginFormValues ): AppThunk => async dispatch => {
  
  try {
    const response = await userService.login(credentials);
    dispatch(setCurUser(response));
    window.localStorage.setItem('curUser', JSON.stringify(response));
    console.log('login sucess');
    dispatch(giveAlert('success', 'log in success'));
    //redirect and display login success
  } catch (error) {
    //display login fail to user with reason;
    console.log(error);
  }

};

export const createUser = (content: RegisterFormValues): AppThunk => async dispatch => {

    try {
      const response = await userService.createNew(content);
      //deal with failed request
      dispatch(setCurUser(response));
    } catch (error) {
      //display register fail to user with reason
      console.log(error);
    }

};



