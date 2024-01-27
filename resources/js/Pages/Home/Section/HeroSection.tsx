import SectionContainer from "@/Components/General/SectionContainer";
import { InertiaLinkProps, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

// Icon
import {
    BsFillFileImageFill as Porto,
    BsFillEnvelopeHeartFill as Mail,
    BsDownload as Download,
} from "react-icons/bs";

import "../HomePage.scss";
import GoDownButton from "@/Components/General/GoDownButton";

// import heroImage from "../Asset/heroImage01.jpg";
import { PrimaryButton, SecondaryButton } from "@/Components/General/Button";

type Props = {
    companyName: string;
    companyDescription: string;
};

export default function HeroSection() {
    const companyData: any = usePage().props.companyData; //get page info

    useEffect(() => {
        console.log(companyData);
    }, []);

    const bgStyle = {
        backgroundImage: `url(${
            companyData?.home_banner
                ? companyData?.home_banner
                : companyData?.placeholder_image
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <>
            <div
                style={bgStyle}
                className="w-full h-screen bg-cover bg-center flex justify-center items-center"
            >
                <div
                    className="bg-secondary
                bg-opacity-90 px-boxMd py-[1.5rem] rounded-xl w-[90%] md:w-[70%] lg:w-[50%] max-w-[90%]
                flex flex-col
                gap-4
                "
                >
                    <h2 className="font-merriweather">
                        {companyData?.home_hero_subtitle}
                    </h2>
                    <h1
                        className="text-accent font-merriweather
                    font-[700] text-[2.2rem]
                    "
                    >
                        {companyData?.home_hero_title}
                    </h1>
                    <p className="font-jost text-[1.125rem]">
                        {companyData?.home_hero_description}
                    </p>
                    <div
                        className="flex flex-col md:flex-row
                    gap-4
                    items-center justify-start"
                    >
                        <button
                            className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3.5rem] w-[13rem]
                        flex items-center justify-center
                        "
                        >
                            Donasi Sekarang
                        </button>
                        <button
                            className="bg-transparent border-accent border-[2px] text-accent rounded-xl font-jost font-[700] text-[1.2rem] mr-2
                        hover:bg-accent hover:text-white transition-all duration-300 h-[3.5rem] w-[13rem] flex items-center justify-center
                        "
                        >
                            Ayat Panti
                        </button>
                    </div>
                </div>
            </div>
            {/* <SectionContainer></SectionContainer> */}
        </>
    );
}
