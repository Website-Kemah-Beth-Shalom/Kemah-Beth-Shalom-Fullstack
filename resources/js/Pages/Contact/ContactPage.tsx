import Guest from '@/Layouts/GuestLayout'
import React, { useEffect } from 'react'
import EmailFormSection from './Section/EmailFormSection'
import { Head, usePage } from '@inertiajs/react'
import SectionContainer from '@/Components/General/SectionContainer'
import Header from '@/Components/General/Header'
import Image from '@/Components/Image'
import Logo from './Asset/logo.png'
import LocationSection from './Section/LocationSection'

export default function ContactPage() {
    const companyData: any = usePage().props.companyData
    
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <Guest>
                <SectionContainer>
                    <div>
                        <div className="w-auto h-auto py-[4.69rem] flex justify-center items-center">
                            <Image 
                                className='w-[22.75rem] h-[6.0625rem] md:w-[50.36rem] md:h-[13.375rem] shrink-0'
                                src={Logo}
                                alt="Logo Kemah Beth Shalom"
                            />
                        </div>
                        <div
                            className='flex flex-col justify-center items-center p-5 pb-[9.38rem]'
                        >
                            <EmailFormSection />
                        </div>
                        
                        <LocationSection />
                    </div>
                </SectionContainer>
            </Guest>
        </>
    )
}