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
import { ModalOverlay } from "@/Components/Modal";
import { CloseIcon } from "@/Components/General/Icon";

type Props = {
    companyName: string;
    companyDescription: string;
};

export default function HeroSection() {
    const companyData: any = usePage().props.companyData; //get page info

    const bgStyle = {
        backgroundImage: `url(${
            companyData?.home_banner
                ? companyData?.home_banner
                : companyData?.placeholder_image
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    // modal state
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <>
            <div
                style={bgStyle}
                className="w-full h-[90vh] bg-cover bg-center flex justify-center items-center"
            >
                <div
                    className="bg-secondary
                bg-opacity-90 px-boxMd py-[1.5rem] rounded-xl w-[90%] md:w-[70%] lg:w-[50%] max-w-[90%]
                flex flex-col
                gap-4
                justify-center md:justify-start
                "
                >
                    <h2
                        className="font-merriweather
                     text-[1.2rem] tracking-[0.18rem]
                    text-center md:text-left
                     "
                    >
                        {companyData?.home_hero_subtitle}
                    </h2>
                    <h1
                        className="text-accent font-merriweather
                    font-[700] text-[2.2rem]
                    text-center md:text-left
                    "
                    >
                        {companyData?.home_hero_title}
                    </h1>
                    <p className="font-jost text-[1.125rem] text-center md:text-left">
                        {companyData?.home_hero_description}
                    </p>
                    <div
                        className="flex flex-col md:flex-row
                    gap-4
                    items-center justify-start"
                    >

                        <button
                            onClick={handleOpenModal}
                            title="Lihat ayat panti"
                            className="border-accent border-[2px] text-white bg-accent rounded-xl font-jost font-[700] text-[1.2rem] mr-2
                        hover:bg-transparent hover:text-accent transition-all duration-300 h-[3.5rem] w-[13rem] flex items-center justify-center
                        "
                        >
                            Ayat Panti
                        </button>
                    </div>
                </div>
            </div>

            {/* bottom */}
            <div className="w-full h-fit bg-primary flex justify-center items-center">
                <SectionContainer
                    className="bg-secondary w-[90%] h-full py-[1.5rem] px-[4rem] rounded-b-[3rem] 
                flex flex-col justify-between items-center
                md:flex-row md:justify-between md:items-start
                "
                >
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                        <img src="" alt="" />
                        <span>
                            Contant us: {companyData?.company_phone_number}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center gap-2">
                        <img src="" alt="" />
                        <span>
                            {companyData?.company_bank_account_name}{" "}
                            {companyData?.company_bank_account_number}
                        </span>
                    </div>
                </SectionContainer>
            </div>

            <ModalOverlay onClose={handleCloseModal} show={isModalOpen}>
                <div
                    className="
                bg-secondary rounded-xl
                "
                >
                    <header
                        className="flex flex-row justify-between items-center w-full relative
                    border-b-[2px] border-dark
                    border-opacity-25
                    p-[1rem] mb-[1rem]
                    "
                    >
                        <h1
                            className="text-dark
                            font-[700] font-jost
                            text-[1.5rem]
                        w-full text-center
                        "
                        >
                            {companyData?.home_hero_verse_title}
                        </h1>
                        <CloseIcon
                            className="absolute top-0 right-0 w-[3rem] h-[3rem] p-[0.5rem] hover:bg-opacity-70 pointer-events-auto cursor-pointer"
                            onClick={handleCloseModal}
                        />
                    </header>
                    <body className="p-[2rem] text-center">
                        {/* quote */}
                        <p className="text-dark font-jost font-bold">
                            &quot;
                            {companyData?.home_hero_verse}
                            &quot;
                        </p>
                    </body>
                </div>
            </ModalOverlay>
        </>
    );
}
