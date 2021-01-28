import axios from 'axios';
import { RegisterFormValues, CurrentUser, LoginFormValues } from '../type';

const baseUrl = 'http://localhost:3001/api/user';



const createNew = async (content: RegisterFormValues) : Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/register`, content);
  return response.data;
};

const login = async (credentials: LoginFormValues): Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/login`, credentials);
  return response.data;
};


const offersService = { createNew, login };

export default offersService;