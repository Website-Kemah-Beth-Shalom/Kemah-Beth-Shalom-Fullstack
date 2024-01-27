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
        // <SectionContainer id="about-us">
        <div className="flex flex-col items-center justify-center text-center gap-2">
            {/* Siapa Kami */}
            <div
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
            </div>

            {/* Visi Kami */}
            <div
                className="flex flex-row items-center justify-center gap-2 bg-primary w-full
            px-boxMd py-[1.5rem] my-[2.5rem]"
            >
                <div className="flex flex-col items-center justify-center text-center gap-2 w-full">
                    <h1 className="text-accent font-jost font-[900] text-[2.2rem] w-full text-left">
                        {companyData?.about_vision_title}
                    </h1>
                    <p className="font-jost text-[1.125rem] text-left">
                        {companyData?.about_vision_description}
                    </p>
                </div>
                <div className="relative isolate">
                    <Image
                        className="rounded-full
                        object-cover aspect-square"
                        alt=""
                    />
                    <Image
                        className="rounded-full object-cover aspect-square w-[10rem]
                    absolute top-[-10%] left-[-10%]  
                    z-10"
                    />
                    <Image
                        className="rounded-full object-cover aspect-square w-[10rem]
                    absolute bottom-[-10%] right-[-10%]  
                    z-10"
                    />
                </div>
            </div>

            {/* Misi Kami */}
            <div
                className="flex flex-row items-center justify-center gap-2 bg-primary w-full
                px-boxMd py-[1.5rem] my-[2.5rem]"
            >
                <div
                    className="relative isolate
                w-full
                "
                >
                    <Image
                        className="rounded-3xl object-cover aspect-square"
                        alt=""
                    />
                </div>

                {/* right side of "Misi Kami section" */}
                <div className="flex flex-col items-center justify-center text-center gap-2 w-full">
                    <h1 className="text-accent font-jost font-[900] text-[2.2rem] w-full text-left">
                        {companyData?.about_mission_title}
                    </h1>
                    <p className="font-jost text-[1.125rem] text-left">
                        {companyData?.about_mission_description}
                    </p>
                </div>
            </div>

            {/* How we serve */}
            <div className="flex flex-col items-center justify-center text-center gap-2 bg-secondary w-full">
                <div className="flex flex-col items-center justify-center text-center gap-2">
                    <h1 className="text-accent font-jost font-[700] text-[2.2rem]">
                        {companyData?.about_how_we_serve_title}
                    </h1>
                    <p>{companyData?.about_how_we_serve_description}</p>
                    <Link
                        href="/gallery"
                        className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] w-[13rem] flex
                    items-center justify-center hover:bg-white hover:text-accent transition-all duration-300
                    "
                    >
                        Lihat Dokumentasi
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center text-center gap-2">
                    <img src={companyData?.about_how_we_serve_image} alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>

            {/* Donation */}
            <div className="flex flex-col items-center justify-center gap-[1rem] text-center p-boxMd bg-dark">
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

                <button
                    className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] w-[13rem] flex
                    items-center justify-center
                    "
                >
                    Donasi Sekarang
                </button>
                <p className="text-white font-jost text-[1.125rem] font-[400] tracking-[150%] leading-[1.5rem]">
                    {companyData?.about_donation_thankyou_description}
                </p>
            </div>

            {/* Last Donation */}
            <div className="flex flex-col items-center justify-center gap-[1rem] text-center p-boxMd">
                <h1 className="text-accent font-jost font-[700] text-[2.2rem]">
                    {companyData?.about_last_donation_title}
                </h1>
                <Image
                    src={companyData?.about_last_donation_image}
                    className="aspect-square object-cover"
                />
                <p className="font-jost text-[1.125rem]">
                    {companyData?.about_last_donation_description}
                </p>
                <button>Lihat Dokumentasi</button>
            </div>

            {/* Testimony */}
            <div>
                <h1>{companyData?.about_testimony_title}</h1>
                <p>{companyData?.about_testimony_description}</p>
                <button className="bg-accent text-white rounded-xl p-boxS font-jost font-[700] text-[1.2rem] mr-2 h-[3rem] w-[13rem] flex">
                    Lihat Dokumentasi
                </button>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center justify-center gap-[1rem] text-center p-boxMd">
                <h1 className="text-accent font-jost font-[700] text-[2.2rem]">
                    {companyData?.about_location_title}
                </h1>
                <p className="font-jost text-[1.125rem]">
                    {companyData?.about_location_description}
                </p>
                <button>Lihat Dokumentasi</button>
            </div>
        </div>
        // </SectionContainer>
    );
}

export default AboutSection;