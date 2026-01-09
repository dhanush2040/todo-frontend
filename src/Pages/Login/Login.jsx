import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TodoImg from "./../../assets/sticky-note.png";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [warning, setwarning] = useState("");
  const [useremail, setuseremail] = useState("");
  const [password, setpassword] = useState("");
  function validateUser() {
    if (useremail.length === 0 || password.length === 0) {
      return false;
    }
    return true;
  }

  async function login() {
    if (validateUser()) {
      try {
        let res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ useremail: useremail.toLowerCase(), password }),
        });
        let data = await res.json();
        if (data.status === "ok") {
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
        } else {
          setwarning(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setwarning("All fields are required");
    }
  }
  return (
    <>
      <div className="box-container">
        <div className="login-container">
          <div className="image-holder">
            <img src={TodoImg} alt="Todo Image" draggable="false" />
          </div>
          <hr />
          <div className="form-container">
            <h2>Login</h2>
            <div className="input-holder">
              <label htmlFor="user-email" className="useremail-label">
                Enter the E-mail :
              </label>
              <input
                type="email"
                name="useremail"
                id="user-email"
                className="input"
                value={useremail}
                onChange={(e) => setuseremail(e.target.value)}
                onFocus={() => setwarning("")}
                autoFocus
              />
            </div>
            <div className="input-holder">
              <label htmlFor="password" className="password-label">
                Enter the Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                onFocus={() => setwarning("")}
              />
              <span className="indicator">{warning}</span>
            </div>
            <Link to="#">forget password ?</Link>
            <div className="btn-container">
              <span className="signin-link">
                Don't have an account ?{" "}
                <Link to="/signup">Signin</Link>
              </span>
              <button className="btn" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
