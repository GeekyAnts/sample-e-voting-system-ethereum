export interface Candidate {
  name: string;
  nominationNumber: string;
  partyShortcut: string;
  voteCount: string;
  partyFlag: string /* added now */;
  stateCode: number;
  constituencyCode: number;
}
export interface CastVoteResponse {
  msg: string;
  error: boolean;
}

export interface CheckVoteStatusResponse {
  canVote: boolean;
  votedCandidate?: Candidate;
  error: boolean;
}
