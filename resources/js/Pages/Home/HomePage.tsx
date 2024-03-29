// styling
import Guest from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import HeroSection from "./Section/HeroSection";
import AboutSection from "./Section/AboutSection";
import "./HomePage.scss";

export default function HomePage() {
    const companyData: any = usePage().props.companyData; //get page info
    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name="description"
                    content={`Welcome to ${companyData?.company_name} official website. ${companyData?.company_description} 🏠`}
                />

                {/* <meta name="keywords" content={
                    "blog, react.js, laravel, web, Aurelius Ivan Wijaya, Ivan, Universitas Multimedia Nusantara"
                } /> */}
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={companyData?.company_name} />
                <meta
                    property="og:description"
                    content={`Welcome to ${companyData?.company_name} official website. ${companyData?.company_description}`}
                />
                <meta property="og:image" content={companyData?.company_logo} />
                <meta property="og:url" content={companyData?.url} />
                {/* favicon */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={companyData?.company_logo}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={companyData?.company_logo}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={companyData?.company_logo}
                />
                <link rel="manifest" href={companyData?.company_logo} />
            </Head>
            <Guest>
                <HeroSection />
                <AboutSection />
            </Guest>
        </>
    );
}
