import react, { useState } from "react";
import useSignup from "../../components/hooks/useSignup";
import {Link} from 'react-router-dom'

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // custom signup hooks ...
  const { signup } = useSignup();

  // submit handler ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <>
      <div className="signup">
        <h1>Signup Page </h1>
        <form onSubmit={handleSubmit}>
          <div className="name">
            <label>
              <span>your Name </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>

          <div className="email">
            <label>
              <span>Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your EmailId"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="password">
            <label>
              <span>password</span>
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="confirmPassword">
            <label>
              <span>confirmPassword</span>
            </label>
            <input
              type="text"
              placeholder="again enter your password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="role">
            <label>
              <span>Role</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Role"
              value={inputs.role}
              onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
            />
          </div>
          {/* <Link to={"/login"}>
          Already have an account ? 
          </Link> */}
          <button>Signup</button>
        </form>
      </div>
    </>
  );
}

export default Signup ; 
