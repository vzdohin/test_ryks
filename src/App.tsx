import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import { User } from "./types";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователей:", error);
      });
  }, []);

  const handleSort = (key: "city" | "company") => {
    const sortedUsers = [...users].sort((a, b) => {
      if (key === "city") {
        return a.address.city.localeCompare(b.address.city);
      } else if (key === "company") {
        return a.company.name.localeCompare(b.company.name);
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  return (
    <Router>
      <div className="wrapper">
        <div className="sidebar">
          <p className="filter-title">Сортировка</p>
          <div className="filter-wrapper">
            <button
              className="profile-form-button"
              onClick={() => handleSort("city")}
            >
              По городу
            </button>
            <button
              className="profile-form-button"
              onClick={() => handleSort("company")}
            >
              По компании
            </button>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<UserList users={users} setUsers={setUsers} />}
            />
            <Route
              path="/user/:id"
              element={<UserProfile users={users} setUsers={setUsers} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
