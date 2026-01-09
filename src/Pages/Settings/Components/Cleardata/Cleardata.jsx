import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./../../../../Components/Loading/Loading";
import "./Cleardata.css";
const Cleardata = ({ visible }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  async function updateData() {
    try {
      setLoading(true);
      let token = JSON.parse(localStorage.getItem("token"));
      let res = await fetch("http://localhost:5000/data/update", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          token,
          data: {
            activeTodo: [],
            completedStatus: [],
            notCompletedStatus: [],
          },
        }),
      });
      let data = await res.json();
      setLoading(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    visible && (
      <>
        <Loading visible={loading} />
        <div className="clear-section-window-container">
          <div className="settings-tab-title-conatainer">
            <span>Clear Data</span>
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
          <div className="settings-tab-container">
            <span className="warning-title">Warning</span>
            <div className="warning-container">
              <span>
                Clearing your todo list will permanently remove all tasks,
                including both completed and active items. This action cannot be
                undone and once the list is cleared, your tasks cannot be
                recovered. Please make sure you truly want to proceed before
                selecting the clear option.
              </span>
            </div>
            <div className="clear-btn-container">
              <button
                className="confirm-btn"
                onClick={() => {
                  updateData();
                  setDisable(true);
                }}
                disabled={disable}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <span className="clear-btn-label">Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Cleardata;
