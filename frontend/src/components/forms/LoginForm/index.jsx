import { Link } from "react-router";

const LoginForm = ({ onLoginSubmit }) => (
  <form onSubmit={onLoginSubmit}>
    <input type="text" name="username" placeholder="Enter Username" />
    <input type="password" name="password" placeholder="Enter Password" />
    <button type="submit">Login</button>
    <Link to="/password/reset/">Forgot password?</Link>
  </form>
);

export default LoginForm;
