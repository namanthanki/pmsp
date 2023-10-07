import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("./screens/Dashboard"));
const Register = lazy(() => import("./screens/Register"));
const Login = lazy(() => import("./screens/Login"));
const VerifyOTP = lazy(() => import("./screens/VerifyOTP"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyOTP />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
