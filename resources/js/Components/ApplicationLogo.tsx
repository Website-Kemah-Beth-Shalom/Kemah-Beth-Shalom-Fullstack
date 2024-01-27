import { usePage } from '@inertiajs/react';
import { SVGAttributes, useEffect } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    const page: any = usePage().props;
    // useEffect(() => {
    //     console.log(page);
    // }, []);
    return (
        <>
                <img
                    className={`
                    outline-none
                    hover:outline-none
                    transition-all
                    p-[0.5rem]
                    object-contain
                    h-[4.5rem] 
                    ${props.className}
                `}
                    src={page?.companyData.company_logo}
                />
            {/* <p
                className='text-2xl md:text-3xl font-normal font-playfair text-text1'
            >
                Homiku Living
            </p> */}
        </>
    );
}
