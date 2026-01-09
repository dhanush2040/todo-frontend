import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";
import "./ResetPassword.css";
const ResetPassword = ({ visible }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [Passwords, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function validateUser() {
    if (
      Passwords.oldPassword.length === 0 ||
      Passwords.newPassword.length === 0 ||
      Passwords.confirmNewPassword.length === 0
    ) {
      return false;
    }
    return true;
  }

  async function submit() {
    if (validateUser()) {
      if (Passwords.newPassword === Passwords.confirmNewPassword) {
        if (Passwords.newPassword !== Passwords.oldPassword) {
          if (/[0-9]/.test(Passwords.newPassword)) {
            if (/[A-Z]/.test(Passwords.newPassword)) {
              if (/[a-z]/.test(Passwords.newPassword)) {
                if (/[!@#$%^&*]/.test(Passwords.newPassword)) {
                  if (Passwords.newPassword.length >= 8) {
                    try {
                      setLoading(true);
                      let userData = JSON.parse(localStorage.getItem("token"));
                      let res = await fetch(
                        "http://localhost:5000/auth/reset",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ...Passwords,
                            email: userData.useremail,
                          }),
                        }
                      );
                      let data = await res.json();
                      if (data.status === "ok") {
                        setPassword((prev) => {
                          return {
                            ...prev,
                            oldPassword: "",
                            newPassword: "",
                            confirmNewPassword: "",
                          };
                        });
                        console.log(data.message);
                        alert("Password reset successful, please login again");
                      } else {
                        setLoading(false);
                        setWarning(data.message);
                      }
                    } catch (err) {
                      console.log(err);
                    } finally {
                      setLoading(false);
                    }
                  } else {
                    setWarning("Password must be at least 8 characters long");
                  }
                } else {
                  setWarning(
                    "Password must contain at least one special character"
                  );
                }
              } else {
                setWarning(
                  "Password must contain at least one lowercase letter"
                );
              }
            } else {
              setWarning("Password must contain at least one uppercase letter");
            }
          } else {
            setWarning("Password must contain at least one digit");
          }
        } else {
          setWarning("New password must be different from old password");
        }
      } else {
        setWarning("Password do not match");
      }
    } else {
      setWarning("All fields are required");
    }
  }
  return (
    visible && (
      <>
        <Loading visible={loading} />
        <div className="reset-password-window-container">
          <div className="settings-tab-title-conatainer">
            <span>Reset Password</span>
            <button className="home-btn" onClick={() => navigate("/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
              <span>Home</span>
            </button>
          </div>
          <div className="reset-password-container">
            <table>
              <tbody>
                <tr className="reset-password-block">
                  <td>
                    <label
                      htmlFor="old-password"
                      className="old-password-label"
                    >
                      Enter the Old Password:
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="old-password"
                      id="old-password"
                      placeholder="Old Password"
                      value={Passwords.oldPassword}
                      onChange={(e) =>
                        setPassword((prev) => {
                          return { ...prev, oldPassword: e.target.value };
                        })
                      }
                      onFocus={() => setWarning("")}
                      autoFocus
                    />
                  </td>
                </tr>
                <tr className="reset-password-block">
                  <td>
                    <label
                      htmlFor="new-password"
                      className="new-password-label"
                    >
                      Enter the new Password:
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      value={Passwords.newPassword}
                      onChange={(e) =>
                        setPassword((prev) => {
                          return { ...prev, newPassword: e.target.value };
                        })
                      }
                      onFocus={() => setWarning("")}
                      placeholder="New Password"
                    />
                  </td>
                </tr>
                <tr className="reset-password-block">
                  <td>
                    <label
                      htmlFor="confirm-new-password"
                      className="confirm-new-password-label"
                    >
                      Confirm Your Password:
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="confirm-new-password"
                      id="confirm-new-password"
                      value={Passwords.confirmNewPassword}
                      onChange={(e) =>
                        setPassword((prev) => {
                          return {
                            ...prev,
                            confirmNewPassword: e.target.value,
                          };
                        })
                      }
                      onFocus={() => setWarning("")}
                      placeholder="Confirm new Password"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="warning">{warning}</div>
            <div className="reset-password-btn-container">
              <button className="next-btn" onClick={submit}>
                next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ResetPassword;
