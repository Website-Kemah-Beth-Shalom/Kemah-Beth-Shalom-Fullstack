import Guest from '@/Layouts/GuestLayout'
import React from 'react'
import EmailFormSection from './Section/EmailFormSection'
import { Head } from '@inertiajs/react'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <Guest>
                <div
                    className='flex flex-col justify-center items-center p-5 gap-[2rem] h-screen'
                >
                    <h1
                        className='text-4xl'
                    >
                        This is Contact Page
                    </h1>
                    <div
                        className='flex flex-col justify-center items-center p-5'
                    >
                        <EmailFormSection />
                    </div>
                    <div>
                        <h2>
                            Atau hubungi kami di:
                        </h2>
                        <div>
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    )
}