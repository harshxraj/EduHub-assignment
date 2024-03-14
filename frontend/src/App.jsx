import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Lectures from "./pages/Lectures";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (loading) return null;
  console.log(data);
  return (
    <>
      {/* <SideNav /> */}
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lectures" element={<Lectures />} />

        <Route
          path="/register"
          element={!data.authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
