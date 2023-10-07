import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";

const Dashboard = lazy(() => import("./screens/Dashboard"));
const Register = lazy(() => import("./screens/Register"));
const Login = lazy(() => import("./screens/Login"));
const VerifyOTP = lazy(() => import("./screens/VerifyOTP"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/verify/:email" element={<VerifyOTP />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
