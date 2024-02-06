import { useEffect } from "react";

type ModalProps = {
    show: boolean;
    onClose: () => void;
    className?: string;
    [props: string]: any;
};
export const ModalOverlay = ({
    children,
    onClose,
    className,
    show,
    ...props
}: ModalProps) => {
    // prevent scrolling when modal is open
    // useEffect(() => {
    //     if (show) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // }, [show]);
    return (
        <div
            onClick={onClose}
            className={`isolate fixed inset-0 z-[200] flex items-center justify-center w-full h-screen bg-black bg-opacity-70 ${className}
            ${show ? "flex" : "hidden"}`}
            {...props}
        >
            <section
                className="isolate z-[1000] max-w-[90%] max-h-[90%] rounded-xl p-[1rem] overflow-y-auto
                "
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </section>
        </div>
    );
};
