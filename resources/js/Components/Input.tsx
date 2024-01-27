import { PropsWithChildren } from "react";

type InputErrorProps = {
    message?: string,
    className?: string,
    [props: string]: any
};

export const InputError = ({ message, className, ...props }: InputErrorProps) => {
    return (
        <div className={`text-red-600 ${className}`} {...props}>
            {message}
        </div>
    );
}


type LabelProps = {
    className?: string,
    htmlFor?: string,
    required?: boolean,
    [props: string]: any
}
export const Label = ({ children, required, htmlFor, className, ...props }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`
            flex items-center justify-start gap-1.5 capitalize
            text-black font-niramit font-[500] text-[1rem] ${className}`} {...props}
            {...props}
        >
            {children}
            {required && <span className='text-red-600'>*</span>}
        </label>
    );
}