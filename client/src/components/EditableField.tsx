import { EditSquareOutline, EditOffOutline } from "../components";

interface EditableFieldProps<T> {
  labelName: string;
  inputName: keyof T;
  fieldValue: string | undefined;
  isEditActive: boolean | undefined;
  onFieldChange: (field: keyof T, value: string) => void;
  toggleEditMode: (event: React.MouseEvent, field: keyof T) => void;
  inputType: string;
  error?: string | null;
}

const EditableField = <T,>({
  labelName,
  inputName,
  fieldValue,
  isEditActive,
  onFieldChange,
  toggleEditMode,
  inputType,
  error,
}: EditableFieldProps<T>) => {
  return (
    <label>
      {`${labelName}: `}
      <input
        type={inputType}
        name={(inputName as string) ?? ""}
        value={(fieldValue as string) ?? ""}
        disabled={!isEditActive}
        onChange={(e) => onFieldChange(inputName, e.target.value)}
      />
      <button onClick={(event) => toggleEditMode(event, inputName)}>
        {isEditActive ? <EditOffOutline /> : <EditSquareOutline />}
      </button>
      {error && <span>Error: {error} </span>}
    </label>
  );
};

export default EditableField;
