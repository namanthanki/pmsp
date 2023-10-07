import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        const data = await fetch("http://localhost:5000/api/activate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        });

        if (data.ok) {
          const activationData = await data.json();
          toast.success(activationData.message);
          navigate(`/verify/${formData.email}`);
        } else {
          const errorData = await data.json();
          toast.error(errorData.error);
        }
      } else {
        const errorData = await response.json();
        if (errorData.errors.username) {
          toast.error("Registration error: " + errorData.errors.username, {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (errorData.errors.email) {
          toast.error("Registration error: " + errorData.errors.email, {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (errorData.errors.password) {
          toast.error("Registration error: " + errorData.errors.password, {
            position: "top-right",
            autoClose: 5000,
          });
        }
        console.log(errorData);
      }
    } catch (error) {
      toast.error("Network error: " + error, {
        position: "top-right",
        autoClose: 5000, // Close the toast after 5 seconds
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="container">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input type="submit" value="REGISTER" />
          <p className="bottom-nav">
            Already Have an Account?&nbsp;
            <Link to="/login">Login</Link>
          </p>
        </form>
        <div className="gif-container"></div>
      </div>
    </div>
  );
};

export default Register;
