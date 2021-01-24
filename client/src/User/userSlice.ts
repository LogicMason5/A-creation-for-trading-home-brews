/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { RegisterFormValues, CurrentUser, LoginFormValues } from '../type';
import userService from './userService';

interface UserState {
  isLoggedIn: boolean,
  currentUser?: CurrentUser
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>): void {
        state.currentUser = action.payload;
    },
  }
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

// export const createUser = async (content: RegisterFormValues): Promise<void> => {

//   console.log(content.displayName);
//   console.log('createUser called');

//     try {
//       console.log('in createUser try');
//       const response = await userService.createNew(content);
//       //deal with failed request
//       const createdUser = response as CurrentUser; //this is only true if req is succesfull
//       store.dispatch(setCurrentUser(createdUser));
//     } catch (error) {
//       console.log(error);
//     }

// };

// export const login = (credentials: LoginFormValues ): AppThunk => async dispatch => {
  
//   try {
//     const response = await userService.login(credentials);
//     dispatch(loginSuccess(response));
//   } catch (error) {
//     dispatch(loginFail(response));
//     console.log(error);
//   }

// };

export const createUser = (content: RegisterFormValues): AppThunk => async dispatch => {

    try {
      const response = await userService.createNew(content);
      //deal with failed request
      const createdUser = response; //this is only true if req is succesfull
      dispatch(setCurrentUser(createdUser));
    } catch (error) {
      console.log(error);
    }

};
