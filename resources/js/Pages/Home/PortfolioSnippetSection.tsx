import GoDownButton from "@/Components/General/GoDownButton";
import SectionContainer from "@/Components/General/SectionContainer";
import { PrimaryButton } from "@/Components/General/Button";

import image1 from "./Asset/galleryImage01.png";
import image2 from "./Asset/galleryImage02.png";
import image3 from "./Asset/galleryImage03.png";
import image4 from "./Asset/galleryImage04.png";
import image5 from "./Asset/galleryImage05.png";
import image6 from "./Asset/galleryImage06.png";
import { usePage } from "@inertiajs/react";

function PortfolioSnippetSection() {
    const images = [image1, image2, image3, image4, image5, image6];

    const companyData: any = usePage().props.companyData; //get page info
    return (
        <SectionContainer>
            <div
                className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8
                    w-full min-h-[35rem]
                    h-fit py-[3.5rem] px-8rem"
            >
                <ButtonAndText className="md:hidden" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, key) => (
                        <ImageHolder key={key} image={image} />
                    ))}
                </div>
                <div className="flex flex-col grow justify-center items-center md:items-start text-center gap-6">
                    <div className="text-center text-text1 text-4xl font-medium font-playfair">
                        {companyData?.home_works_title}
                    </div>
                    <div className="text-center md:text-left text-text1 text-lg md:text-xl font-normal">
                        {companyData?.home_works_description}
                    </div>
                    {/* nanti ini tambahin lagi di bawah gambar */}
                    <ButtonAndText className="hidden md:flex" />
                </div>
            </div>
            <GoDownButton id="portfolio-snippet-btn" />
        </SectionContainer>
    );
}

function ButtonAndText({ className }: { className?: string }) {
    return (
        <div
            className={`w-full flex grow flex-col gap-6 justify-center items-center md:items-start text-center md:text-left ${className}`}
        >
            <PrimaryButton
                title="View More"
                onClick={() => {
                    window.location.href = "/gallery";
                }}
            />
            <div className="w-full h-full text-center p-[1rem] md:pt-20 md:text-left opacity-80 bg-bg2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
        </div>
    );
}

function ImageHolder({ image }: { image: string }) {
    return (
        <img
            className="
                w-[40vw] md:!w-[calc(28vw+6rem)]
                rounded object-cover hover:scale-90
                transition duration-300 ease-in-out"
            src={image}
        />
    );
}

export default PortfolioSnippetSection;
