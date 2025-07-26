import type { InputHTMLAttributes } from "react";
import styles from "./InputText.module.css"

interface InputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className: string;      //父对象中的布局，大小等
}

export default function InputText({className, ...prop}: InputTextProps) {
    return (
        <input
            type="text"
            className={`${styles.inputText} ${className}`}
            placeholder="请输入文本"
            { ...prop }
        />
    )
}