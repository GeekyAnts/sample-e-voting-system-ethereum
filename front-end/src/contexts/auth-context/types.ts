import { ActionMap } from "../vote-context";
import { AUTH } from "./action-types";

export type InitialStateType = {
  aadharId: string;
  isUserLoggedIn: boolean;
  votedCandidate: string;
};

export type ActionType = {
  type: string;
  payload?: {};
};

export type AuthPayload = {
  [AUTH.SET_AADHAR_ID]: string;
  [AUTH.SET_LOGIN_STATUS]: boolean;
  [AUTH.RESET]: any;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
