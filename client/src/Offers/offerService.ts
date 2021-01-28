import axios from 'axios';
import { IOffer } from '../type';
import { createHeaders } from '../utils/createHeaders';

const baseUrl = 'http://localhost:3001/api/offers';

const headers = createHeaders();

const getAll = async (): Promise<IOffer[]> => {
  const response = await axios.get<IOffer[]>(baseUrl);
  return response.data;
};

const createNew = async (content: Omit<IOffer, "id">): Promise<IOffer> => {
  const response = await axios.post<IOffer>(baseUrl, content, headers);
  return response.data;
};

// const update = async (id: string, newObject: Offer) => {

//   const response = await axios.put(`${ baseUrl }/${id}`, newObject);
//   return response.data;
// };

const getById = async (id: string): Promise<IOffer> => {
  const response = await axios.get<IOffer>(`${ baseUrl }/${id}`);
  return response.data;
};

const offersService = { getAll, createNew, getById };

export default offersService;