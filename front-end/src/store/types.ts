import { Candidate, CheckVoteStatusResponse } from "../repository/interfaces";

export type AuthStateType = {
  aadharId: null | string;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isEligible: boolean;
  OTP: string;
};

export type ActionType = {
  type: string;
  payload: any;
};

export type VoteStateType = {
  allCandidates: Candidate[];
  // voteCastRes?: CastVoteResponse;
  voteTiming: string;
  checkVoteRes?: CheckVoteStatusResponse;
  votedCandidate?: Candidate;
  winnerCandidate?: Candidate;
};
