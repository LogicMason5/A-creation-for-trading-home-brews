/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import { AxiosRequestConfig } from "axios";

export const createAuthHeaders = (): AxiosRequestConfig => {

  const loggedUser = window.localStorage.getItem('curUser');
  const loggedUserObject = loggedUser ? JSON.parse(loggedUser) : {token: { token: ''}};
  const token = loggedUserObject.token;

  return {
      headers: {
        Authorization: `Token ${token}`
      }
  };
};