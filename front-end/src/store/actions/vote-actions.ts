import { Candidate, CastVoteResponse, CheckVoteStatusResponse } from "../../repository/interfaces";
import { VOTING } from "../action-types";

export function getAllCandidate(payload: Candidate []) {
    return {
      type: VOTING.GET_ALL_CANDIDATE,
      payload
    };
  }
  
  export function castVotes(payload: Candidate) {
    return {
      type: VOTING.CAST_YOUR_VOTES,
      payload
    };
  }
  
  export function checkVoterVoted(payload: CheckVoteStatusResponse) {
    return {
      type: VOTING.CHECK_ALREADY_VOTED,
      payload
    };
  }
  export function setWinner(payload: Candidate) {
    return {
      type: VOTING.GET_WINNER,
      payload
    };
  }
  export function setVoteDuration(payload: string) {
    return {
      type: VOTING.SET_VOTE_TIME,
      payload
    };
  }