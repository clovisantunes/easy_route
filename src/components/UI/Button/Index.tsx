import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: ReactNode;
  loading?:boolean;
}

export function Button({  children, loading, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ?(
        <FaSpinner color="#fff" size={16} className={styles.spinner} />
      ) :(
        <h3>
        {children}
        </h3>
      )}
    </button>
  );
}
