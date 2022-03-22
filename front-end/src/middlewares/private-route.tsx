import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../contexts";

const PrivateRoute = ({ children }: { children: any }) => {
  const {
    state: { isUserLoggedIn },
  } = useAuthContext();
  const state = useLocation();

  const userStatus = localStorage.getItem("LOGGEDIN_AADHAR_ID");
  // if (userStatus && !isUserLoggedIn) dispatch(setLoginStatus(true));

  console.log("isUserLoggedIn", "private");

  return isUserLoggedIn || userStatus ? (
    children
  ) : (
    <Navigate replace to="/login" state={{ from: state.pathname }} />
  );
};

export default PrivateRoute;
