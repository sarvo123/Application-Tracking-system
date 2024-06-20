import { useState } from "react";
import useLogin from "../../components/hooks/useLogin";

function Login() {
  // states variables ...
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login hook ...
    const {login} = useLogin()

  // submit handler ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, email, password);
  };

  return (
    <>
      <div className="login">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <label>
              <span>Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email">
            <label>
              <span>Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your EmailId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label>
              <span>Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login ; 
