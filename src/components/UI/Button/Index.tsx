import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: ReactNode;
}

export function Button({  children, ...rest }: ButtonProps) {
  return (
    <button className={styles.button}  {...rest}>
        {children}
    </button>
  );
}
