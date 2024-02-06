import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
} & Record<string, any>;

export default function SectionContainer({
    children,
    id = null,
    className,
}: Props) {
    return (
        <section
            id={id}
            className={`
            w-[90%] md:w-[80%] lg:w-[60%] max-w-[90%]
            ${className}
            `}
        >
            {children}
        </section>
    );
}
