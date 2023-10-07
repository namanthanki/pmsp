import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const response = await fetch("http://localhost:5000/api/logout", {
      method: "GET",
    });

    if (response.ok) {
      localStorage.removeItem("jwt");
      navigate("/login");
    }
  };
  return <button onClick={logout}>Logout</button>;
};

export default Dashboard;
