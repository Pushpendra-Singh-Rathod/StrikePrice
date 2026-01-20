import { Label } from "../label";
import { Input } from "../input";

function InputField({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  disabled,
  value,
  validation,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-input disabled:opacity-50 disabled:cursor-not-allowed`}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export { InputField };
