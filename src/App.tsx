import { Outlet } from "react-router-dom";
import { AuthenticatedNavbar, Container, Footer, Navbar } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { TracingBeam } from "./components/ui/tracing-beam";
import { login, logout } from "./redux/authSlice";
import { useGetCurrentUser } from "./services/api/auth";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const user = useSelector((state: RootState) => state.auth.user);
  const { data: userData, isError, isLoading } = useGetCurrentUser();
  const [loading, setLoading] = useState(true);

  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      dispatch(logout());
    } else if (userData) {
      const { data, access, refresh, csrf_token } = userData;
      dispatch(
        login({
          user: data,
          accessToken: access,
          refreshToken: refresh,
          csrfToken: csrf_token,
        })
      );
    } else if (isLoggedIn) {
      dispatch(logout());
    }

    setLoading(false);
  }, [dispatch, isLoggedIn, userData, isError, isLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full overflow-hidden font-[SUSE]">
        <main className="relative w-full mx-auto h-full">
          <Container>
            <div className="relative z-30" ref={topRef}>
              {!isLoggedIn ? <Navbar scrollToAbout={scrollToAbout}/> : <AuthenticatedNavbar scrollToAbout={scrollToAbout}/>}
            </div>
            <div className="w-full bg-blue-900">
              <img
                src="ellipse1.svg"
                alt="ellips1"
                className="absolute top-0 left-0"
              />
              <img
                src="ellipse2.svg"
                alt="ellips2"
                className="absolute top-56 right-0"
              />
              <img
                src="ellipse3.svg"
                alt="ellips3"
                className="absolute top-[69rem] left-0"
              />
            </div>
            <TracingBeam>
              <Outlet context={{aboutRef}}/>
            </TracingBeam>
          </Container>
        </main>
        <Footer scrollToTop={scrollToTop} />
      </div>
    </>
  );
}

export default App;
