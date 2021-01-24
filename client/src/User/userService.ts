/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RegisterFormValues, CurrentUser } from '../type';

const baseUrl = 'http://localhost:3001/api/user';

// const getAll = async (): Promise<any> => {
//   const response = await axios.get<IOffer[]>(baseUrl);
//   return response.data;
// };

const createNew = async (content: RegisterFormValues) : Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/register`, content);
  return response.data;
};

// const update = async (id: string, newObject: Offer) => {

//   const response = await axios.put(`${ baseUrl }/${id}`, newObject);
//   return response.data;
// };

// const getById = async (id: string): Promise<any> => {
//   const response = await axios.get<IOffer>(`${ baseUrl }/${id}`);
//   return response.data;
// };

const offersService = { createNew };

export default offersService;