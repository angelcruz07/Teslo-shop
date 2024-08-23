import { UseFormRegister } from "react-hook-form";
import { FormInputs } from "../models";

interface Props {
  label: string;
  name: keyof FormInputs;
  type?: string;
  register: UseFormRegister<FormInputs>;
  required?: boolean;
}

export const InputForm = ({
  label,
  type = "text",
  register,
  name,
  required = true,
}: Props) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="p-2 border rounded-md bg-gray-200"
        {...register(name, { required })}
      />
    </div>
  );
};
