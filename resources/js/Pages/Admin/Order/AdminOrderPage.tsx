import { ModalOverlay } from '@/Components/Modal'
import AdminLayout from '@/Layouts/AdminLayout'
import React, { useEffect, useState } from 'react'

export default function AdminOrderPage({ Orders }: { Orders: any }) {
    useEffect(() => {
        console.log(Orders)
    }, [])

    return (
        <AdminLayout>
            <section>
            </section>

            {/* Map Card section */}
            <section
                className='flex flex-col justify-start items-start gap-3 relative p-boxS w-full'
            >
                {/* Map Order Card */}
                {
                    Orders.length > 0 ?
                        Orders?.map((order: any) => {
                            console.log("order", order);
                            return OrderCard(order)
                        })
                        :
                        <div>
                            No Order Data
                        </div>
                }
            </section>
        </AdminLayout>
    )
}



type OrderProps = {
    // id: number,
    name: string
    address: string
    customer_book_materials: any[]
    phone: string
    email: string
    note: string
    // customer: {
    //     id: number,
    //     name: string,
    //     phone: string,
    //     email: string,
    // },
    // order: {
    //     id: number,
    //     status: string,
    //     total: number,
    //     payment_method: string,
    //     payment_status: string,
    //     payment_proof: string | null,
    //     payment_proof_url: string | null,
    //     created_at: string,
    //     updated_at: string,
    // },
}

const OrderCard = (Order: OrderProps) => {

    const [isModalOpen, setIsModalOpen] = useState<any>();

    const handleCloseModal = () => setIsModalOpen(false)
    const handleOpenModal = () => setIsModalOpen(true)

    const handleWhatsapp = () => {
        window.open(`https://wa.me/${Order?.phone}`)
    }

    const handleEmail = () => {
        window.open(`mailto:${Order?.email}`)
    }

    return (
        <>
            <button
                onClick={handleOpenModal}
                className='flex flex-row justify-between items-center
            bg-slate-100 shadow-sm
            border border-gray-300
            rounded-md p-boxS w-full'
            >
                <div>
                    {Order?.name}
                </div>
                <div>
                    Address: {Order?.address}
                </div>
            </button>

            <ModalOverlay
                onClose={handleCloseModal}
                show={isModalOpen}
            >
                <section
                    className="modal-content bg-white w-[50rem] h-[30rem] rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[1rem] overflow-y-scroll max-w-[90vw]
                    gap-3 flex flex-col justify-start items-start"
                >
                    <header
                        className='flex flex-row justify-between items-center w-full'
                    >
                        <h1
                            className='text-2xl font-bold'
                        >
                            {Order.name}
                        </h1>
                        {/* action buttons */}
                        <div
                            className='flex flex-row justify-between items-center gap-3'
                        >
                            <button>
                            </button>
                            <button
                                onClick={handleWhatsapp}
                                className='bg-green text-white rounded-md p-[0.5rem] hover:bg-opacity-70'
                            >
                                whatsapp
                            </button>

                            <button
                                onClick={handleEmail}
                                className='bg-blue-500 text-white rounded-md p-[0.5rem] hover:bg-opacity-70'
                            >
                                email
                            </button>
                        </div>
                    </header>


                    <div>
                        <div>
                            Phone: {Order.phone}
                        </div>
                        <div>
                            Email: {Order.email}
                        </div>
                        <div>
                            Address: {Order.address}
                        </div>
                        <div>
                            Note: {Order.note}
                        </div>
                    </div>

                    {/* Map All Item Ordered */}
                    <div

                        className='flex flex-col justify-start items-start gap-3 w-full'
                    >
                        {/* Card in modal */}
                        {
                            Order.customer_book_materials.map((material) => {
                                return (
                                    <div
                                        key={material.id}
                                        className='flex flex-col justify-between items-start     w-full bg-slate-200 p-[10px] rounded-xl'
                                    >
                                        <h1
                                            className='text-xl font-bold'
                                        >
                                            {material.name}
                                        </h1>

                                        <div>
                                            {
                                                material.customer_book_material_items.map((item: any) => {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            className='flex flex-row justify-between items-center'
                                                        >
                                                            <h1>
                                                                {/* nanti ganti "Pilihan" dengan real data */}
                                                                Pilihan {item.id}: {item.name}
                                                            </h1>
                                                            <div>
                                                                {item.quantity}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div
                            className='w-full h-[1px] bg-gray-300'
                        >
                            Total : {Order.customer_book_materials.length}
                        </div>
                    </div>
                </section>
            </ModalOverlay>
        </>
    )
}