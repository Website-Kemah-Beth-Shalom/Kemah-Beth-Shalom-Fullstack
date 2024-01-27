import GoDownButton from "@/Components/General/GoDownButton";
import SectionContainer from "@/Components/General/SectionContainer";

import aboutImage from "../Asset/aboutImage01.png";
import { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Image from "@/Components/Image";

function AboutSection() {
    const companyData: any = usePage().props.companyData; //get page info

    useEffect(() => {
        console.log(companyData);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center gap-2 bg-primary">
            {/* Siapa Kami */}
            <SectionContainer
                className="flex flex-col items-center justify-center text-center gap-2 bg-primary w-full
            px-boxMd py-[1.5rem]"
            >
                <h1 className="text-accent font-jost font-[900] text-[2.2rem]">
                    {companyData?.about_who_us_title}
                </h1>
                <p className="font-jost text-[1.125rem]">
                    {companyData?.about_who_us_description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[1rem]">
                    <Image
                        className="aspect-square object-cover rounded-xl"
                        src={aboutImage}
                        alt=""
                    />
                    <Image
                        className="aspect-square object-cover rounded-xl"
                        src={companyData?.about_who_us_image}
                        alt=""
                    />
                </div>
            </SectionContainer>

            {/* Visi Kami */}
            <SectionContainer
                className="
                flex flex-col xl:flex-row items-center justify-center gap-[3rem] xl:gap-2 bg-primary w-full
            px-boxMd py-[1.5rem] my-[2.5rem]"
            >
                <div className="flex flex-col items-center justify-center text-center gap-2 w-full">
                    <h1 className="text-accent font-jost font-[900] text-[2.2rem] w-full text-left">
                        {companyData?.about_vision_title}
                    </h1>
                    <p
                        className="font-jost text-[1.125rem] text-left
                    pr-boxMd
                    "
                    >
                        {companyData?.about_vision_description}
                    </p>
                </div>
                <div className="relative isolate">
                    <Image
                        className="rounded-full w-[20rem] xl:w-[30rem]
                        object-cover aspect-square"
                        alt=""
                    />
                    <Image
                        className="rounded-full object-cover aspect-square w-[5rem] xl:w-[10rem]
                    absolute top-[0%] left-[-15%]  
                    z-10"
                    />
                    <Image
                        className="rounded-full object-cover aspect-square w-[10rem]
                    absolute bottom-[-20%] right-[-20%]  
                    z-10"
                    />
                </div>
            </SectionContainer>

            {/* Misi Kami */}
            <SectionContainer
                className="flex flex-col-reverse 
                md:flex-row
                items-center justify-center gap-2 bg-primary w-full
                px-boxMd py-[1.5rem] my-[2.5rem]"
            >
                <div className="relative isolate w-full">
                    <Image
                        className="rounded-3xl object-cover aspect-square"
                        alt=""
                    />
                </div>

                {/* right side of "Misi Kami section" */}
                <div
                    className="flex flex-col items-center justify-center text-center gap-2 w-full
                px-boxMd py-[1.5rem] my-[2.5rem]
                "
                >
                    <h1 className="text-accent font-jost font-[900] text-[2.2rem] w-full text-left">
                        {companyData?.about_mission_title}
                    </h1>
                    <p className="font-jost text-[1.125rem] text-left line-clamp-6">
                        {companyData?.about_mission_description}
                    </p>
                </div>
            </SectionContainer>

            {/* How we serve */}
            <div className="bg-secondary w-full flex items-center justify-center">
                <SectionContainer
                    className="flex flex-col md:flex-row items-center justify-between text-center gap-[2rem] bg-secondary
                py-[1.5rem] my-[2.5rem]"
                >
                    <div className="flex flex-col items-start justify-start text-center gap-2">
                        <h1 className="text-accent font-jost font-[800] text-[3rem] w-full text-center md:text-left">
                            {companyData?.about_how_we_serve_title}
                        </h1>
                        <p className="font-jost text-[1.125rem] text-center md:text-left line-clamp-6">
                            {companyData?.about_how_we_serve_description}
                        </p>
                        <Link
                            title="Pergi ke halaman  dokumentasi"
                            href="/gallery"
                            className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] w-full md:w-fit flex
                            items-center justify-center
                            pointer-events-auto
                            cursor-pointer
                            hover:bg-transparent hover:text-accent hover:border-accent border-[2px]
                            border-accent
                            transition-all duration-300
                            "
                        >
                            Lihat Dokumentasi
                        </Link>
                    </div>
                    <Image
                        className="aspect-square object-cover rounded-[4rem]
                        w-[20rem] 
                        "
                        src={companyData?.about_how_we_serve_image}
                        alt=""
                    />
                </SectionContainer>
            </div>

            {/* Donation */}
            <div className="flex flex-col items-center justify-center gap-[1rem] text-center p-boxMd bg-dark">
                <SectionContainer className="flex flex-col items-center justify-center gap-[1rem] text-center bg-dark">
                    <h1 className="text-white text-[2.5rem] font-merriweather ">
                        {companyData?.about_donation_title}
                    </h1>
                    <p className="text-white font-jost text-[1.125rem]">
                        {companyData?.about_donation_description}
                    </p>
                    <p className="text-white font-jost text-[1.125rem]">
                        <span className="text-blue-500 font-jost font-bold">
                            {companyData?.company_bank_name}
                        </span>{" "}
                        <span className="text-white font-jost font-bold">
                            a/n {companyData?.company_bank_account_name}
                        </span>
                        <br />
                        <span className="text-white font-jost font-bold">
                            {companyData?.company_bank_account_number}
                        </span>
                    </p>

                    <a
                        target="_blank"
                        title="Pergi ke halaman donasi"
                        href={companyData?.company_donation_link}
                        className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] flex
                    items-center justify-center
                    pointer-events-auto
                    cursor-pointer
                    hover:bg-transparent hover:text-accent hover:border-accent border-[2px]
                    border-accent
                    transition-all duration-300
                    w-full md:w-[13rem] 
                    "
                    >
                        Donasi Sekarang
                    </a>
                    <p className="text-white font-jost text-[1.125rem] font-[400] tracking-[150%] leading-[1.5rem]">
                        {companyData?.about_donation_thankyou_description}
                    </p>
                </SectionContainer>
            </div>

            {/* Last Donation */}
            <SectionContainer
                className="
            grid grid-cols-1 md:grid-cols-2
            items-center justify-center gap-[1rem] text-center py-boxMd"
            >
                <div>
                    <h1
                        className="text-dark font-jost font-[900] text-[2rem]
                    text-center md:text-left
                    "
                    >
                        {companyData?.about_last_donation_title}
                    </h1>
                    <Image
                        src={companyData?.about_last_donation_screen_shot}
                        className="aspect-square object-cover
                        h-[15rem] w-full
                        "
                    />
                </div>
                <Image
                    src={companyData?.about_last_donation_image}
                    className="aspect-square object-cover
                    w-full h-full rounded-[4rem]"
                />
            </SectionContainer>

            {/* Testimony */}
            {/* <div className="flex flex-col items-center justify-center gap-[1rem] text-center p-boxMd bg-primary w-full">
                <h1>{companyData?.about_testimony_title}</h1>
                <p>{companyData?.about_testimony_description}</p>
                <button className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] w-[13rem] flex">
                    Lihat Dokumentasi
                </button>
            </div> */}

            {/* Aniversary */}

            <div className="flex items-center justify-center w-full bg-secondary">
                <SectionContainer className="flex flex-col md:flex-row items-center justify-center gap-[0.5rem] text-center py-boxMd">
                    <div
                    className="h-full w-full"
                    >
                        <Image
                            src={companyData?.about_aniversary_image}
                            className="aspect-square object-cover
                            max-h-[10rem] md:max-h-[30rem]
                            w-full 
                            "
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[1rem] text-center md:pl-boxMd bg-secondary w-full">
                        <h1 className="text-dark font-jost font-[900] text-[2.2rem] w-full text-center md:text-left">
                            {companyData?.about_aniversary_title}
                        </h1>
                        <p className="whitespace-pre-wrap text-center md:text-left w-full">
                            {companyData?.about_aniversary_description}
                        </p>
                    </div>
                </SectionContainer>
            </div>

            {/* Location */}
            <SectionContainer className="flex flex-col items-center justify-center gap-[1rem] text-center py-boxMd bg-primary w-full">
                <h1 className="text-dark font-jost font-[800] text-[2.2rem] w-full text-left">
                    {companyData?.about_location_title}
                </h1>
                <iframe
                    className="aspect-square object-cover w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6368649503534!2d106.68580619999999!3d-6.311344400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e52fad172ae1%3A0x2763c403f06effbe!2sPanti%20Jompo%20%26%20Panti%20Asuhan%20Kemah%20Beth%20Shalom!5e0!3m2!1sid!2sid!4v1706370122135!5m2!1sid!2sid"
                    width="600"
                    height="450"
                    loading="lazy"
                ></iframe>
            </SectionContainer>
        </div>
    );
}

export default AboutSection;
