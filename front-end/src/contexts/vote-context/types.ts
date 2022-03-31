import {
  Candidate,
  CheckVoteStatusResponse,
} from "../../repository/interfaces";
import { VOTING } from "./action-types";

export type VoteStateType = {
  allCandidates: Candidate[];
  voteTiming: string;
  checkVoteRes?: CheckVoteStatusResponse;
  votedCandidate?: Candidate;
  winnerCandidate?: Candidate[];
  loading:boolean;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type VotePayload = {
  [VOTING.GET_ALL_CANDIDATE]: Candidate[];
  [VOTING.CAST_YOUR_VOTES]: Candidate;
  [VOTING.CHECK_ALREADY_VOTED]: CheckVoteStatusResponse;
  [VOTING.GET_WINNER]: Candidate[];
  [VOTING.SET_VOTE_TIME]: string;
  [VOTING.IS_CANDIDATE_ELIGIBLE]: boolean;
  [VOTING.SET_LOADING]: boolean;
  [VOTING.RESET]: any;
};

export type VoteActions = ActionMap<VotePayload>[keyof ActionMap<VotePayload>];
