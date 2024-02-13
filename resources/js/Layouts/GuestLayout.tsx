import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Footer from "@/Components/General/Footer";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { PropsWithChildren, ReactNode, useEffect } from "react";
import "@/Styles/global.scss";
import NavLink from "@/Components/NavLink";
import "./Layout.scss";
import SplashScreen from "@/Components/General/SplashScreen/SplashScreen";

export default function Guest({
    header,
    footer = true,
    children,
}: PropsWithChildren<{ header?: ReactNode; footer?: boolean }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        React.useState(false);
    const [showSplashScreen, setShowSplashScreen] =
        React.useState<boolean>(true);

    const companyData: any = usePage().props.companyData; //get page info

    const fetchSplashScreenStatus = async () => {
        try {
            const response = await axios.get("/splash-screen");
            setShowSplashScreen(response.data.showSplashScreen);
        } catch (error) {
            console.error("Error fetching splash screen status: ", error);
        }
    };

    useEffect(() => {
        fetchSplashScreenStatus();

        // Set a timeout to hide the splash screen after 2.5 seconds
        const timeoutId = setTimeout(() => {
            setShowSplashScreen(false);
        }, 3000);
        // Clear the timeout if the component unmounts or if you want to cancel it for some reason
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {showSplashScreen ? (
                <SplashScreen />
            ) : (
                <>
                    <div
                        className={`fixed flex justify-between h-[4.5rem] sm:h-[4.25rem]
                        top-0 left-0 right-0 z-20
                        bg-secondary px-boxMd
                        border-b-[0.01rem] border-solid border-transparentWhite
                        ${showingNavigationDropdown ? "" : "shadow-md"}`}
                    >
                        {/* Logo */}

                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-[3.1rem] md:h-[4.1rem]" />
                            </Link>
                        </div>

                        {/* Navbar Menu Desktop */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 md:flex justify-center items-center">
                            {Route.map((item, index) => (
                                <NavLink
                                    key={index}
                                    href={route(item.route)}
                                    active={route().current(item.route)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                        {/*  Navbar Menu Mobile */}
                        <div
                            className="
                            md:hidden flex justify-center
                            items-center z-[20]
                            "
                        >
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                            >
                                <svg
                                    className="h-6 w-6 stroke-text3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "block"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M4 6h34M4 12h34M4 18h34  "
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "block"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* safe zone */}
                    <div className="opacity-100 h-[4.5rem] sm:h-[4.25rem] w-full" />

                    <div
                        className={
                            (showingNavigationDropdown
                                ? "translate-y-[0rem] opacity-[100%]"
                                : "translate-y-[-200%] opacity-[0%]") +
                            `md:hidden fixed top-[4.3rem] sm:top-[4.25rem] left-0 right-0 pt-[1rem] pb-[1.5rem] px-boxMd shadow-md
                            bg-bg1 w-full z-[10] flex flex-col items-center text-center isolate gap-[0.5rem] transform-gpu transition-all duration-500 ease-in-out origin-top`
                        }
                    >
                        {Route.map((item, index) => (
                            <NavLink
                                key={index}
                                href={route(item.route)}
                                active={route().current(item.route)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <a
                            href={companyData?.company_donation_link}
                            className="font-jost font-bold bg-brown text-white rounded-md w-full h-[2.5rem] p-boxS 
                            my-[1rem] md:mb-0
                        flex items-center justify-center
                        "
                        >
                            Donasi
                        </a>
                    </div>
                    <main className="bg-bg1">
                    {children}
                    
                    {/* button whatsapp */}
                    <a
                        title="Hubungi kami lewat whatsapp!"
                        href={`https://wa.me/${companyData?.company_whatsapp}`}
                        className="fixed bottom-[3rem] right-[3rem] xl:bottom-[4rem] xl:right-[4rem] z-50 bg-green-500  transition-all duration-300 hover:bg-green-600 drop-shadow-lg rounded-full p-2"
                        target="_blank"
                    >
                        <img
                            src="https://www.svgrepo.com/show/176768/whatsapp-social-media.svg"
                            alt="whatsapp"
                            className="w-auto h-[5rem] xl:h-[7rem] p-2"
                        />
                    </a>
                    </main>
                    {/* Footer */}
                    {footer ? <Footer /> : null}
                </>
            )}
        </>
    );
}

const Route = [
    {
        name: "Home",
        path: "/",
        route: "home",
    },

    {
        name: "Dokumentasi",
        path: "/gallery",
        route: "gallery",
    },
    {
        name: "Blog",
        path: "/blog",
        route: "blog",
    },
];
