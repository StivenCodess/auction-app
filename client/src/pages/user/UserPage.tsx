import { useAuthStore } from "../../hooks";
import { getEnvVariables, getToastMessages } from "../../helpers";

import { toast } from "react-toastify";

import { userPageCSS } from "../../styles";
import { useDispatch } from "react-redux";
import { onUserInfoUpdate } from "../../store";
import cloudinaryApi from "../../api/cloudinaryAPI";
import { updateUser } from "../../services/userService";

import { SaveRounded, LogoutRounded } from "../../components/";
import { useEditableFields } from "../../hooks/useEditableFields";
import EditableField from "../../components/EditableField";

const { VITE_CLOUDINARY_AVATAR_PRESET } = getEnvVariables();

const validationRules = {
  email: (value: string) =>
    /^\S+@\S+\.\S+$/.test(value) ? null : "Ingresa un email valido!",
  phone: (value: string) =>
    value.length === 10 ? null : "Ingresa un numero valido!",
};

const UserPage = () => {
  const dispatch = useDispatch();
  const { user, startLogout } = useAuthStore();

  const {
    fields,
    editMode,
    handleFieldChange,
    toggleEditMode,
    isFormValid,
    isEditModeActive,
    errors,
  } = useEditableFields(user, validationRules);

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", VITE_CLOUDINARY_AVATAR_PRESET);

    const toastConfig = getToastMessages("update_user");

    try {
      const response = await toast.promise(
        cloudinaryApi.post("/", data),
        toastConfig
      );
      const uploadedUrl = response.data.secure_url;

      const responseUpdate = await updateUser(user.uid || "", {
        photo_url: uploadedUrl,
      });

      if (!responseUpdate.ok) return;

      const updatedUser = { ...user, photo_url: uploadedUrl };
      dispatch(onUserInfoUpdate(updatedUser));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleSaveSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { ok, uid, ...updatedUserInfo } = fields;

    if (!isFormValid) return;

    const toastConfig = getToastMessages("update_user");
    const response = await toast.promise(
      updateUser(uid || "", updatedUserInfo),
      toastConfig
    );

    dispatch(onUserInfoUpdate(response.user));
  };

  return (
    <>
      <h1>User Page</h1>
      <h3>Bienvenido {user.name}</h3>

      <div className={userPageCSS.info__container}>
        {user.photo_url && (
          <img
            src={user.photo_url}
            alt="Avatar"
            className={userPageCSS.avatar__image}
          />
        )}

        <input
          type="file"
          name="avatar_file"
          placeholder="Upload avatar"
          onChange={handleUploadImage}
        />
      </div>

      <form onSubmit={handleSaveSubmit} className={userPageCSS.info__container}>
        <EditableField
          labelName="Nombre"
          inputType="text"
          inputName="name"
          fieldValue={fields.name}
          isEditActive={editMode.name || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />

        <EditableField
          labelName="Email"
          inputType="email"
          inputName="email"
          fieldValue={fields.email}
          isEditActive={editMode.email || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
          error={errors.email || null}
        />

        <EditableField
          labelName="Direccion"
          inputType="text"
          inputName="address"
          fieldValue={fields.address}
          isEditActive={editMode.address || false}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
        />

        <EditableField
          labelName="Telefono"
          inputType="number"
          inputName="phone"
          fieldValue={fields.phone}
          isEditActive={editMode.phone}
          onFieldChange={handleFieldChange}
          toggleEditMode={toggleEditMode}
          error={errors.phone || null}
        />
        <button type="submit" disabled={isEditModeActive}>
          <SaveRounded /> Save
        </button>
      </form>

      <button onClick={() => startLogout()}>
        <LogoutRounded /> Logout
      </button>
    </>
  );
};

export default UserPage;
