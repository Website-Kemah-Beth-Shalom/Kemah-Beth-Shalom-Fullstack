import React from 'react'
import { styled } from '@stitches/react'
import { Link, usePage } from '@inertiajs/react'
// import variables from '@/styles/global.scss'
import '@/styles/General/Navbar/Navbar.scss'
import { PropsWithChildren } from 'react'


const Route = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Products',
        path: '/product'
    },
    {
        name: 'Contact',
        path: '/contact'
    }
]

export default function Navbar({ companyname }: PropsWithChildren<{ companyname?: string }>) {
    const PageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(PageInfo?.props?.companyData)
    return (
        <div
            className='Navbar'
        >
            <div
                className='flex justify-center items-center p-5'
            >
                <Link
                    className='w-20 h-8 justify-center items-center gap-2.5 inline-flex'
                    href='/'
                >
                    <span
                        className='text-center text-gray-200 text-2xl font-bold leading-loose'
                    >
                        {companyname ? companyname : companyData.company_name}
                    </span>
                </Link>
                <div
                    className='flex justify-between items-center gap-2.5'
                >
                </div>
            </div>
            <div
                className='flex justify-between items-center p-10 gap-20'
            >
                {
                    Route.map((route, index) => {
                        return (
                            <Link
                                key={index}
                                className='w-20 h-8 justify-center items-center gap-2.5 inline-flex
                                bg-slate-50 rounded-xl p-2 text-black font-bold hover:bg-slate-500 
                                hover:text-white transition duration-100 ease-in-out
                                '
                                href={route.path}
                            >
                                {route.name}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

// components: