import React from "react";

type Props = {
  Text: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => void;
  variant?: "primary" | "secondary" | "danger";
  requried?: boolean;
  role?: string;
  type?: "submit" | "button" | "reset";
};

const Button = (props: Props) => {
  const getButtonClasses = () => {
    const baseClasses =
      "transition duration-150 ease-in-out hover:scale-105 focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none";
    switch (props.variant) {
      case "primary":
        return `${baseClasses} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300`;
      case "secondary":
        return `${baseClasses} text-white bg-green-600 hover:bg-green-700 focus:ring-green-800`;
      case "danger":
        return `${baseClasses} text-white bg-red-700 hover:bg-red-800 focus:ring-red-300`;
      default:
        return `${baseClasses} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300`;
    }
  };
  return (
    <button
      role={props.role}
      onClick={props.onClick}
      className={getButtonClasses()}
      type={props.type}
    >
      {props.Text}
    </button>
  );
};

export default Button;
