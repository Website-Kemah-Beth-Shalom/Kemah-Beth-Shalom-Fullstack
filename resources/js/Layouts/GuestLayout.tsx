import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/General/Footer';
import Navbar from '@/Components/General/Navbar/Navbar';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import MobileNavbar from '@/Components/General/Navbar/NavbarMobile';
import TestNavbar from '@/Components/General/Navbar/NavbarDesktop';

type Props = {
    companyname: string
}

export default function Guest({ companyname, children }: PropsWithChildren<{ companyname?: string, children?: React.ReactNode }>) {
    return (
        <>
            <Navbar/>
            <div>
                {children}
            </div>
            <Footer/>
        </>
    );
}
