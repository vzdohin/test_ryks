import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types";

interface UserProfileProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserProfile: React.FC<UserProfileProps> = ({ users, setUsers }) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = users.find((u) => u.id === Number(id));
    if (currentUser) {
      setUser(currentUser);
      setFormData(currentUser);
    }
  }, [id, users]);

  if (!user) return <div>Загрузка...</div>;

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (formData) {
      if (name.includes("address.")) {
        const addressField = name.split(".")[1];
        setFormData({
          ...formData,
          address: {
            ...formData.address,
            [addressField]: value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (formData) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.address.city ||
        !formData.phone ||
        !formData.website
      ) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
      }

      const updatedUsers = users.map((u) =>
        u.id === formData.id ? formData : u
      );
      setUsers(updatedUsers);
      console.log("Обновленные данные пользователя:", formData);

      setIsEditable(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="title-wrapper">
        <h1>Профиль пользователя</h1>
        <button
          type="button"
          onClick={handleEditClick}
          className="profile-form-button"
        >
          Редактировать
        </button>
      </div>
      <form className="profile-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData?.username || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Street</label>
          <input
            type="text"
            name="address.street"
            value={formData?.address.street || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="address.city"
            value={formData?.address.city || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="address.zipcode"
            value={formData?.address.zipcode || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData?.website || ""}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            name="comment"
            value={formData?.comment || ""}
            onChange={handleChange}
            disabled={!isEditable}
            rows={4}
          />
        </div>
        {isEditable ? (
          <button type="button" onClick={handleSubmit} className="button-send">
            Отправить
          </button>
        ) : (
          <button
            type="button"
            disabled
            onClick={handleSubmit}
            className="button-send"
          >
            Отправить
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
