import type { InputHTMLAttributes } from "react";
import styles from "./TextArea.module.css"

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    className: string;      //父对象中的布局，大小等
}

export default function TextArea({className, value, onChange, ...prop}: TextAreaProps) {
    return (
        <textarea
            className={`${styles.textarea} ${className}`}
            placeholder="请输入文本"
            value={value}
            onChange={onChange}
            { ...prop }
        />
    )
}