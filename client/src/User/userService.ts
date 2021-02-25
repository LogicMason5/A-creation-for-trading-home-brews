import axios from 'axios';
import {
  RegisterFormValues,
  CurrentUser,
  LoginFormValues,
  IMessage,
  ReqResetPwFormValues,
  ResetPwFormValues
} from '../type';
import { createHeadersFromToken } from '../utils/createHeaders';
import url from '../utils/url';

const baseUrl = `${url}/api/user`;

const createNew = async (content: RegisterFormValues): Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/register`, content);
  return response.data;
};

const login = async (credentials: LoginFormValues): Promise<CurrentUser> => {
  const response = await axios.post<CurrentUser>(`${baseUrl}/login`, credentials);
  return response.data;
};

const reqResetPw = async (email: ReqResetPwFormValues): Promise<string> => {
  const response = await axios.post<string>(`${baseUrl}/reqpwreset`, email);
  return response.data;
};

const resetPw = async (newPw: ResetPwFormValues, token: string): Promise<CurrentUser> => {
  const headers = createHeadersFromToken(token);
  const response = await axios.post<CurrentUser>(`${baseUrl}/pwreset`, newPw, headers);
  return response.data;
};

const sendMessage = async (content: IMessage): Promise<IMessage> => {
  const response = await axios.post<IMessage>(`${baseUrl}/message`, content);
  return response.data;
};

const offersService = { createNew, login, sendMessage, reqResetPw, resetPw };

export default offersService;