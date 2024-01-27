import { Link, router } from "@inertiajs/react";
import { CheckIcon, SaveIcon, TrashIcon } from "./Icon";
import { CloseIcon } from "./General/Icon";
import { Confirmation } from "./Confirmation";

type Props = {
    href: string,
    className?: string,
    onClick?: () => void,
    [props: string]: any
}

export const BackButton = ({ className, ...props }: Props) => {

    const handleBack = () => {
        router.visit(props.href, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <Confirmation
            title="Are you sure?"
            onConfirm={handleBack}
            description="You will be redirected to previous page"

        >
            <button
                title='Back to Previous Page'
                className='
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primaryAdmin text-white p-boxS rounded-xl
                        hover:bg-opacity-70'
            // onClick={handleBack}
            >
                <img
                    className='w-[1.5rem] h-[1.5rem] invert-[1] gap-[1rem] inline-flex justify-center items-center hover:bg-opacity-70'
                    src="https://www.svgrepo.com/show/500472/back.svg"
                    alt="" />
                Back
            </button>
        </Confirmation>
    );
}



type DeleteButtonProps = {
    className?: string,
    onClick?: () => void,
    [props: string]: any
}

export const DeleteButton = ({ className, onClick, ...props }: DeleteButtonProps) => {
    return (
        <Confirmation
            onConfirm={onClick}
            title="Are you sure?"
            description="This action will delete this data"
        >   
            <button
                onClick={onClick}
                title='Delete'
                className='
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primaryRed text-white p-boxS rounded-xl
                        hover:bg-opacity-70'

            >
                <TrashIcon />
                Delete
            </button>
        </Confirmation>
    );
}

type SaveButtonProps = {
    className?: string,
    onClick?: () => void,
    [props: string]: any
}

export const SaveButton = ({ className, onClick, ...props }: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title='Save'
            className='
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primaryAdmin text-white p-boxS rounded-xl
                        hover:bg-opacity-70'
            {...props}
        >
            <SaveIcon />
            Save
        </button>
    );
}

export const PublishButton = ({ className, onClick, ...props }: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title='Publish'
            className='
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-green text-white p-boxS rounded-xl
                        hover:bg-opacity-70'
            {...props}
        >
            <CheckIcon />
            Publish
        </button>
    );
}


export const CloseButton = ({ className, onClick, ...props }: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title='Close'
            className={className}
            {...props}
        >
            <CloseIcon />
        </button>
    );
}