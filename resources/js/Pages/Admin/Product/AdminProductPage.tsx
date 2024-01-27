import AdminLayout from '@/Layouts/AdminLayout'
import { Link } from '@inertiajs/react'
import { ProductProps, ProductMaterialProps } from '@/types/product';
import { Rupiah } from '@/Utils/Currency';

export default function ProductPage({ Products }: { Products: ProductProps[] }) {
    return (
        <AdminLayout>
            <section
                className='w-full flex flex-col justify-center items-center gap-3 relative p-boxS'
            >
                <div
                    className='
                    w-full flex flex-col justify-center items-start gap-3 relative'
                >
                    {
                        Products.length > 0 ?
                            Products?.map((product: ProductProps) => {
                                return (
                                    <Link
                                        href={`/admin/product/detail/${product.id}`}
                                        key={product.id}
                                        className='flex flex-row justify-start gap-3
                                        bg-slate-100 shadow-sm
                                        border border-gray-300
                                        rounded-md p-boxS w-full
                                        hover:bg-slate-200'
                                    >
                                        <img
                                            className='w-[10rem]
                                            h-auto aspect-square
                                            object-cover rounded-xl bg-primaryAdmin'
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div
                                            className='flex flex-col justify-start items-start gap-1'
                                        >
                                            <h3
                                                className=' text-[1.2rem] text-primaryAdmin font-bold font-niramit'
                                            >
                                                {product.name}
                                            </h3>
                                            <p
                                                className='text-primaryAdmin     font-niramit text-[1rem]'
                                            >
                                                Base Price : {Rupiah(product.price)}
                                            </p>
                                            <div
                                                className='flex flex-row gap-2 max-h-[5rem] overflow-y-auto'
                                            >
                                                {
                                                    product.productmaterial?.map((productmaterial: ProductMaterialProps) => {
                                                        return (
                                                            <div
                                                                className='bg-primaryBlack text-white rounded-lg p-boxS
                                                                pointer-events-auto hover:bg-opacity-50
                                                                cursor-pointer'
                                                                key={productmaterial.id}
                                                            >
                                                                {productmaterial.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            :
                            <div
                                className='text-center w-full text-primaryBlack'
                            >
                                No data
                            </div>
                    }
                </div>
            </section>
        </AdminLayout >
    )
}