export interface Candidate {
  name: string;
  aadharNumber: string;
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
