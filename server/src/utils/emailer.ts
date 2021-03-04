import IUserModel from "../models/userModel";

import { SENDGRID_KEY } from "../utils/secrets";
import sgMail from '@sendgrid/mail';
import { IMessage } from "interfaces";
sgMail.setApiKey(SENDGRID_KEY);

const sender = 'noreply@homebrewswap.app';

const ids = {
  pwResetReq: 'd-f181b99cf4cc48158830db768b550b15',
  offerMsg: 'd-2eb440b5ecd34d3783575e69b2610256',
  pwReset:  'd-11c10b8b0e3f4e5abf466ee978379d83'
};

const pwResetReq = async (user: IUserModel, token: { token: string }): Promise<any> => {

  const msg = {
    to: user.email,
    from: sender,
    templateId: ids.pwResetReq,
    dynamicTemplateData: {
      token: token.token,
      brewer: user.username
    },
  };

  const emailResponse = await sgMail.send(msg);
  return emailResponse;
};

const offerMsg = async (user: IUserModel, message: IMessage): Promise<any> => {

  const msg = {
    to: user.email,
    from: sender,
    templateId: ids.offerMsg,
    dynamicTemplateData: {
      beerName: message.beerName,
      message: message.message,
      contactDetails: message.contactDetails,
      brewer: user.username
    },
  };

  const emailResponse = await sgMail.send(msg);
  return emailResponse;
};

const pwChangeConfirm = async (user: IUserModel): Promise<any> => {

  const msg = {
    to: user.email,
    from: sender,
    templateId: ids.pwReset,
    dynamicTemplateData: {
      brewer: user.username
    },
  };

  const emailResponse = await sgMail.send(msg);
  return emailResponse;
};



const emailer = { pwResetReq, pwChangeConfirm, offerMsg };


export default emailer;