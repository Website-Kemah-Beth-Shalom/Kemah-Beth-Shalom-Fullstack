import ProductCard from '@/Components/Product/ProductCard'
import Guest from '@/Layouts/GuestLayout'
import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ProductPage({ auth, ProductData }: PageProps<{ ProductData: any }>) {
    useEffect(() => {
        console.log(ProductData)
    }, [])
    return (
        <>
            <Head>
                <title>Product</title>
            </Head>
            <Guest>
                <div
                    className='flex flex-col items-center p-5 min-h-screen'
                >
                    <h1
                        className='text-4xl'
                    >Product </h1>
                    <div
                        className='grid grid-cols-2 justify-center items-center p-5 gap-2'

                    >
                        {
                            ProductData?.data.map((product: any) => {
                                return <ProductCard key={product.id} ProductData={product} auth={auth} />
                            })
                        }
                    </div>
                    <div
                    >
                        <Link className='m-2 hover:opacity-50 cursor-pointer' href={ProductData?.links?.first}>first</Link>
                        <Link className='m-2 hover:opacity-50 cursor-pointer' href={ProductData?.links?.last}>last</Link>
                        <Link className='m-2 hover:opacity-50 cursor-pointer' href={ProductData?.links?.next}>next</Link>
                        <Link className='m-2 hover:opacity-50 cursor-pointer' href={ProductData?.links?.prev}>prev</Link>
                    </div>
                </div>
            </Guest>
        </>
    )
}
