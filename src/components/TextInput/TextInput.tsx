import { HTMLAttributes } from "react";
import "./textInput.css";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  labelText: string | JSX.Element;
  value: string;
  error?: string | null;
  handleInput: (value: string) => void;
}

export const TextInput = (props: IProps) => {
  const { labelText, value, error, handleInput, ...rest } = props;

  return (
    <div>
      <label>
        {labelText}
        <input
          className="text-input"
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          {...rest}
        />
      </label>

      <p className="error">{error}</p>
    </div>
  );
};
