import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function ProductCard({ ProductData }: PageProps<{ ProductData: any }>) {
    return (
        <div
            className='p-4 m-2 w-full  border-2 rounded-md shadow-sm m-y shadow-red-100 gap-3 flex flex-col justify-center'

        >
            <h1
                className='text-2xl'
            >{ProductData.title}</h1>

            {ProductData.image
                &&
                <img
                    src={ProductData.image}
                    alt={ProductData.title}
                    className='w-full h-40 object-cover'
                />
            }
            {/* <div>
                {ProductData.image}
            </div> */}
            <p
                className='text-gray-200'
            >
                {ProductData.description}
            </p>
            <Link
                href={`/product/${ProductData.slug}`}
                className='text-white
                bg-green-600 hover:bg-green-700
                transition duration-500 ease-in-out
                border border-transparent rounded-md
                p-2 text-center'
            >
                Read More
            </Link>

        </div>
    )
}
