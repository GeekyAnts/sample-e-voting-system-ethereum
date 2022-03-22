import { AUTH } from "../action-types";

export function setLoginStatus(payload: boolean) {
  return {
    type: AUTH.SET_LOGIN_STATUS,
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

export function userVoterEligibility(payload: boolean) {
  return {
    type: AUTH.SET_ELIGIBLE,
    payload,
  };
}
