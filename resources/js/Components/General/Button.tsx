type buttonProps = {
    title: string;
    onClick: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
} & Record<string, any>;

export const PrimaryButton = ({
    id = null,
    title,
    onClick,
    disabled,
    type = "button",
    className,
    ...props
}: buttonProps) => {
    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            className={`
            text-text1 text-lg
            bg-deco2 border-2 border-deco2
            hover:bg-deco2 hover:bg-opacity-80 hover:opacity-100
            rounded-md py-[.8rem] w-[17.5rem]
            transition duration-200 ease-in-out
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-50"}
            ${className}`}
            {...props}
        >
            {title}
        </button>
    );
};

export const SecondaryButton = ({
    title,
    onClick,
    disabled,
    type = "button",
    className,
    id = null,
    ...props
}: buttonProps) => {
    return (
        <button
            id={id}
            type="button"
            onClick={onClick}
            className={`
            text-text1 text-lg
            bg-bg2 bg-opacity-80
            border-2 border-deco2
            hover:bg-deco2 hover:bg-opacity-20 hover:opacity-100
            rounded-md py-[.8rem] w-[17.5rem]
            transition duration-200 ease-in-out
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-50"}
            ${className}`}
            {...props}
        >
            {title}
        </button>
    );
};