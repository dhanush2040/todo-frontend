import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Cleardata from "./Components/Cleardata/Cleardata";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import About from "./Components/about/About";
import "./Settings.css";

const Settings = () => {
  const [profileSection, setProfileSection] = useState(true);
  const [resetPasswordSection, setResetPasswordSection] = useState(false);
  const [aboutSection, setAboutSection] = useState(false);
  const [clearSection, setClearSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      <div className="settings-window">
        <div
          className={`settings-option-container ${menuOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="settings-title-container">
            <span className="settings-title">Settings</span>
          </div>
          <div className="settings-options-list-container">
            <div
              className="settings-options-container"
              style={{ color: "white" }}
            >
              <button
                className="profile-options options"
                style={{
                  background: profileSection ? "#2c2a2aff" : "#101010",
                  color: "white",
                }}
                onClick={() => {
                  setResetPasswordSection(false);
                  setAboutSection(false);
                  setClearSection(false);
                  setProfileSection(true);
                  setMenuOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="profile-label">Profile</span>
              </button>

              <button
                className="clear-options options"
                style={{
                  background: clearSection ? "#2c2a2aff" : "#101010",
                  color: "white",
                }}
                onClick={() => {
                  setResetPasswordSection(false);
                  setAboutSection(false);
                  setProfileSection(false);
                  setClearSection(true);
                  setMenuOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
                <span className="clear-label">Clear Data</span>
              </button>

              <button
                className="reset-options options"
                style={{
                  background: resetPasswordSection ? "#2c2a2aff" : "#101010",
                  color: "white",
                }}
                onClick={() => {
                  setProfileSection(false);
                  setAboutSection(false);
                  setClearSection(false);
                  setResetPasswordSection(true);
                  setMenuOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z" />
                </svg>
                <span className="reset-password-label">Reset Password</span>
              </button>
            </div>
            <div className="about-options-container">
              <button
                className="about-options options"
                style={{
                  background: aboutSection ? "#2c2a2aff" : "#101010",
                  color: "white",
                }}
                onClick={() => {
                  setProfileSection(false);
                  setResetPasswordSection(false);
                  setClearSection(false);
                  setAboutSection(true);
                  setMenuOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>

                <span className="about-label">About</span>
              </button>

              <button
                className="logout-options options"
                style={{ background: "#ff0000" }}
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>

                <span className="logout-label">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-tab-window">
          <div className="menu-btn-container">
            <button
              className="menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
          </div>
          <div>
            <Profile visible={profileSection} />
            <Cleardata visible={clearSection} />
            <ResetPassword visible={resetPasswordSection} />
            <About visible={aboutSection} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
