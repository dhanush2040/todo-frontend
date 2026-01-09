import { useNavigate } from "react-router-dom";
import "./About.css";
const About = ({ visible }) => {
  const navigate = useNavigate();
  return (
    visible && (
      <>
        <div className="reset-password-window-container">
          <div className="settings-tab-title-conatainer">
            <span>About</span>
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
          <div className="about-info-container">
            <p className="about-info">
              This website is a simple and efficient Task Management Platform
              designed to help you organize your daily work with clarity and
              ease. It allows you to create, update, and manage your todos while
              keeping track of your progress in a structured and visually
              appealing way.
            </p>
            <div className="features-container">
              <span className="about-info-title">What You Can Do Here</span>
              <div className="feature-info-container">
                <ul className="features-list">
                  <li className="features-list-items">
                    Add and manage your tasks at any time
                  </li>
                  <li className="features-list-items">
                    Track active, completed, and pending todos
                  </li>
                  <li className="features-list-items">
                    View your productivity through an interactive pie chart
                  </li>
                  <li className="features-list-items">
                    Securely store your data using your account
                  </li>
                  <li className="features-list-items">
                    Clear data or reset your password whenever needed
                  </li>
                </ul>
              </div>
            </div>
            <div className="puropse-container">
              <span className="about-info-title">Purpose</span>
              <p className="puropse-info-container">
                The main goal of this website is to provide users with a smooth
                and distraction-free experience for handling everyday tasks.
                Everything is designed to be minimal, fast, and
                user-friendly—helping you stay productive without unnecessary
                complexity.
              </p>
            </div>

            <div className="vision-container">
              <span className="about-info-title">Vision</span>
              <p className="vision-info-container">
                To create a simple yet powerful tool that helps you stay
                organized and achieve better control over your daily workflow.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default About;
