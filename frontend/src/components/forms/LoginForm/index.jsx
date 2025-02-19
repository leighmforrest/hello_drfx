
const LoginForm = ({ onLoginSubmit }) => (
  <form onSubmit={onLoginSubmit}>
    <input type="text" name="username" placeholder="Enter Username" />
    <input type="password" name="password" placeholder="Enter Password" />
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;
