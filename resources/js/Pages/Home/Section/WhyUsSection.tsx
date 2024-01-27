import GoDownButton from "@/Components/General/GoDownButton";
import SectionContainer from "@/Components/General/SectionContainer";

const tags = [
    "designinterior",
    "coffeetable",
    "pantry",
    "sofa",
    "kitchenset",
    "bedroom",
    "furniture",
    "wardrobe",
    "smallspace",
    "cabinet",
    "homeinterior",
];

function WhyUsSection() {
    return (
        <div className="w-full min-h-[35rem] mt-[2rem] h-fit bg-bg2">
            <SectionContainer>
                <div
                    className="flex flex-col items-center gap-8 md:gap-12
                    h-fit py-[4rem] px-8rem"
                >
                    <div
                        className="
                        bg-deco1 text-center text-bg1 text-4xl
                        font-normal font-playfair w-full py-[.8rem]"
                    >
                        Why Us
                    </div>
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-2">
                        <div className="flex flex-col gap-8 lg:gap-4">
                            <div className="text-center text-text1 text-lg md:text-xl">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed porta nunc lacus, quis
                                fermentum justo vestibulum eget. Ut faucibus a
                                ligula vitae condimentum.
                            </div>
                            <div className="flex justify-center lg:justify-between items-center gap-5">
                                <NumberCard number={190} label="Lorem Ipsum" />
                                <NumberCard number={190} label="Lorem Ipsum" />
                                <NumberCard number={190} label="Lorem Ipsum" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center items-start gap-3 lg:gap-5">
                            {tags.map((tag, key) => (
                                <CategoryTag title={tag} key={key} />
                            ))}
                        </div>
                    </div>
                </div>
            </SectionContainer>
            <div className="pb-[2rem]">
                <GoDownButton id="why-us-btn" />
            </div>
        </div>
    );
}

function CategoryTag({ title }: { title: string }) {
    return (
        <div className="px-[1.5rem] py-[.4rem] bg-bg1 rounded-lg border border-text3 justify-center items-center gap-5 inline-flex">
            <div className="text-text1 text-md md:text-lg font-light">#{title}</div>
        </div>
    );
}

type cardProps = {
    number: number
    label: string
};

function NumberCard({number, label} : cardProps) {
    return (
        <div className="lg:grow bg-deco2 hover:brightness-105 cursor-default rounded-xl p-[1rem]">
            <div className="flex grow items-top justify-center text-center text-3xl lg:text-4xl font-normal font-playfair lg:gap-1">
                <div className="text-text2 leading-[2rem]">{number}</div>
                <div className="text-text3">+</div>
            </div>
            <div className="text-text1 text-center text-sm lg:text-base font-light">{label}</div>
        </div>
    );
}

export default WhyUsSection;
