import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Logo from '../../../../../storage/app/public/logo-kemah-beth-shalom.png';
import Burger from '../../../../../storage/app/public/btn-hamburger.svg';

export default function Navbar() {
    const { url } = usePage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav>
            <div className={`bg-oldLace text-gunMetal fixed w-full pt-8 pb-8 z-40`}>
                <div className='flex text-xl lg:text-2xl justify-between items-center w-7/12 mx-auto gap-16'>
                    <button onClick={toggleDropdown} className='absolute md:hidden left-16'>
                        <img src={Burger} alt='' />
                    </button>
                    <img src={Logo} alt='' />
                    <div className={`hidden md:flex gap-12`}>
                        <Link href='/' className={`p-4 ${url === '/' ? 'font-bold' : ''}`}>
                            Home
                        </Link>
                        <Link
                            href='/documentation'
                            className={`p-4 ${url === '/documentation' ? 'font-bold' : ''}`}
                        >
                            Dokumentasi
                        </Link>
                        <Link href='/contact' className={`p-4 ${url === '/contact' ? 'font-bold' : ''}`}>
                            Kontak Kami
                        </Link>
                        <Link href='/donation' className={`bg-sepia text-white pt-4 pb-4 pr-8 pl-8 rounded-lg items-center ${url === '/donation' ? 'font-bold' : ''}`}>
                            Donasi
                        </Link>
                    </div>
                </div>
            </div>
            {isDropdownOpen && (
                <div
                    className='fixed w-screen h-screen bg-oldLace text-gunMetal pt-56 pb-8 text-xl'>
                    <div className='flex flex-col items-center'>
                        <Link href='/' className={`my-4 ${url === '/' ? 'font-bold' : ''}`}>
                            Home
                        </Link>
                        <Link href='/documentation' className={`my-4 ${url === '/documentation' ? 'font-bold' : ''}`}>
                            Dokumentasi
                        </Link>
                        <Link href='/contact' className={`my-4 ${url === '/contact' ? 'font-bold' : ''}`}>
                            Kontak Kami
                        </Link>
                        <Link href='/donation' className={`my-4 bg-sepia text-white pt-4 pb-4 pr-8 pl-8 rounded-lg items-center ${url === '/donation' ? 'font-bold' : ''}`}>
                            Donasi
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
``