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

  return (
    <Router>
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
    </Router>
  );
};

export default App;
