import GoDownButton from "@/Components/General/GoDownButton";
import SectionContainer from "@/Components/General/SectionContainer";

import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

import image1 from "../Asset/articleImage01.png";
import image0 from "../Asset/articleImage00.jpg";
import { PrimaryButton } from "@/Components/General/Button";

function BlogSection() {
    const companyData: any = usePage().props.companyData; //get page info

    useEffect(() => {
        console.log(companyData);
    }, []);

    const backgroundImage = {
        backgroundImage: `url(${image0})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    };

    return (
        <SectionContainer>
            <div
                className="flex flex-col items-center justify-start gap-12
                    w-full min-h-[35rem]
                    h-fit py-[3.5rem] px-8rem"
            >
                <div className="w-full flex justify-between items-center gap-8 md:gap-16">
                    <div className="flex-1 border border-text1 opacity-50"></div>
                    <div className="text-center text-text1 text-4xl font-medium font-playfair">
                        Our blog
                    </div>
                    <div className="flex-1 border border-text1 opacity-50"></div>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-8 flex-grow">
                        <ArticleCard
                            title="Title Of The Blog"
                            snippet="Lorem ipsum dolor sit amet , consectetur adipiscing elit.
                                Sed porta nunc lacus, quis fermentum justo vestibulum eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            image={image1}
                            onClick={() => console.log("hai")}
                        />
                        <ArticleCard
                            title="Title Of The Blog"
                            snippet="Lorem ipsum dolor sit amet , consectetur adipiscing elit.
                                Sed porta nunc lacus, quis fermentum justo vestibulum eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            image={image1}
                            onClick={() => console.log("hai")}
                        />
                        <ArticleCard
                            title="Title Of The Blog"
                            snippet="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed porta nunc lacus, quis fermentum justo vestibulum eget.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            image={image1}
                            onClick={() => console.log("hai")}
                        />
                    </div>
                    <div 
                        className="flex justify-center items-end lg:flex p-5 !min-w-[calc(25vw+3rem)] lg:min-h-[100vh] flex-1 rounded-md" 
                        style={backgroundImage}
                    >
                        <div className="flex flex-col justify-center items-center px-5 py-10 bg-bg1 bg-opacity-60 rounded backdrop-blur-sm gap-6">
                            <div className="text-text1 text-center font-medium text-sm md:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta nunc lacus, quis fermentum justo vestibulum eget.</div>
                            <PrimaryButton title="View more" onClick={() => window.location.href = "/blog"} />
                        </div>
                    </div>
                </div>
            </div>
            <GoDownButton id="blog-btn" />
        </SectionContainer>
    );
}

type ArticleProps = {
    title: string;
    snippet: string;
    image: string;
    onClick: () => void;
};

function ArticleCard({ title, snippet, image, onClick }: ArticleProps) {
    return (
        <div
            className="
                flex flex-col sm:flex-row p-6 bg-bg2 
                hover:bg-bg1 hover:cursor-pointer
                rounded-md border-2 border-deco1 
                justify-center items-center gap-8
                transition ease-in-out duration-200"
            onClick={onClick}
        >
            <img
                className="
                    w-full sm:!min-w-[calc(5rem+15vw)] 
                    !h-[calc(3rem+30vw)] sm:!h-[calc(4rem+10vw)] 
                    rounded object-cover"
                src={image}
            />
            <div className="text-text1  flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="text-2xl md:text-3xl font-medium font-playfair">
                    {title}
                </div>
                <div className="text-sm md:text-md font-light">{snippet}</div>
            </div>
        </div>
    );
}

export default BlogSection;
