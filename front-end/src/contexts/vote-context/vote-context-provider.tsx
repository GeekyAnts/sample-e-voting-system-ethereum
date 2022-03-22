import React, { createContext, useContext, useReducer } from "react";
import { voteReducer } from "./reducer";
import { VoteStateType } from "./types";

const VoteContext = createContext<{
  state: VoteStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: {} as VoteStateType,
  dispatch: () => null,
});

export function VoteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(voteReducer, {} as VoteStateType);

  return (
    <VoteContext.Provider value={{ state, dispatch }}>
      {children}
    </VoteContext.Provider>
  );
}
export default VoteContextProvider;

export const useVoteContext = () => useContext(VoteContext);
