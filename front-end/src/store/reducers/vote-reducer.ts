import { VOTING } from "../action-types";
import { ActionType, VoteStateType } from "../types";

const initialState: VoteStateType = {
    allCandidates: [],
    voteTiming: Math.round(Date.now() / 1000).toString(),
    checkVoteRes:undefined,
    votedCandidate: undefined,
    winnerCandidate: undefined
};

export function voteReducer(
  state = initialState,
  action: ActionType
): VoteStateType {
  switch (action.type) {
    case VOTING.GET_ALL_CANDIDATE:
      return { ...state, allCandidates: action.payload };
    case VOTING.SET_VOTE_TIME:
      return { ...state, voteTiming: action.payload };

    case VOTING.CAST_YOUR_VOTES:
       {  
         state.checkVoteRes!.canVote= false ;
         state.checkVoteRes!.votedCandidate=action.payload;
         state.checkVoteRes!.error=false;

         return { ...state, 
          votedCandidate: action.payload,
         
        };}

    case VOTING.CHECK_ALREADY_VOTED:
        return { ...state, 
          checkVoteRes:action.payload,
          votedCandidate:action.payload.votedCandidate

         };
    case VOTING.SET_VOTED_CANDIDATE:
          return { ...state,

            votedCandidate:action.payload.votedCandidate
           };
    case VOTING.GET_WINNER:
        return { ...state, winnerCandidate: action.payload };


    default:
      return state;
  }
}
export default voteReducer;
