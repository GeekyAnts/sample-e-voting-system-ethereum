import { AUTH } from "../action-types";

export function setLoginStatus(payload: boolean) {
  return {
    type: AUTH.SET_LOGIN_STATUS,
    payload,
  };
}
export function setAadharID(payload: string) {
  return {
    type: AUTH.SET_AADHAR_ID,
    payload,
  };
}

export function setVotedCandidate(payload: string) {
  return {
    type: AUTH.SET_VOTED_CANDIDATE,
    payload,
  };
}

export function resetStates() {
  return {
    type: AUTH.RESET,
  };
}
