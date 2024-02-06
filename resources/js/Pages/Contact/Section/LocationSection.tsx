import React from 'react'
import { usePage } from '@inertiajs/react'

export default function LocationSection() {
    const companyData: any = usePage().props.companyData;

    return(
        <div className='flex w-auto justify-center items-center pb-[9.37rem] h-auto'>
            <div className="w-auto md:w-[70rem] h-auto flex flex-col gap-[2rem] max-md:justify-center max-md:items-center">
                <div className="text-[#434343] text-[2.5rem] md:text-[4rem] not-italic leading-[150%] font-[700]">Lokasi Kami</div>    
                <div className="w-auto h-auto flex justify-center items-center flex-col">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1507.5580918009696!2d106.68455109871387!3d-6.31128999218207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e52fad172ae1%3A0x2763c403f06effbe!2sPanti%20Jompo%20%26%20Panti%20Asuhan%20Kemah%20Beth%20Shalom!5e0!3m2!1sen!2sid!4v1706616053169!5m2!1sen!2sid"  
                        loading="lazy" 
                        className='md:w-[70rem] w-[22.75rem] md:h-[40.125rem] h-[40.125rem] shrink-0'
                    ></iframe>
                    <div className="w-auto h-auto">
                        <a href="" className='w-[19.6875rem] h-[3.6875rem] md:w-[19.6875rem] md:h-[3.6875rem] py-[1.12rem] px-[2.25rem] bg-[#B88E2F] hover:bg-[#c9a03f] rounded-[0.75rem] justify-center items-center shrink-0 flex relative bottom-[5rem] text-[#FFF] text-[1rem] not-italic font-[700] leading-normal uppercase'>Dapatkan rute lokasi</a>
                    </div>
                </div>
            </div>
        </div>
    )
}