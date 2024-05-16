import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {!isLoggedIn && <Auth />}
      {isLoggedIn && (
        <>
          <Header />
          <UserProfile />
          <Counter />
        </>
      )}
    </>
  );
}

export default App;
