import { AUTH } from "../action-types";
import { initialState } from "../data";
import { AuthActions, InitialStateType } from "../types";

export function authReducer(
  state: InitialStateType = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case AUTH.SET_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload as boolean };

    case AUTH.SET_AADHAR_ID: {
      localStorage.setItem("LOGGEDIN_AADHAR_ID", action.payload);
      return {
        ...state,
        aadharId: action.payload as string,
      };
    }

    case AUTH.RESET:
      localStorage.removeItem("LOGGEDIN_AADHAR_ID");
      window.localStorage.clear();
      return initialState;

    default:
      return state;
  }
}
export default authReducer;
