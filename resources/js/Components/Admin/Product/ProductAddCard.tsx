import { Input } from 'antd'
import React, { useState } from 'react'
import { router, useForm } from '@inertiajs/react'

export default function ProductAddCard(ProductData: any) {
    // ✨ form logic


    const { data, setData, post, progress } = useForm({
        id: ProductData.id,
        title: ProductData.title,
        description: ProductData.description,
        slug: ProductData.slug,
        price: ProductData.price,
        image: ProductData.image,

    })

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        console.log(data)
        router.post(`/admin/product`, data, {
            forceFormData: true,
        })
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg m-10"
        >
            <Input className="text-gray-500"
                placeholder='title'
                // defaultValue={data.title}
                onChange={handleChange}
                id='title'
            />
            <Input className="text-gray-500"
                placeholder='description'
                // defaultValue={data.description}
                onChange={handleChange}
                id='description'
            />
            <Input className="text-gray-500"
                placeholder='slug'
                // defaultValue={data.slug}
                onChange={handleChange}
                id='slug'
            />
            <Input className="text-gray-500"
                placeholder='price'
                // defaultValue={data.price}
                onChange={handleChange}
                id='price'
                type='number'
            />
            <Input className="text-gray-500"
                placeholder='price'
                id='image'
                type='file'
                onChange={(event: any) => setData('image', event.target.files[0])}
            />
            <img
                className='w-1/4 h-1/4'
                src={data.image} alt={data.image} />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
        </form>
    )
}