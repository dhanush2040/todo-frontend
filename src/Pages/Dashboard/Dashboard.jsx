import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./../../Components/Loading/Loading";
import Profileicon from "../../Components/Profileicon/Profileicon";
import "./Dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const todoInput = useRef(null);
  const [option , setOption] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedTodo, setCompletedTodos] = useState([]);
  const [notCompletedTodo, setNotCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/login");
    }
  });

  async function fetchData() {
    try {
      setLoading(true);
      let info = localStorage.getItem("token");
      let res = await fetch("http://localhost:5000/data", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: info,
      });
      let data = await res.json();
      setTodos(data.activeTodo || []);
      setCompletedTodos(data.completedStatus || []);
      setNotCompletedTodos(data.notCompletedStatus || []);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addTodo() {
    if (todoInput.current.value !== "") {
      const data = { id: todos.length + 1, text: todoInput.current.value };
      setTodos((prev) => [...prev, data]);
      todoInput.current.value = "";
    }
  }

  function addTodoOnEnter(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  function setToCompleted(data) {
    let removedData = todos.filter((info) => info.id !== data.id);
    data.id = completedTodo.length + 1;
    let addedData = [...completedTodo, data];
    setTodos(removedData);
    setCompletedTodos(addedData);
  }

  function setToNotCompleted(data) {
    let removedData = todos.filter((info) => info.id !== data.id);
    data.id = notCompletedTodo.length + 1;
    let addedData = [...notCompletedTodo, data];
    setTodos(removedData);
    setNotCompletedTodos(addedData);
  }

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
            activeTodo: todos,
            completedStatus: completedTodo,
            notCompletedStatus: notCompletedTodo,
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

  useEffect(() => {
    updateData();
  }, [todos]);

  useEffect(() => {
    updateData();
  }, [completedTodo]);

  useEffect(() => {
    updateData();
  }, [notCompletedTodo]);

  return (
    <>
      <Profileicon open = {option} setOpen={setOption}/>
      <Loading status={loading} />
      <div
        className="window-container"
        onMouseMove={() => todoInput.current?.focus()}
      >
        <div className="dashboard-container">
          <div className="header">
            <h2 className="app-title">Taskify</h2>
            <button
              className="profile-icon-btn"
              title="profile"
              onClick={() => setOption(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="profile-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="todo-entry-container">
            <div className="entry-container">
              <input
                type="text"
                placeholder="What do you need to do?"
                style={{color:"white"}}
                ref={todoInput}
                onKeyDown={(e) => addTodoOnEnter(e)}
                autoFocus
              />
              <button onClick={addTodo} style={{color:"white"}}>Add</button>
            </div>
          </div>
          <div className="todo-list-container">
            {completedTodo.length === 0 &&
              todos.length === 0 &&
              notCompletedTodo.length === 0 && (
                <p className="no-todo-text">No tasks available. Add a task!</p>
              )}
            <></>
            <div className="todo-items-container">
              {todos.length !== 0 && (
                <>
                  <h3
                    className="todo-list-title"
                    style={{
                      marginRight: "57%",
                    }}
                  >
                    Your Tasks
                  </h3>
                  {todos.map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <span className="todo-list-items">{todo.text}</span>
                      <div className="todo-btn-container">
                        <button
                          className="completed-btn btn"
                          onClick={() => {
                            setToCompleted(todo);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="tick-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </button>
                        <button
                          className="not-completed-btn btn"
                          onClick={() => {
                            setToNotCompleted(todo);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="x-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {completedTodo.length !== 0 && (
                <>
                  <h3 className="todo-list-title">Completed Tasks</h3>
                  {completedTodo.map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <span className="todo-list-items completed-todo">
                        {todo.text}
                      </span>
                      <div className="completed-todo-btn-container">
                        <button className="completed-btn btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="tick-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {notCompletedTodo.length !== 0 && (
                <>
                  <h3
                    className="todo-list-title"
                    style={{ marginRight: "47%" }}
                  >
                    Not Completed Tasks
                  </h3>
                  {notCompletedTodo.map((todo) => (
                    <div key={todo.id} className="todo-item">
                      <span className="todo-list-items completed-todo">
                        {todo.text}
                      </span>
                      <div className="completed-todo-btn-container">
                        <button className="completed-btn btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="x-icon"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
