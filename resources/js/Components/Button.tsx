import { Link, router } from "@inertiajs/react";
import { CheckIcon, PlusIcon, SaveIcon, TrashIcon } from "./Icon";
import { CloseIcon } from "./General/Icon";
import { Confirmation } from "./Confirmation";

type Props = {
    href: string;
    className?: string;
    onClick?: () => void;
    [props: string]: any;
};

export const BackButton = ({ className, ...props }: Props) => {
    const handleBack = () => {
        router.visit(props.href, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <button
            title="Back to Previous Page"
            className="
                flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
                bg-primaryAdmin text-white p-[0.75rem] rounded-xl
                            hover:bg-opacity-70"
            onClick={handleBack}
        >
            <img
                className="w-[1.5rem] h-[1.5rem] invert-[1] gap-[1rem] inline-flex justify-center items-center hover:bg-opacity-70"
                src="https://www.svgrepo.com/show/500472/back.svg"
                alt=""
            />
            Back
        </button>
    );
};

type DeleteButtonProps = {
    className?: string;
    withIcon?: boolean;
    onClick?: () => void;
    [props: string]: any;
};

export const DeleteButton = ({
    className,
    onClick,
    withIcon = true,
    ...props
}: DeleteButtonProps) => {
    return (
        <Confirmation
            onConfirm={onClick}
            title="Are you sure?"
            description="This action will delete this data"
        >
            <button
                title="Delete"
                className="
                flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
                bg-primaryRed text-white p-[0.75rem] rounded-xl
                hover:bg-opacity-70"
            >
                {withIcon ? <TrashIcon /> : null}
                Delete
            </button>
        </Confirmation>
    );
};

type SaveButtonProps = {
    className?: string;
    onClick?: () => void;
    [props: string]: any;
};

export const SaveButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Save"
            className={`
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primaryAdmin text-white p-[0.75rem] rounded-xl hover:bg-opacity-70 ${className}`}
            {...props}
        >
            <SaveIcon />
            Save
        </button>
    );
};

export const PublishButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Publish"
            className="
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-green text-white p-[0.75rem] rounded-xl
                        hover:bg-opacity-70"
            {...props}
        >
            <CheckIcon />
            Publish
        </button>
    );
};

export const CloseButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Close"
            className={className}
            {...props}
        >
            <CloseIcon />
        </button>
    );
};



// create button
export const CreateButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Create"
            className={`
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primaryAdmin text-white p-[0.75rem] rounded-xl hover:bg-opacity-70 ${className}`}
            {...props}
        >
            <SaveIcon />
            Create
        </button>
    );
}

// add button
export const AddButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Add"
            className={`
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500] whitespace-nowrap
            bg-primaryAdmin text-white p-[0.75rem] rounded-xl hover:bg-opacity-70 ${className}`}
            {...props}
        >
            <PlusIcon className=' w-[1.5rem] h-[1.5rem] invert-[1] gap-[1rem] inline-flex justify-center items-center hover:bg-opacity-70' />
            Add New
        </button>
    );
}



// trash button
export const TrashButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            onClick={onClick}
            title="Delete"
            className={`
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500] whitespace-nowrap
            bg-primary text-white p-[0.75rem] rounded-xl hover:bg-opacity-70 ${className}`}
            {...props}
        >
            <TrashIcon className=' w-[1.5rem] h-[1.5rem] invert-[1] gap-[1rem] inline-flex justify-center items-center hover:bg-opacity-70' />
            Trash Bin
        </button>
    );
}

// button view on website
export const ViewButton = ({
    className,
    onClick,
    ...props
}: SaveButtonProps) => {
    return (
        <button
            type='button'
            onClick={onClick}
            title="View"
            className={`
            flex flex-row justify-center items-center gap-2.5 font-niramit font-[500]
            bg-primary text-white p-[0.75rem] rounded-xl hover:bg-opacity-70 ${className}`}
            {...props}
        >
            <svg
                className='w-[1.5rem] h-[1.5rem] gap-[1rem] inline-flex justify-center items-center hover:bg-opacity-70'
                viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>web_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Development" transform="translate(-96.000000, -48.000000)" fill-rule="nonzero"> <g id="web_fill" transform="translate(96.000000, 48.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M19,4 C20.1046,4 21,4.89543 21,6 L21,18 C21,19.1046 20.1046,20 19,20 L5,20 C3.89543,20 3,19.1046 3,18 L3,6 C3,4.89543 3.89543,4 5,4 L19,4 Z M19,10 L5,10 L5,17 C5,17.51285 5.38604429,17.9355092 5.88337975,17.9932725 L6,18 L18,18 C18.51285,18 18.9355092,17.613973 18.9932725,17.1166239 L19,17 L19,10 Z M6,6 C5.44772,6 5,6.44772 5,7 C5,7.55228 5.44772,8 6,8 C6.55228,8 7,7.55228 7,7 C7,6.44772 6.55228,6 6,6 Z M9,6 C8.44772,6 8,6.44772 8,7 C8,7.55228 8.44772,8 9,8 C9.55228,8 10,7.55228 10,7 C10,6.44772 9.55228,6 9,6 Z M12,6 C11.4477,6 11,6.44772 11,7 C11,7.55228 11.4477,8 12,8 C12.5523,8 13,7.55228 13,7 C13,6.44772 12.5523,6 12,6 Z" id="形状" fill="#ffffff"> </path> </g> </g> </g> </g></svg>
            View
        </button >
    );
}
