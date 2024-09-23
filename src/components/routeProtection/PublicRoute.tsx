import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { login, logout } from "@/redux/authSlice";
import { useGetCurrentUser } from "@/services/api/auth";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const { data: userData, isError, isLoading } = useGetCurrentUser();

  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn) return;

    if (isError) {
      dispatch(logout());
      return;
    }

    if (userData && !isLoggedIn) {
      console.log(userData);
      const { data, access, refresh, csrf_token } = userData;
      dispatch(
        login({
          user: data.user,
          accessToken: access,
          refreshToken: refresh,
          csrfToken: csrf_token,
        })
      );
    }
  }, [dispatch, isLoggedIn, userData, isError, isLoading]);

  console.log(isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace={false} /> : children;
};

export default PublicRoute;
