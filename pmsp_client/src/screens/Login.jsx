import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <div className="login-container">
        <form className="login-form">
          <h1>Login</h1>
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
          <input type="submit" value="LOGIN" />
          <p className="bottom-nav">
            Dont&apos;t Have an Account?&nbsp;
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
