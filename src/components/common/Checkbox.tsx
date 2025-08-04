import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface CheckboxPara {
    className?: string;
    props?: Omit<HtmlHTMLAttributes<HTMLInputElement>, "type">
}

export default function Checkbox({className, props}: CheckboxPara) {
    return (
        <input
            type="checkbox"
            className={cn("aspect-square", className)}
            {...props}
        >
        </input>
    )
}