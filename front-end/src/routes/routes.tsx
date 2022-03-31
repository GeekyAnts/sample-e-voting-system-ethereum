import { Route, Routes as ParentRoutes } from "react-router";
import PrivateRoute from "../middlewares/private-route";
import LoginPage from "../pages/login";
import { ErrorPage } from "../pages/error/error-page";
import { VotingPage } from "../pages/voting-page";
import { AlreadyCasted, HomePage } from "../pages/home";
import {
  useVoteContext,
  useAuthContext,
  setLoginStatus,
  setAadharID,
} from "../contexts";
import { LandingPage } from "../pages/landing-page";
import { ResultsPage } from "../pages/results";

const Routes = () => {
  const {
    state: { checkVoteRes },
  } = useVoteContext();
  const {
    state: { isUserLoggedIn },
    dispatch,
  } = useAuthContext();
  const userStatus = localStorage.getItem("LOGGEDIN_AADHAR_ID");
  if (userStatus && !isUserLoggedIn) {
    dispatch(setLoginStatus(true));
    dispatch(setAadharID(userStatus));
  }

  return (
    <ParentRoutes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            {checkVoteRes && !checkVoteRes.canVote ? (
              <AlreadyCasted />
            ) : (
              <HomePage />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/vote"
        element={
          <PrivateRoute>
            <VotingPage />
          </PrivateRoute>
        }
      />
    </ParentRoutes>
  );
};

export default Routes;
