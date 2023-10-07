import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container">
      <div className="register-container">
        <form className="register-form">
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input type="text" name="name" id="name" placeholder="Name" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input type="submit" value="REGISTER" />
          <p className="bottom-nav">
            Already Have an Account?&nbsp;
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
