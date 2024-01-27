import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function BlogError() {
    return (
        <Guest>
            <div
                className='flex flex-col items-center justify-center w-full h-full p-boxS gap-5
                min-h-[50vh]'
            >
                <h1
                    className='text-4xl font-bold text-center text-black'
                >
                    Blog Page Not Found!
                </h1>
                <p
                    className='text-primaryBlack text-center'
                >
                    Hey! if you are seeing this page, it means that the blog you are looking for is not found!
                </p>
                <div>
                    <Link
                        href='/blog'
                        className='bg-primaryBlack text-white p-boxS rounded-md shadow-md hover:opacity-70'
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        </Guest>
    )
}
