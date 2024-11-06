import { useState } from "react";

const useForm = <T extends { [key: string]: string | number }>(
  initialform: T
) => {
  const [formState, setformState] = useState<T>(initialform);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setformState({ ...formState, [name]: value });
  };

  const onResetForm = () => setformState(initialform);

  return { ...formState, formState, onInputChange, onResetForm };
};

export default useForm;
