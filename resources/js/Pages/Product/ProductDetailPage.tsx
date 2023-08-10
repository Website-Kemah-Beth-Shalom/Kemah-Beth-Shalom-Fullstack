import { PageProps } from '@/types'
import React from 'react'
import { usePage } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
export default function ProductDetailPage({ auth, ProductData, title }: PageProps<{ auth: any, ProductData: any, title: any }>) {
    // console.log()
    // const pageInfo = usePage();
    console.log(ProductData)
    return (
        <Guest>
            <div
                className='flex flex-col items-center p-5 min-h-screen'
            >
                <h1
                    className='text-4xl'
                >
                    {ProductData.title}
                </h1>
                {
                    ProductData.image
                    &&
                    <img
                        src={ProductData.image}
                        alt={ProductData.title}
                        className='w-full h-40 object-cover'
                    />
                }
                <div>
                    <p>{ProductData.description}</p>
                    <p>{ProductData.image}</p>
                    <p>{ProductData.price}</p>
                </div>
            </div>
        </Guest>
    )
}
