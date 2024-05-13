import {
  Control,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

interface IInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

export const Input = ({ name, control, rules, placeholder }: IInputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <input
        value={field.value}
        placeholder={placeholder}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {fieldState.error && (
        <a style={{ color: "red", fontSize: 8 }}>{fieldState.error.message}</a>
      )}
    </div>
  );
};
