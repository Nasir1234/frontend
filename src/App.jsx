import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "./redux/features/auth/authThunks";
import AppRoutes from "./router/routes";

function App() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  // ✅ Spinner while checking session
  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Checking session...</p>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
