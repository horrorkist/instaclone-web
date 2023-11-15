interface IButtonProps {
  isValid: boolean;
  text: string;
}
function Button({ isValid, text }: IButtonProps) {
  return (
    <button
      disabled={!isValid}
      className={`${
        isValid ? "bg-blue-400 hover:bg-blue-500" : "bg-blue-300 cursor-default"
      } px-4 py-2 text-white rounded-lg font-bold`}
      type="submit"
    >
      {text}
    </button>
  );
}

export default Button;
