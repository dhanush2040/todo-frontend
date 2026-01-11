import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import server_url from "./../../../../server_url";
import "./Profile.css";
import Loading from "../../../../Components/Loading/Loading";
import PieChart from "./Components/Piechart";

const Profile = ({ visible }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/login");
    }
  });
  const [userData, setUserData] = useState({
    username: "",
    useremail: "",
    todoListCount: {
      activeTodo: 0,
      completedStatus: 0,
      notCompletedStatus: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      let info = localStorage.getItem("token");
      let res = await fetch(`${server_url}/data/profile`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: info,
      });
      let data = await res.json();
      setUserData(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

  return (
    visible && (
      <>
        <Loading status={loading} />
        <div className="profile-container">
          <div className="settings-tab-title-conatainer">
            <span>Profile</span>
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
              <span style={{ color: "white" }}>Home</span>
            </button>
          </div>
          <div className="profile-data-container">
            <div className="profile-table-wrapper">
              <table className="profile-table">
                <tbody>
                  <tr>
                    <td>User Name</td>
                    <td>{userData.username}</td>
                  </tr>
                  <tr>
                    <td>User Email</td>
                    <td>{userData.useremail}</td>
                  </tr>
                  <tr>
                    <td>Active Tasks</td>
                    <td>{userData.todoListCount.activeTodo}</td>
                  </tr>
                  <tr>
                    <td>Completed Tasks</td>
                    <td>{userData.todoListCount.completedStatus}</td>
                  </tr>
                  <tr>
                    <td>Pending Tasks</td>
                    <td>{userData.todoListCount.notCompletedStatus}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="productive-chart-container">
              <PieChart
                userData={{
                  activeTodo: userData.todoListCount.activeTodo,
                  completedStatus: userData.todoListCount.completedStatus,
                  notCompletedStatus: userData.todoListCount.notCompletedStatus,
                }}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
