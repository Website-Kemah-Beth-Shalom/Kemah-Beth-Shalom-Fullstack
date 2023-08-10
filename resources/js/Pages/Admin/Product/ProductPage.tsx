import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import React, { useEffect } from 'react'
// import { Inertia } from '@inertiajs/inertia'
import Card from '@/Components/Admin/Product/ProductEditCard'
import ProductEditCard from '@/Components/Admin/Product/ProductEditCard'
import ProductAddCard from '@/Components/Admin/Product/ProductAddCard'

export default function ProductPage({ auth, ProductData }: PageProps<{ ProductData: any }>) {
    useEffect(() => {
        console.log(ProductData)
    }, [])
    return (
        <div
            className='flex flex-col justify-center items-center'
        >
            <div
                className='flex flex-col justify-center items-center p-10'
            >
                <h1>Add Product</h1>
                <ProductAddCard />
            </div>
            <div
                className='flex flex-col justify-center items-center p-10'
            >
                <h1>Edit Product Page</h1>
                {
                    ProductData.data?.map((product: any) => {
                        return (
                            <Card key={product.id}
                                {...product}
                            />
                        )
                    }
                    )
                }
            </div>
        </div>
        // </Authenticated>
    )
}


// ProductPage.layout = (page: React.ReactNode) => <Authenticated>{page}</Authenticated>
