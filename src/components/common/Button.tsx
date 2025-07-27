import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css"

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    onClick: () => void;
    text: string
}

export default function Button({className, onClick, text,...prop}: ButtonProp) {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick} 
            {...prop}
        >
            {text}
        </button>
    )
}