import React, { useState } from "react";
import axios from "axios";

import { useAuthStore } from "../../hooks";
import { getEnvVariables } from "../../helpers";

import styles from "../styles/UserPage.module.css";
import { authApi } from "../../api";

interface EditableFieldProps<T> {
  labelName: string;
  inputName: keyof T;
  fieldValue: string | undefined;
  isEditActive: boolean | undefined;
  onFieldChange: (field: keyof T, value: string) => void;
  toggleEditMode: (event: React.MouseEvent, field: keyof T) => void;
}

const EditableField = <T,>({
  labelName,
  inputName,
  fieldValue,
  isEditActive,
  onFieldChange,
  toggleEditMode,
}: EditableFieldProps<T>) => {
  return (
    <label htmlFor="">
      {`${labelName}: `}
      <input
        type="text"
        name={(inputName as string) ?? ""}
        value={(fieldValue as string) ?? ""}
        disabled={!isEditActive}
        onChange={(e) => onFieldChange(inputName, e.target.value)}
      />
      <button onClick={(event) => toggleEditMode(event, inputName)}>
        {isEditActive ? "Save" : "Edit"}
      </button>
    </label>
  );
};

const useEditableFields = <T extends Record<string, unknown>>(
  initialValues: T
) => {
  const [fields, setFields] = useState<T>(initialValues);
  const [editMode, setEditMode] = useState<Partial<Record<keyof T, boolean>>>(
    {}
  );

  const handleFieldChange = (field: keyof T, value: string) => {
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const toggleEditMode = (event: React.MouseEvent, fieldName: keyof T) => {
    event.preventDefault();

    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [fieldName]: !prevEditMode[fieldName],
    }));
  };

  return {
    editMode,
    fields,
    handleFieldChange,
    toggleEditMode,
  };
};

const UserPage = () => {
  const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_AVATAR_PRESET } =
    getEnvVariables();

  const { user, startLogout } = useAuthStore();

  const { fields, editMode, handleFieldChange, toggleEditMode } =
    useEditableFields(user);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", VITE_CLOUDINARY_AVATAR_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );

      const uploadedUrl = response.data.secure_url;

      await authApi.put(`/users/${user.uid}`, {
        photo_url: uploadedUrl,
      });

      setImageUrl(uploadedUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <>
      <h1>User Page</h1>
      <h3>Bienvenido {user.name}</h3>

      <div className={styles.info__container}>
        {user.photo_url && (
          <img
            src={user.photo_url}
            alt="Avatar"
            className={styles.avatar__image}
          />
        )}

        <input
          type="file"
          name="avatar_file"
          placeholder="Upload avatar"
          onChange={handleUploadImage}
        />
      </div>

      <form className={styles.info__container}>
        <EditableField
          labelName="Nombre"
          inputName="name"
          fieldValue={fields.name}
          isEditActive={editMode.name || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />

        <EditableField
          labelName="Email"
          inputName="email"
          fieldValue={fields.email}
          isEditActive={editMode.email || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />

        <EditableField
          labelName="Direccion"
          inputName="address"
          fieldValue={fields.address}
          isEditActive={editMode.address || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />

        <EditableField
          labelName="Telefono"
          inputName="phone"
          fieldValue={fields.phone}
          isEditActive={editMode.phone}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />
      </form>

      <button onClick={() => startLogout()}>Logout</button>
    </>
  );
};

export default UserPage;
