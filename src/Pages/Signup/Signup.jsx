import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TodoImg from "./../../assets/sticky-note.png";
import Loading from "../../Components/Loading/Loading";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [warning, setwarning] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  function validateUser() {
    if (username.length === 0 || password.length === 0 || email.length === 0) {
      return false;
    }
    return true;
  }

  async function submit() {
    if (validateUser()) {
      if (/[0-9]/.test(password)) {
        if (/[A-Z]/.test(password)) {
          if (/[a-z]/.test(password)) {
            if (/[!@#$%^&*]/.test(password)) {
              if (password.length >= 8) {
                try {
                  setLoading(true);
                  let res = await fetch("http://localhost:5000/auth/signup", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, useremail : email.toLowerCase(), password }),
                  });
                  let data = await res.json();
                  if (data.status === "ok") {
                    console.log(data.token);
                    localStorage.setItem("token", JSON.stringify(data.token));
                    navigate("/");
                  } else {
                    setLoading(false);
                    setwarning(data.message);
                  }
                } catch (err) {
                  console.log(err);
                }
              } else {
                setwarning("Password must be at least 8 characters long");
              }
            } else {
              setwarning(
                "Password must contain at least one special character"
              );
            }
          } else {
            setwarning("Password must contain at least one lowercase letter");
          }
        } else {
          setwarning("Password must contain at least one uppercase letter");
        }
      } else {
        setwarning("Password must contain at least one digit");
      }
    } else {
      setwarning("All fields are required");
    }
  }
  return (
    <>
      <Loading status={loading}/>
      <div className="box-container">
        <div className="login-container" style={{ height: "28rem" }}>
          <div className="image-holder">
            <img src={TodoImg} alt="Todo Image" draggable="false" />
          </div>
          <hr style={{ height: "400px" }} />
          <div className="form-container">
            <h2>Signup</h2>
            <div className="input-holder">
              <label htmlFor="user-name" className="username-label">
                Enter the User name :
              </label>
              <input
                type="text"
                name="username"
                id="user-name"
                className="input"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                onFocus={() => setwarning("")}
                autoFocus
              />
            </div>
            <div className="input-holder">
              <label htmlFor="user-name" className="username-label">
                Enter the Email :
              </label>
              <input
                type="email"
                name="email"
                id="user-email"
                className="input"
                value={email}
                style={{ marginBottom: "10px" }}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setwarning("")}
              />
            </div>
            <div className="input-holder">
              <label htmlFor="password" className="username-label">
                Enter the Password :
              </label>
              <input
                type="password"
                name="username"
                id="password"
                className="input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                onFocus={() => setwarning("")}
              />
              <span className="indicator">{warning}</span>
            </div>
            <div className="btn-container">
              <span className="signin-link">
                I have already have an account ?<Link to="/">Login</Link>
              </span>
              <button className="btn" onClick={submit}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
