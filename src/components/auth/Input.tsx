import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

export type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder: string;
  type: string;
};

function Input({ control, name, rules, placeholder, type }: TControl<any>) {
  const {
    field: { onChange, value },
  } = useController({ name, rules, control });
  return (
    <div className="border relative rounded-md overflow-hidden p-2 flex justify-center items-center">
      <input
        type={type}
        className={`${
          value ? "translate-y-1/3 text-sm" : ""
        } outline-none bg-transparent w-full leading-7`}
        onChange={onChange}
        value={value}
      />
      <div className="absolute inset-0 bg-gray-50 -z-10 p-2 text-xs flex items-center text-gray-400">
        <span
          className={`absolute ${
            value ? "scale-90 -translate-y-3/4" : ""
          } transition-all duration-100 ease-linear origin-left`}
        >
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export default Input;
