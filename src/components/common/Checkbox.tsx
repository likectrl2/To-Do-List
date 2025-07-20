import { type FC, type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    
    return (
            <input
                type="checkbox"
                className={`${styles.checkboxInput} ${className || ''}`}
                {...props}
            />
    );
};

export default Checkbox;