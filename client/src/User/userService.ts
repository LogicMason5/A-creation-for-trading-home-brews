import axios from 'axios';
import { RegisterFormValues, CurrentUser, LoginFormValues, IMessage } from '../type';

const baseUrl = 'http://localhost:3001/api/user';

const createNew = async (content: RegisterFormValues) : Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/register`, content);
  return response.data;
};

const login = async (credentials: LoginFormValues): Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/login`, credentials);
  return response.data;
};

const sendMessage = async (content: IMessage) : Promise<IMessage> => {
  const response = await axios.post<IMessage>(`${baseUrl}/message`, content);
  return response.data;
};

const offersService = { createNew, login, sendMessage };

export default offersService;