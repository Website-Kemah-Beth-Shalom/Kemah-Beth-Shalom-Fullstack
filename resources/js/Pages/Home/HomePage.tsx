// styling
// import style from '../../../css/Home/HomePage.module.scss';
import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React, { useEffect } from 'react'



export default function HomePage({ auth, WebconfigData, cache, helper }: PageProps<{ WebconfigData: any, cache: any, helper: string }>) {
    useEffect(() => {
        console.log(helper)
    }, [])
    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Home Page" />
            </Head>
            <Guest
                companyname={WebconfigData[0].value}
            >
                <div
                    className='flex flex-col justify-center items-center p-5'
                >
                    <h1
                        className='text-4xl'
                    >
                        This is Home Page
                    </h1>
                    <div>
                        {
                            WebconfigData.map((webconfig: any) => {
                                return (
                                    <div key={webconfig.id}
                                        className='p-4 m-2 w-full  border-2 rounded-md shadow-sm m-y shadow-red-100'
                                    >
                                        <h1
                                            className='text-2xl'
                                        >{webconfig.alias}</h1>
                                        <p>{webconfig.value}</p>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </Guest>
        </>
    )
}