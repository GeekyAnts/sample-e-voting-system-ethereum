import { AUTH } from "../action-types";
import { ActionType, AuthStateType } from "../types";

const initialState: AuthStateType = {
  aadharId: "1234567896",
  OTP: "123456",
  isUserLoggedIn: false,
  isLoading: false,
  isEligible: false,
};

export function authReducer(
  state = initialState,
  action: ActionType
): AuthStateType {
  switch (action.type) {
    case AUTH.SET_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload };
    case AUTH.RESET:
      return initialState;
    case AUTH.SET_ELIGIBLE:
      return { ...state, isEligible: action.payload };

    default:
      return state;
  }
}
export default authReducer;
