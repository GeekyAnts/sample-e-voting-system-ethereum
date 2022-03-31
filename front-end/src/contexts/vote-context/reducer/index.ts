import { VOTING } from "../action-types";
import { VoteActions, VoteStateType } from "../types";

const initialState: VoteStateType = {
  allCandidates: [],
  voteTiming: "",
  checkVoteRes: undefined,
  votedCandidate: undefined,
  loading: false,
  winnerCandidate: undefined,
};

export function voteReducer(
  state = initialState,
  action: VoteActions
): VoteStateType {
  switch (action.type) {
    case VOTING.SET_LOADING:
      return { ...state, loading: action.payload };

    case VOTING.GET_ALL_CANDIDATE:
      return { ...state, allCandidates: action.payload };

    case VOTING.SET_VOTE_TIME:
      return { ...state, voteTiming: action.payload };

    case VOTING.CAST_YOUR_VOTES:
      return {
        ...state,
        votedCandidate: action.payload,
        checkVoteRes: {
          votedCandidate: action.payload,
          canVote: false,
          error: false,
        },
      };

    case VOTING.CHECK_ALREADY_VOTED:
      return {
        ...state,
        checkVoteRes: action.payload,
        votedCandidate: undefined,
      };

    case VOTING.GET_WINNER:
      return { ...state, winnerCandidate: action.payload };

    case VOTING.IS_CANDIDATE_ELIGIBLE:
      const checkVoteData = {
        canVote: action.payload,
        error: false,
        votedCandidate: undefined,
      };
      return {
        ...state,
        checkVoteRes: checkVoteData,
      };
      
    case VOTING.RESET:
      return initialState;

    default:
      return state;
  }
}
export default voteReducer;
