import { usePage } from "@inertiajs/react";
import React from "react";
import instagram from "./Assets/Instagram.svg";
import whatsapp from "./Assets/Whatsapp.svg";
import mail from "./Assets/Mail.svg";

export default function Footer() {
    const pageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(
        pageInfo?.props?.companyData
    );
    return (
        <footer
            className="w-full bg-secondary
            flex flex-col md:flex-row
            justify-center md:justify-between items-center gap-[2rem] md:gap-[2rem]
            px-boxXl md:px-boxReg py-boxXl text-text1 select-all"
        >
            {/* COMPANY DESC */}
            <div className="flex-col justify-start items-center gap-[1.2rem] inline-flex">
                <div className="text-center text-black text-6xl md:text-7xl font-normal md:leading-[76px]">
                    HOMIKU
                    <br />
                    LIVING
                </div>
                <div className="flex-col justify-start items-center gap-2.5">
                    <div className="text-center text-lg font-medium">
                        Interior Design Workshop
                    </div>
                    <div className="text-center font-light">
                        {companyData?.address}
                    </div>
                </div>
                <div className="text-sm hidden md:block font-light">
                    Homiku Living 2024. All Rights Reserved.
                </div>
            </div>

            {/* MAP AND CONTACT */}
            <div className="flex flex-col-reverse justify-center items-center md:flex-row gap-[2rem]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1507.5580918009696!2d106.68455109871387!3d-6.31128999218207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e52fad172ae1%3A0x2763c403f06effbe!2sPanti%20Jompo%20%26%20Panti%20Asuhan%20Kemah%20Beth%20Shalom!5e0!3m2!1sen!2sid!4v1706616053169!5m2!1sen!2sid"
                    className="
                    h-[45vw] md:h-[20vw] w-[70vw] md:w-[35vw] border-2 rounded-md border-deco2"
                    loading="lazy"
                ></iframe>
                <div className="flex md:flex-col gap-5 md:gap-3 pointer-events-auto">
                    <SocialBubble
                        icon={instagram}
                        link="https://www.instagram.com/homiku_living"
                    />
                    <SocialBubble
                        icon={whatsapp}
                        link="https://wa.me/628118303777"
                    />
                    <SocialBubble
                        icon={whatsapp}
                        link="https://wa.me/6281316755530"
                    />
                    <SocialBubble
                        icon={mail}
                        link="https://www.instagram.com/homiku_living"
                    />
                </div>
            </div>

            <div className="text-sm md:hidden font-light">
                Homiku Living 2024. All Rights Reserved.
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
            href={link} target="_blank">
            <img src={icon} />
        </a>
    );
};
