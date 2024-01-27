import { usePage } from "@inertiajs/react";
import React from "react";
import instagram from "./Assets/Instagram.svg";
import whatsapp from "./Assets/Whatsapp.svg";
import mail from "./Assets/Mail.svg";
import ApplicationLogo from "../ApplicationLogo";
import SectionContainer from "./SectionContainer";

export default function Footer() {
    const pageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(
        pageInfo?.props?.companyData
    );
    return (
        <footer className="w-full h-fit bg-secondary flex flex-col justify-center items-center gap-[2rem] md:gap-[1rem] pt-boxMd">
            {/* Top Content   */}
            <SectionContainer className="flex flex-col md:flex-row items-center justify-between w-full bg-primary rounded-[3rem] p-[1rem] px-[3rem]">
                <div className="flex flex-col md:flex-row items-center justify-center gap-[1rem] md:gap-[2.5rem] ">
                    <div className="text-dark font-[600] font-jost">Home</div>
                    <div className="text-dark font-[600] font-jost">
                        Dokumentasi
                    </div>
                    <div className="text-dark font-[600] font-jost">
                        Kontak Kami
                    </div>
                </div>
                <a
                    target="_blank"
                    href={companyData?.company_donation_link}
                    className="font-jost font-bold bg-brown text-white rounded-md w-fit h-[2.5rem] p-boxS 
                    my-[1rem] md:mb-0
                flex items-center justify-center
                "
                >
                    Donasi
                </a>
            </SectionContainer>

            {/* Social Media */}
            <SectionContainer className="flex flex-row items-center justify-center gap-2 w-full">
                <div className="flex flex-row items-center justify-center gap-2">
                    <SocialBubble
                        icon={instagram}
                        link={`https://instagram.com/${companyData?.company_instagram}`}
                    />
                    <SocialBubble
                        icon={whatsapp}
                        link={"https://wa.me/" + companyData?.company_whatsapp}
                    />
                    <SocialBubble
                        icon={mail}
                        link={
                            "https://www.youtube.com/" +
                            companyData?.company_youtube
                        }
                    />
                </div>
            </SectionContainer>

            {/* Bottom Content */}
            <div className="w-full  flex justify-center items-center">
                <SectionContainer
                    className="flex flex-col
                md:flex-row
                items-center justify-center gap-[1rem] w-full
                "
                >
                    <div
                        className="text-dark font-jost font-[400] text-[1.2rem] w-full text-center
                    order-1 md:order-1
                    "
                    >
                        Copyright &copy; {companyData?.company_name}
                    </div>
                    <div
                        className="bg-primary flex flex-row items-center justify-center gap-2 rounded-t-[2rem] w-full
                    order-3 md:order-2"
                    >
                        <ApplicationLogo />
                    </div>
                    <div
                        className="text-dark font-jost font-[400] text-[1.2rem] w-full text-center
                    order-2 md:order-3
                    "
                    >
                        "
                        {companyData?.company_quote ??
                            "Growing In Love Impacting Life"}
                        "
                    </div>
                </SectionContainer>
            </div>
        </footer>
    );
}

const SocialBubble = ({ icon, link }: { icon: string; link: string }) => {
    return (
        <a
            className="pointer-events-auto cursor-pointer
            flex justify-center items-center
            w-[3.5rem] h-[3.5rem]
            bg-bg1 hover:bg-bg2 rounded-full
            border-2 border-deco1"
            href={link}
            target="_blank"
        >
            <img src={icon} />
        </a>
    );
};
