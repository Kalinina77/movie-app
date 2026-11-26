import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className, type = "button", ...rest }: ButtonProps) => {
  return (
    <button type={type} className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
