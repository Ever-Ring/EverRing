import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormValues {
  name?: string;
  companyName?: string;
  email?: string;
  password?: string;
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
  placeholder: string;
  register?: UseFormRegister<FormValues>;
  rules?: { required: string; pattern?: Pattern } | undefined;
  errors?: FieldErrors<FormValues> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface InputProps extends InputFormProps {
  name: string;
  isInvalid?: boolean;
}
