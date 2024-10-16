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
  const [errors, setErrors] = useState<Record<string, boolean>>({});

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
    const newErrors: Record<string, boolean> = {};

    // Проверка обязательных полей
    if (!formData?.name || formData?.name.trim() === "") {
      newErrors.name = true;
    }
    if (!formData?.email || formData?.email.trim() === "") {
      newErrors.email = true;
    }
    if (!formData?.address.city || formData?.address.city.trim() === "") {
      newErrors.city = true;
    }
    if (!formData?.phone || formData?.phone.trim() === "") {
      newErrors.phone = true;
    }
    if (!formData?.website || formData?.website.trim() === "") {
      newErrors.website = true;
    }

    // Устанавливаем ошибки
    setErrors(newErrors);

    console.log("Ошибки валидации:", newErrors); // Проверь, выводятся ли ошибки

    // Если ошибок нет, сохраняем данные
    if (Object.keys(newErrors).length === 0) {
      const updatedUsers = users.map((u) =>
        u.id === formData?.id ? formData : u
      );
      console.log("Обновленные данные:", formData); // Это для проверки
      setUsers(updatedUsers); // обновляем пользователей

      setIsEditable(false); // Снимаем режим редактирования после отправки
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
            className={errors.name ? "error" : ""}
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
            className={errors.username ? "error" : ""}
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
            className={errors.email ? "error" : ""}
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
            className={errors.address ? "error" : ""}
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
            className={errors.address ? "error" : ""}
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
            className={errors.address ? "error" : ""}
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
            className={errors.phone ? "error" : ""}
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
            className={errors.website ? "error" : ""}
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
