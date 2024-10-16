import React from "react";
import { Link } from "react-router-dom";
import { User } from "../types";

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  if (users.length === 0) {
    return <div>Загрузка данных...</div>;
  }
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
        <h2 className="content-title">Список пользователей</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-list-item">
              <div className="user-details">
                <p className="user-text">
                  <span className="user-span">ФИО:</span> {user.name}
                </p>
                <p className="user-text">
                  <span className="user-span">город:</span> {user.address.city}
                </p>
                <p className="user-text">
                  <span className="user-span">компания:</span>{" "}
                  {user.company.name}
                </p>
              </div>
              <div className="details-link">
                <Link to={`/user/${user.id}`}>Подробнее</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
