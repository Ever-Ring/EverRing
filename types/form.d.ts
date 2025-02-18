import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormValues {
  name?: string;
  companyName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface Pattern {
  value: RegExp;
  message: string;
}

export interface InputFormProps {
  id: string;
  name: keyof FormValues;
  type: string;
  label: string;
  labelTextSize?: "sm" | "base";
  placeholder: string;
  register?: UseFormRegister<FormValues>;
  rules?: RegisterOptions;
  errors?: FieldErrors<FormValues> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface InputProps extends InputFormProps {
  name: string;
  isInvalid?: boolean;
}
