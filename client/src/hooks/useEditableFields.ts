import { useState } from "react";

type ValidationRules<T> = Partial<
  Record<keyof T, (value: T[keyof T]) => string | null>
>;

type ErrorState<T> = Partial<Record<keyof T, string>>;

export const useEditableFields = <T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
) => {
  const [fields, setFields] = useState<T>(initialValues);
  const [editMode, setEditMode] = useState<Partial<Record<keyof T, boolean>>>(
    {}
  );
  const [errors, setErrors] = useState<ErrorState<T>>({});

  const isEditModeActive = Object.values(editMode).some((isActive) => isActive);
  const isFormValid = Object.values(errors).every((error) => !error);

  const handleFieldChange = (field: keyof T, value: string) => {
    const error = validationRules[field]?.(value) || null;

    setErrors((prev) => ({ ...prev, [field]: error }));
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const toggleEditMode = (event: React.MouseEvent, fieldName: keyof T) => {
    event.preventDefault();

    if (fields[fieldName].trim().length <= 0) return;

    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [fieldName]: !prevEditMode[fieldName],
    }));
  };

  return {
    editMode,
    errors,
    fields,

    toggleEditMode,
    handleFieldChange,

    isEditModeActive,
    isFormValid,
  };
};
