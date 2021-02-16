import axios from 'axios';
import { IOffer, IOfferToDisplay } from '../type';
import { createAuthHeaders } from '../utils/createHeaders';

const baseUrl = 'http://localhost:3001/api/offers';

const headers = createAuthHeaders();

const getAllActive = async (): Promise<IOffer[]> => {
  const response = await axios.get<IOffer[]>(baseUrl);
  return response.data;
};

const createNew = async (content: Omit<IOffer, "id" | "owner">): Promise<IOffer> => {
  console.log(content);
  const response = await axios.post<IOffer>(baseUrl, content, headers);
  return response.data;
};

const updateById = async (id: string, updatedOffer: IOffer): Promise<IOffer> => {

  const response = await axios.put<IOffer>(`${ baseUrl }/${id}`, updatedOffer, headers);
  return response.data;
};

const deleteById = async (id: string): Promise<Response> => {
  const response = await axios.delete<Response>(`${ baseUrl }/${id}`, headers);
  return response.data;
};

const getById = async (id: string): Promise<IOfferToDisplay> => {
  const response = await axios.get<IOfferToDisplay>(`${ baseUrl }/${id}`);
  return response.data;
};

const getMyOffers = async (): Promise<IOffer[]> => {
  const response = await axios.get<IOffer[]>(`${baseUrl}/my-offers`, headers);
  return response.data;
};

const offersService = { getAllActive, createNew, getById, getMyOffers, deleteById, updateById };

export default offersService;