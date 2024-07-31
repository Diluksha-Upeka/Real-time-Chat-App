import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Started from "./pages/Started/Started";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
      {/* Initial route - Show the Started page */}
      <Route path="/started" element={<Started />} />

      {/* Redirect authenticated users from / to Home */}
      <Route
        path="/"
        element={authUser ? <Navigate to="/home" /> : <Navigate to="/started" />}
      />

      {/* Home route */}
      <Route
        path="/home"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />

      {/* Login route */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/home" /> : <Login />}
      />

      {/* Signup route */}
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/home" /> : <SignUp />}
      />
    </Routes>
			<Toaster />
		</div>
	);
}

export default App;
