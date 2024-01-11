import { ButtonHTMLAttributes } from "react";
import "./mainButton.css";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const MainButton = (props: IProps) => {
  const { text, ...rest } = props;
  return (
    <button className="main-button" {...rest}>
      {text}
    </button>
  );
};
