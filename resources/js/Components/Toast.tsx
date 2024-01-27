import { CheckIcon } from "./Icon"

type ToastProps = {
    message: string,
    type?: 'success' | 'error',
    show?: boolean
}

export const Toast = ({
    message,
    type = 'success',
    show = false
}: ToastProps) => {
    return (
        type === 'success' ? (
            <div
                className={`
                flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
                bg-green text-white
                p-boxS rounded-xl
                fixed m-auto z-50 w-fit h-fit top-0 bottom-0 left-0 right-0 transition-all
                origin-center transform
                duration-100 ${show ? 'opacity-100' : 'opacity-0'}`}
            >
                <CheckIcon />
                <h1>
                    {message}
                </h1>
            </div>
        ) : (
            <div
                className={`bg-primaryRed text-white p-boxS rounded-xl fixed m-auto z-50 w-fit h-fit top-0 bottom-0 left-0 right-0 transition-all duration-500 justify-center items-center ${show ? 'opacity-100' : 'opacity-0'}`}
            >
                <h1>
                    {message}
                </h1>
            </div>
        )

    )
}
