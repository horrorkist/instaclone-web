import React from "react";

interface IButtonProps {
  isValid: boolean;
  text: string | React.ReactElement;
}
function Button({ isValid, text }: IButtonProps) {
  return (
    <button
      disabled={!isValid}
      className={`${
        isValid ? "bg-blue-400 hover:bg-blue-500" : "bg-blue-300 cursor-default"
      } px-4 py-2 text-white rounded-lg font-bold flex justify-center items-center h-10`}
      type="submit"
    >
      {text}
    </button>
  );
}

export default Button;
