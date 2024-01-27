import GoDownButton from "@/Components/General/GoDownButton";
import SectionContainer from "@/Components/General/SectionContainer";

import placeholder from "../Asset/placeholderImage01.svg";

function OurProcessSection() {
    return (
        <div className="w-full min-h-[35rem] mb-[2rem] h-fit bg-bg2">
            <SectionContainer>
                <div className="w-full flex items-center gap-5 md:gap-10">
                    <div className="text-text1 text-4xl md:text-5xl font-medium font-playfair">
                        Our Process
                    </div>
                    <div className="grow mt-3 border border-text1" />
                </div>
                <p className="text-text2 text-md md:text-xl font-normal md:mt-2">
                    Here is our workflow
                </p>
                <div className="flex flex-col justify-center items-center mt-8 md:flex-row gap-8">
                    <WorkflowBubble
                        label="The First Step in short"
                        icon={placeholder}
                        withArrow
                    />
                    <WorkflowBubble
                        label="The Second Step in short"
                        icon={placeholder}
                        withArrow
                    />
                    <WorkflowBubble
                        label="The Third Step in short"
                        icon={placeholder}
                    />
                </div>
            </SectionContainer>
            <div className="pt-[4rem] pb-[2rem]">
                <GoDownButton id="our-process-btn" />
            </div>
        </div>
    );
}

type workflowProps = {
    label: string;
    icon: string;
    withArrow?: boolean;
};

function WorkflowBubble({ label, icon, withArrow }: workflowProps) {
    return (
        <div className="flex flex-col justify-center items-center md:flex-row md:gap-2 lg:gap-5">
            <div className="flex flex-col items-center gap-5">
                <div className="!w-[calc(40vw+2rem)] !h-[calc(40vw+2rem)] md:!w-[calc(18vw+1rem)] md:!h-[calc(18vw+1rem)] flex justify-center items-center bg-bg1 rounded-full border-2 border-deco1 hover:brightness-105">
                    <img
                        src={icon}
                        className="w-full !p-[calc(6vw+1.5rem)] md:!p-[calc(4vw+.5rem)]"
                    />
                </div>
                <div className="text-center text-text1 text-lg md:text-xl font-normal">
                    {label}
                </div>
            </div>
            {withArrow ? (
                <svg
                    className="w-[4rem] md:w-[5rem] rotate-90 md:rotate-0"
                    viewBox="0 0 87 87"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M52.8735 43.5L28.2493 68.1243L33.3758 73.2508L60.5633 46.0633C61.9789 44.6476 61.9789 42.3524 60.5633 40.9368L33.3758 13.7493L28.2493 18.8758L52.8735 43.5Z"
                        fill="#9D7C5D"
                    />
                </svg>
            ) : null}
        </div>
    );
}

export default OurProcessSection;
