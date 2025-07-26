import type { InputHTMLAttributes } from "react";
import styles from "./InputCheckbox.module.css"

interface InputCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className: string;      //父对象中的布局，大小等
    onChange: () => void;   //点击方法
}

export default function InputCheckbox({className, checked, onChange, ...prop}: InputCheckboxProps) {
    return (
        <label
            className={`${styles.checkboxFrame} ${className}`} 
        >
            <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={checked}
                onChange={onChange}
                { ...prop }
            />
            <span className={styles.customCheckbox}></span>
        </label>
    )
}