import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react';
import Logo from "../../../../../storage/app/public/logo-kemah-beth-shalom.png"
import Burger from "../../../../../storage/app/public/btn-hamburger.svg" 

export default function Navbar(){
    const { url } = usePage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        console.log(isDropdownOpen);
    };

    return(
        <div className='bg-oldLace text-gunMetal fixed w-full pt-8 pb-8'>
            <div className='flex text-4xl justify-between items-center w-1/2 mx-auto gap-16'>
                {/* <button onClick={toggleDropdown} className='absolute md:hidden left-16'>
                    <img src={Burger} alt=""/>
                </button> */}
                <img src={Logo} alt="" />
                <div className='hidden md:flex justify-around w-11/12'>
                    <Link 
                        href='/' 
                        className={`${url === '/' ? 'font-bold' : ''}`}>
                        Home
                    </Link>
                    <Link 
                        href="/documentation"
                        className={`${url === '/documentation' ? 'font-bold' : ''}`}
                        >
                        Dokumentasi
                    </Link>
                    <Link 
                        href='/contact'
                        className={`${url === '/contact' ? 'font-bold' : ''}`}
                        >
                        Kontak Kami
                    </Link>
                    <Link 
                        href="/donation"
                        className={`${url === '/donation' ? 'font-bold' : ''}`}
                    >
                    Donasi
                    </Link>
                </div>
            </div>
        </div>
    )
}